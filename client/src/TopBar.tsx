import { useState } from "react";
import { Divider } from "./Divider";
import styles from "./topbar.module.css";
//type Props = {}

export const TopBar = () => {
  const [tableName, setTableName] = useState("Table Name");
  const [valAtRisk, setValAtRisk] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{tableName}</div>
      <div className={styles.bar}>
        <div>
          <label htmlFor="start">Start:</label>
          <input type="date" id="start" name="start" />
        </div>

        <div>
          <label htmlFor="end">End:</label>
          <input type="date" id="end" name="end" />
        </div>

        <Divider />

        <div>
          <label htmlFor="confidence">Confidence Level:</label>
          <select id="confidence" name="confidence">
            <option value="95%">95%</option>
          </select>
        </div>

        <Divider />

        <div className={styles.var}>VaR: {valAtRisk}</div>
      </div>
    </div>
  );
};
