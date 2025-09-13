
import Link from "next/link";
import styles from "./course.module.css";

export default function Course() {

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Advanced Web Technologies - CISC474</h1>
      <p className={styles.instructor}>Dr. Austin Bart</p>
      <p className={styles.schedule}>MWF 12:30-1:35</p>
      <p className={styles.location}>Sharp 140</p>
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