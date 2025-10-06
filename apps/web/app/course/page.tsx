"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./course.module.css";

interface Course {
  name: string;
  desc: string;
}

export default function Course() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id");
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) {
        setError("Course ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch course: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCourse({ name: data.course_name, desc: data.course_desc });
      } catch (error) {
        console.error(error);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!course) {
    return <p>No course details available.</p>;
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{course.name}</h1>
      <p className={styles.description}>{course.desc}</p>
      <section className={styles.section}>
        <h2 className={styles.upcoming}>Upcoming</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/assignment" className={styles.link}>Web App Planning - 9/9</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/assignment" className={styles.link}>NextJS Learning - 9/10</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}