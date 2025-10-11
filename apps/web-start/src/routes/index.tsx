"use client";

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Suspense, useEffect, useMemo, useState } from "react";
import { backendFetcher } from "../integrations/fetcher";
import styles from "./page.module.css";

export const Route = createFileRoute('/')({
  component: RouteComponent,
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

function createResource<T>(promise: Promise<T>) {
    let status = "pending";
    let result: T;
    let error: unknown;

    const suspender = promise.then(
        (res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "error";
            error = err;
            console.error(err);
        }
    );
    return {
        read(): T {
            if (status === "pending") {
                throw suspender;
            }
            if (status === "error") {
                throw error;
            }
            return result!;
        },
    };
}

console.log("Backend URL 1:", import.meta.env.VITE_BACKEND_URL);
const fetchCourses = backendFetcher<Array<{ id: string; course_name: string }>>("/courses");

async function transformCourses(): Promise<Array<Course>> {
    const data = await fetchCourses();
    return data.map((course) => ({
        id: course.id,
        name: course.course_name,
    }));
}

function CoursesGrid({ resource }: { resource: { read: () => Array<Course> } }) {
    const courses = resource.read();
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
    const courseResource = useMemo(() => createResource(transformCourses()), []);   

  return (
    <main className={styles.main}>
      <h1 style={{ margin: "0 auto", maxWidth: 1400 }}>Courses</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading courses…</p>}>
        <CoursesGrid resource={courseResource} />
      </Suspense>
    </main>
  );
}
