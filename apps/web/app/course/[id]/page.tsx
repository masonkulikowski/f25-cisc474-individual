import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./course.module.css";

export default function Course() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const [course, setCourse] = useState<{ name: string; desc: string } | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/${courseId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch course: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setCourse({ name: data.course_name, desc: data.course_desc });
      } catch (error) {
        console.error(error);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <p>Loading course details...</p>;
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