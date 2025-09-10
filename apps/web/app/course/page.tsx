import Link from "next/link";

export default function Course() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Advanced Web Technologies - CISC474</h1>
      <p>Dr. Austin Bart</p>
      <p>MWF 12:30-1:35</p>
      <p>Sharp 140</p>
      <section style={{ marginTop: "1rem" }}>
        <h2>Upcoming</h2>
        <ul>
          <li>
            <Link href="/assignment">Web App Planning - 9/9</Link>
          </li>
          <li>
            <Link href="/assignment">NextJS Learning - 9/10</Link>
          </li>
        </ul>
      </section>
    </main>
  );
}