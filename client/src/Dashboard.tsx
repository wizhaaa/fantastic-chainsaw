import Spreadsheet from "react-spreadsheet";
import styles from "./dashboard.module.css";

export const Dashboard = () => {

  const data = new Array(100)
    .fill(null)
    .map(() => new Array(20).fill({ value: "" }));

  return (
    <div style={{ overflow: "scroll", width: "80vw", height: "100vh" }}>

      <Spreadsheet
        data={data}
      ></Spreadsheet>
    </div>
  );
};
