import styles from "./topbar.module.css";
//type Props = {}

export const TopBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Table Name</div>
      <div className={styles.bar}></div>
    </div>
  );
};
