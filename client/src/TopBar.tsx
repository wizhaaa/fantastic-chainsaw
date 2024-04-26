import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { TopDatePicker } from "./Datepicker";
import { Divider } from "./Divider";
import styles from "./topbar.module.css";
import { DynamicInput } from "./DynamicInput";

export const TopBar = () => {
  const [tableName, setTableName] = useState("Table Name");
  const [valAtRisk] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className={styles.container}>
      <DynamicInput value={tableName} setValue={setTableName}/>
      <div className={styles.bar}>
        <div>
          <label htmlFor="start">Start:</label>
          <TopDatePicker date={startDate} setDate={setStartDate} />
        </div>

        <div>
          <label htmlFor="end">End:</label>
          <TopDatePicker date={endDate} setDate={setEndDate} />
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
