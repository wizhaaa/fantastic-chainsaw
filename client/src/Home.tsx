import styles from "./app.module.css";
import {Link} from "react-router-dom";

export const Home = () => {
  return (
    <div className={styles.landing}>
      <div> ... beep beep loading ... </div>
      <div className={styles.title}>Millenium VaR Platform</div>
      <Link to="/dashboard">
        <button>Launch</button>
      </Link>
    </div>
  );
};
