import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {TopDatePicker} from "./Datepicker";
import {Divider} from "./Divider";
import styles from "./topbar.module.css";
import {DynamicInput} from "./DynamicInput";

export const TopBar = () => {
  const [tableName, setTableName] = useState("Table Name");
  const [valAtRisk] = useState(0);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [VaR, setVaR] = useState("90%");
  const [show, setShow] = useState(false);

  // const [var, setVar] = useState<String>("90");

  return (
    <div className={styles.container}>
      <DynamicInput value={tableName} setValue={setTableName} />
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

        <div className={styles.wrap}>
          <label htmlFor="confidence">Confidence Level:</label>
          <div className={styles.varwrapper}>
            {show && (
              <div
                className={styles.droppeddown}
                onClick={() => setShow(!show)}
              >
                {" "}
                {VaR}{" "}
              </div>
            )}
            {!show && (
              <div className={styles.dropdown} onClick={() => setShow(!show)}>
                {" "}
                {VaR}{" "}
              </div>
            )}

            {show && (
              <div className={styles.menu}>
                <div
                  className={styles.item}
                  onClick={() => {
                    setVaR("90%");
                    setShow(!show);
                  }}
                >
                  {" "}
                  90%{" "}
                </div>
                <div
                  className={styles.item}
                  onClick={() => {
                    setVaR("95%");
                    setShow(!show);
                  }}
                >
                  {" "}
                  95%{" "}
                </div>
                <div
                  className={styles.item}
                  onClick={() => {
                    setVaR("99%");
                    setShow(!show);
                  }}
                >
                  {" "}
                  99%{" "}
                </div>
              </div>
            )}
          </div>

          {/* <select id="confidence" name="confidence">
            <option value="95%">95%</option>
          </select> */}
        </div>

        <Divider />

        <div className={styles.var}>VaR: {valAtRisk} USD</div>
      </div>
    </div>
  );
};
