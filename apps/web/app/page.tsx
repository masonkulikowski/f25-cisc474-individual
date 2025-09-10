import Link from "next/link";

export default function Home() {
    return (
        <main style={{ padding: "1rem" }}>
        <h1>Home</h1>
        <div
            style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
            }}
        >
            {[1, 2, 3, 4, 5].map((id) => (
            <Link key={id} href="/course">
                <div
                style={{
                    border: "1px solid #ccc",
                    height: "120px",
                }}
                />
            </Link>
            ))}
        </div>
        </main>
    );
}
