import { createFileRoute } from "@tanstack/react-router";
import Course from "../../../components/Course";

export const Route = createFileRoute('/courses/$courseId/')({
  component: Course,
});