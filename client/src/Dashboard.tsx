import styles from "./dashboard.module.css";

import {Controls} from "./Controls";

export const Dashboard = () => {
  return (
    <div className={styles.page}>
      <div> Dashboard </div>
      <div> Filters & Selects </div>
      <div> main layout / grid / cells here </div>
      <div className={styles.row}>
        <div className={styles.view}> View Here </div>
        <Controls />
      </div>
    </div>
  );
};
