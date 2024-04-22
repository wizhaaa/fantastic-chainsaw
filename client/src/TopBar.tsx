import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Divider } from "./Divider";
import styles from "./topbar.module.css";

//type Props = {}

export const TopBar = () => {
  const [tableName, setTableName] = useState("Table Name");
  const [valAtRisk, setValAtRisk] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);


  return (
    <div className={styles.container}>
      <div className={styles.title}>{tableName}</div>
      <div className={styles.bar}>
        <div>
          <label htmlFor="start">Start:</label>
          <DatePicker
            className={styles.date}
            placeholderText="MM | DD | YYYY"
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
          />
        </div>

        <div>
          <label htmlFor="end">End:</label>
          <DatePicker
            className={styles.date}
            placeholderText="MM | DD | YYYY"
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
          />
        </div>

        <Divider />

        <div>
          <label htmlFor="confidence">Confidence Level:</label>
          <select id="confidence" name="confidence">
            <option value="95%">95%</option>
          </select>
        </div>

        <Divider />

        <div className={styles.var}>VaR: {valAtRisk} USD</div>
      </div>
    </div>
  );
};
