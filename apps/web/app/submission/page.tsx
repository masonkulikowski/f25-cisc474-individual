export default function Submission() {
  const submissions = [
    { name: "Your submission" },
    { name: "Dan's submission" },
  ];
  return (
    <main style={{ padding: "1rem" }}>
      <h1>NextJS Learning</h1>
      <h2 style={{ marginTop: "1rem" }}>Submissions</h2>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {submissions.map((s, idx) => (
          <li
            key={idx}
            style={{
              border: "1px solid #ccc",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{s.name}</span>
            <button>Comments</button>
          </li>
        ))}
      </ul>
    </main>
  );
}