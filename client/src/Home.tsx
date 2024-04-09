import styles from "./app.module.css";

export const Home = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.title}>Millenium VaR Platform</div>
      <button>Launch</button>
    </div>
  );
};
