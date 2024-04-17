import styles from "./dashboard.module.css";

import {Controls} from "./Controls";

const elements = Array.from({length: 40}, (_, index) => (
  <div key={index}>
    <div className={styles.entry}> </div>
  </div>
));

export const Dashboard = () => {
  return (
    <div className={styles.page}>
      <div className={styles.row}>
        <div className={styles.column}>{elements}</div>

        <Controls />
      </div>
    </div>
  );
};
