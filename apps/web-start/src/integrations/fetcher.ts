export function backendFetcher<T>(endpoint: string): () => Promise<T> {
  return () =>
    fetch(import.meta.env.VITE_BACKEND_URL_2 + endpoint).then((res) =>
      res.json(),
    );
}
