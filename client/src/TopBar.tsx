import styles from "./topbar.module.css";
//type Props = {}

export const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Table Name</div>
      <div className={styles.bar}>
        <div>
          <label htmlFor="start">Start</label>
          <input type="date" id="start" name="start" />
        </div>

        <div>
          <label htmlFor="end">End</label>
          <input type="date" id="end" name="end" />
        </div>

        <div>
          <label htmlFor="confidence">Confidence Level</label>
          <select id="confidence" name="confidence">
            <option value="95%">95%</option>
          </select>
        </div>

        <div>VaR: 12, 345 USD</div>
      </div>
    </div>
  );
};
