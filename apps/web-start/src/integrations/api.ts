import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "http";
import { use } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;
const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;

type Json = Record<string, unknown> | Array<unknown>;

class RedirectingForAuthError extends Error {
    constructor() {
        super('redirecting-for-auth');
        this.name = 'RedirectingForAuthError';
    }
}

export function useApiClient() {
    const {
        getAccessTokenSilently,
        loginWithRedirect,
        isAuthenticated,
        isLoading: isAuth0Loading,
    } = useAuth0();

    const getToken = async (scope?: string) => {
        try {
            return await getAccessTokenSilently({
                authorizationParams: {audience: AUDIENCE, scope},
            });
        } catch (error: any) {
            if (error?.error === 'consent_required' || error?.error === 'login_required') {
                await loginWithRedirect({
                    authorizationParams: {audience: AUDIENCE, scope, prompt: 'consent'},
                    appState: { returnTo: window.location.pathname },
                });
                throw new RedirectingForAuthError();
            }
            throw error;
        }
    };

    const request = async <T = unknown>(
        path: string,
        init: RequestInit & { scope?: string} = {},
    ): Promise<T> => {
        const token = await getToken(init.scope);
        const res = await fetch(`${BACKEND_URL}${path}`, {
            ...init,
            headers: {
                'Content-Type': 'application/json',
                ...(init.headers || {}),
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return (await res.json()) as T;
    };

    return { request, isAuthenticated, isAuth0Loading };
}

export function useApiQuery<T>(
    queryKey: ReadonlyArray<unknown>,
    path: string,
    init: RequestInit & { scope?: string} = {},
) {
    const { request, isAuthenticated, isAuth0Loading } = useApiClient();
    const isEnabled = isAuthenticated && !isAuth0Loading;
    const q = useQuery({
        queryKey,
        queryFn: () => request<T>(path, init),
        enabled: isEnabled,
        retry(failureCount, error) {
            if (error instanceof RedirectingForAuthError) return false;
            return failureCount < 3;
        },
    });
    const isAuthPending = isAuth0Loading || !isAuthenticated;
    const showLoading = isAuthPending || q.isLoading || q.isFetching;
    return { ...q, isAuthPending, showLoading, isEnabled };
}

export function useApiMutation<Input extends Json, Output = unknown>(opts?: {
    scope?: string;
    endpoint?: (variables: Input) => { path: string; method?: string };
    path?: string;
    method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE' ;
    invalidateKeys?: ReadonlyArray<Array<unknown>>;
}) {
    const { request } = useApiClient();
    const qc = useQueryClient();

    return useMutation<Output, Error, Input>({
        mutationFn: async (variables) => {
            const { path, method = opts?.method ?? 'POST' } = opts?.endpoint?.(
                variables,
            ) ?? { path: opts?.path!, method: opts?.method ?? 'POST' };

            return await request<Output>(path, {
                method,
                body: JSON.stringify(variables),
                scope: opts?.scope,
            });
        },
        retry(failureCount, error) {
            if (error instanceof RedirectingForAuthError) return false;
            return failureCount < 3;
        },
        onSuccess: async () => {
            if (opts?.invalidateKeys) {
                await Promise.all(
                    opts.invalidateKeys.map((key) => qc.invalidateQueries({ queryKey: key })),
                );
            }
        },
    });
}

export type CurrentUser = {
    id: string;
    name?: string | null;
    email?: string | null;
}

export function useCurrentUser(opts?: { scope?: string }) {
    return useApiQuery<CurrentUser>(['users', 'me'], '/users/me', {
        scope: opts?.scope,
    });
}