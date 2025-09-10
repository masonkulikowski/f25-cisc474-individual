import Link from "next/link";

export default function Assignment() {
  return (
    <main style={{ padding: "1rem" }}>
      <Link href="/course">&lt; Back to Course</Link>
      <h1 style={{ marginTop: "1rem" }}>NextJS Learning</h1>
      <p>due 9/10</p>
      <p style={{ marginTop: "1rem" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        habitant morbi tristique senectus et netus.
      </p>
      <div style={{ marginTop: "1rem" }}>
        <input type="file" />
      </div>
      <button style={{ marginTop: "1rem" }}>Submit</button>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/submission">View submissions</Link>
      </p>
    </main>
  );
}