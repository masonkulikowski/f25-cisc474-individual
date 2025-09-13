import Link from "next/link";
import styles from "./page.module.css";

function getRandomColor(usedColors: Set<string>) {
    let color;
    do{
        const r = Math.floor(Math.random()* 76) + 180;
        const g = Math.floor(Math.random()* 76) + 180;
        const b = Math.floor(Math.random()* 76) + 180;
        color = `rgb(${r}, ${g}, ${b})`;
    } while (usedColors.has(color));
    usedColors.add(color);
    return color;
}

export default function Home() {
    const usedColors = new Set<string>();

    return (
        <main className={styles.main}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "7.5rem",
                    marginTop: "1rem",
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {[1, 2, 3, 4, 5].map((id) => {
                    const bgColor = getRandomColor(usedColors);
                    return (
                        <Link key={id} href="/course">
                            <div
                                className={styles.courseLink}
                                style={{ background: bgColor }}
                            >
                                Course {id}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}
