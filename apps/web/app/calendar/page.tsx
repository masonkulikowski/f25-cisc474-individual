import styles from './calendar.module.css';

export default function Calendar() {
  const weeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];
  return (
    <main className={styles.main}>
      <table className={styles.calendarTable}>
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} className={styles.calendarCell}>
                  {day && <div>{day}</div>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}