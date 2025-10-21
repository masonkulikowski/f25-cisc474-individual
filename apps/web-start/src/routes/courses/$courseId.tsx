"use client";

import { Link, createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { backendFetcher } from "../../integrations/fetcher";
import styles from "../../components/course.module.css";
import type { CourseOut } from "@repo/api/courses";

const courseQueryOptions = (courseId: string) =>
  queryOptions({
    queryKey: ["courses", courseId],
    queryFn: backendFetcher<Array<CourseOut>>(`/courses/${courseId}`),
  });
 
export const Route = createFileRoute('/courses/$courseId')({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { courseId } }) =>
    queryClient.ensureQueryData(courseQueryOptions(courseId)),
});

function RouteComponent() {
  const { courseId } = Route.useParams();
  const { data } = useSuspenseQuery(courseQueryOptions(courseId));

  const course = data[0];

  if (!course) {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>Course not found</h1>
        <p>
          <Link to="/">Back to Courses</Link>
        </p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <header>
        <h1 className={styles.title}>{course.course_name}</h1>
      </header>
      <p className={styles.description}>{course.course_desc}</p>

      <section className={styles.section}>
        <h2 className={styles.upcoming}>Upcoming</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a href="/assignment" className={styles.link}>
              Web App Planning - 9/9
            </a>
          </li>
          <li className={styles.listItem}>
            <a href="/assignment" className={styles.link}>
              NextJS Learning - 9/10
            </a>
          </li>
        </ul>
      </section>

      <p style={{ marginTop: "1rem" }}>
        <Link to="/">Back to Courses</Link>
      </p>
    </main>
  );
}
