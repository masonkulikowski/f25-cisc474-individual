"use client";

import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from "react";
import { backendFetcher } from "../integrations/fetcher";
import styles from "./page.module.css";
import type { CourseOut } from "@repo/api/courses";


const coursesQueryOptions = {
    queryKey: ['courses'],
    queryFn: backendFetcher<Array<CourseOut>>(`/courses`),
    initialData: [],
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(coursesQueryOptions);
  }
});

type Course = {
    id: string;
    name: string;
};

function getRandomColor(usedColors: Set<string>) {
    let color;
    do{
        const r = Math.floor(Math.random()* 76) + 180;
        const g = Math.floor(Math.random()* 76) + 180;
        const b = Math.floor(Math.random()* 76) + 180;
        color = `rgb(${r}, ${g}, ${b})`;
    } while (usedColors.has(color));
    usedColors.add(color);
    return color;
}

function CoursesGrid({ courses }: { courses: Array<Course> }) {
    const [colors, setColors] = useState<Array<string> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const usedColors = new Set<string>();
        const generatedColors = courses.map(() => getRandomColor(usedColors));
        setColors(generatedColors);
    }, [courses]);

    if (!colors) {
        return <p style={{ textAlign: "center" }}>Loading courses…</p>;
    }

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "7.5rem",
                marginTop: "1rem",
                maxWidth: "1400px",
                margin: "0 auto",
            }}
        >
                        {courses.map((course, index) => (
                <div
                    key={course.id}
                    className={styles.courseLink}
                    style={{ background: colors[index] }}
                    onClick={() => navigate({ to: `/courses/${course.id}` })}
                >
                    {course.name}
                </div>
            ))}
        </div>
    );
}

function RouteComponent() {
    const { data, refetch, error, isFetching } = useQuery(coursesQueryOptions);
        const courses = useMemo<Array<Course>>(
            () => data.map((c) => ({ id: c.id, name: c.course_name })),
            [data]
        );

    if (isFetching) return <div style={{ textAlign: 'center' }}>Loading…</div>;
    if (error) return <div>Error: {error instanceof Error ? error.message : String(error)}</div>;

        return (
            <div>
                <nav>
                    <ul>
                                    <li>
                                        <Link to="/courses/manage">Manage Courses</Link>
                                    </li>
                    </ul>
                </nav>

                <main className={styles.main}>
                    <h1 style={{ margin: "0 auto", maxWidth: 1400 }}>Courses</h1>
                    <CoursesGrid courses={courses} />
                </main>

                <div style={{ marginTop: '1rem' }}>
                    <button onClick={() => refetch()}>Refetch</button>
                </div>
            </div>
        );
}
