import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Divider } from "./Divider";
import { TopDatePicker } from "./Datepicker";
import styles from "./topbar.module.css";

export const TopBar = () => {
  const [tableName] = useState("Table Name");
  const [valAtRisk] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className={styles.container}>
      <div className={styles.title}>{tableName}</div>
      <div className={styles.bar}>
        <div>
          <label htmlFor="start">Start:</label>
          <TopDatePicker
            date={startDate}
            setDate={setStartDate}
          ></TopDatePicker>
        </div>

        <div>
          <label htmlFor="end">End:</label>
          <TopDatePicker date={endDate} setDate={setEndDate}></TopDatePicker>
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
