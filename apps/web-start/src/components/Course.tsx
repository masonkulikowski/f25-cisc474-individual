"use client";

import { useEffect, useState } from "react";
import { backendFetcher } from "../integrations/fetcher";
import styles from "./course.module.css";

type Course = {
  name: string;
  desc: string;
};

function CourseContent() {
  const [course, setCourse] = useState<Course | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleNavigation = () => {
      const pathSegments = window.location.pathname.split("/");
      const courseId = pathSegments[pathSegments.length - 1];

      if (!courseId) {
        setErrorMessage("Course ID is missing.");
        setLoading(false);
        return;
      }

      async function fetchCourse() {
        try {
          const fetchCourseData = backendFetcher<{ course_name: string; course_desc: string }>(`/courses/${courseId}`);
          const data = await fetchCourseData();
          console.log("API response data:", data);

          const updatedCourse = { name: data.course_name, desc: data.course_desc };
          setCourse(updatedCourse);
          console.log("Updated course state:", updatedCourse);
        } catch (fetchError) {
          console.error(fetchError);
          setErrorMessage("Failed to load course details. Please try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchCourse();
    };

    handleNavigation();

    window.addEventListener("popstate", handleNavigation);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
    };
  }, []);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (errorMessage) {
    return <p className={styles.error}>{errorMessage}</p>;
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
            <a href="/assignment" className={styles.link}>Web App Planning - 9/9</a>
          </li>
          <li className={styles.listItem}>
            <a href="/assignment" className={styles.link}>NextJS Learning - 9/10</a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default function Course() {
  return <CourseContent />;
}