export default function Calendar() {
  const weeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];
  return (
    <main style={{ padding: "1rem" }}>
      <h1>October</h1>
      <table
        style={{
          borderCollapse: "collapse",
          marginTop: "1rem",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <tbody>
          {weeks.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td
                  key={j}
                  style={{
                    border: "1px solid #ccc",
                    width: "14%",
                    height: "80px",
                    verticalAlign: "top",
                    padding: "4px",
                  }}
                >
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