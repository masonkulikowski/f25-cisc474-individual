"use client";

import styles from "./page.module.css";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Course = {
    id: string;
    name: string;
}

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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function fetchCourses(): Promise<Course[]> {
    try {
        const res = await fetch(`${BACKEND_URL}/courses`, { cache: "no-store" });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to fetch courses: ${res.status} ${res.statusText} ${errorText}`);
        }
        const data = await res.json();
        return data.map((course: { id: string; course_name: string; }) => ({
            id: course.id,
            name: course.course_name
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function CoursesGrid({ resource }: { resource: { read: () => Course[] } }) {
    const courses = resource.read();
    const [colors, setColors] = useState<string[] | null>(null);
    const router = useRouter();

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
                    onClick={() => router.push(`/course?id=${course.id}`)}
                >
                    {course.name}
                </div>
            ))}
        </div>
    );
}

export default function Home() {
    const courseResource = useMemo(() => createResource(fetchCourses()), []);   

  return (
    <main className={styles.main}>
      <h1 style={{ margin: "0 auto", maxWidth: 1400 }}>Courses</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading courses…</p>}>
        <CoursesGrid resource={courseResource} />
      </Suspense>
    </main>
  );
}
