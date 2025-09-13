import styles from "./submission.module.css";

export default function Submission() {
  const submissions = [
    { name: "Your submission" },
    { name: "Dan's submission" },
  ];
  return (
    <main className={styles.main}>
      <h1>NextJS Learning</h1>
      <h2>Submissions</h2>
      <ul className={styles.list}>
        {submissions.map((s, idx) => (
          <li key={idx} className={styles.listItem}>
            <div className={styles.submissionHeader}>
              <span>{s.name}</span>
            </div>
            <div className={styles.commentsBar}>
              <button className={styles.commentsButton}>Comments</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}