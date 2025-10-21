import { z } from "zod";

export const IdParam = z.object({ id: z.uuid() });
export const Pagination = z.object({
    cursor: z.uuid().optional(),
    limit: z.number().int().positive().max(250).default(10),
});

export type Pagination = z.infer<typeof Pagination>;