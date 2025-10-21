import { z } from "zod";
import { Pagination } from "./queries";

export const CourseRef = z.object({
    id: z.uuid(),
    course_name: z.string(),
});
export type CourseRef = z.infer<typeof CourseRef>;

export const CourseOut = z.object({
    id: z.uuid(),
    course_name: z.string(),
    course_desc: z.string(),
    users_id: z.uuid(),
    created_at: z.iso.datetime(),
    updated_at: z.iso.datetime(),
});
export type CourseOut = z.infer<typeof CourseOut>;

export const CourseCreateIn = z.object({
    course_name: z.string().min(1),
    course_desc: z.string(),
    users_id: z.uuid(),
});
export type CourseCreateIn = z.infer<typeof CourseCreateIn>;

export const CourseUpdateIn = z.object({
    course_name: z.string().min(1).optional(),
    course_desc: z.string(),
    users_id: z.uuid().optional(),
});
export type CourseUpdateIn = z.infer<typeof CourseUpdateIn>;

export const CoursesListFilter = Pagination.extend({
    users_id: z.uuid().optional(),
    nameLike: z.string().optional(),
});