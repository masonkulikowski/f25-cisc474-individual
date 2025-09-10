import Link from "next/link";
import styles from "./assignment.module.css";


export default function Assignment() {
  return (
    <main className={styles.main}>
      <Link href="/course">&lt; Back to Course</Link>
      <h1 className={styles.title}>NextJS Learning</h1>
      <p className={styles.dueDate}>due 9/10</p>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        habitant morbi tristique senectus et netus.
      </p>
      <div className={styles.upload}>
        <input type="file" />
      </div>
      <button className={styles.button}>Submit</button>
      <p className={styles.viewLink}>
        <Link href="/submission">View submissions</Link>
      </p>
    </main>
  );
}