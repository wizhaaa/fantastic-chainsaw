import styles from "./view.module.css";

const Row = () => {
  const row = ["Desk A", "Pod 3", "Roger Cost", -529.85];

  return (
    <tr>
      {row.map((r) => (
        <td> {r} </td>
      ))}
    </tr>
  );
};

export const View = () => {
  const row = ["Desk A", "Pod 3", "John Doe", -529.85];
  const list = [row, row, row, row, row, row, row, row, row, row, row];
  return (
    <div className={styles.container}>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>Desk</th>
            <th>Pod</th>
            <th>Trader</th>
            <th>VaR-95</th>
          </tr>
        </thead>
        <tbody>
          {list.map(() => (
            <Row />
          ))}
        </tbody>
      </table>
    </div>
  );
};
