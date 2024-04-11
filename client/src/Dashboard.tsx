import Spreadsheet from "react-spreadsheet";
import styles from "./dashboard.module.css";

export const Dashboard = () => {
  const columnLabels = ["Flavour", "Food"];
  const rowLabels = ["Item 1", "Item 2"];

  const data = [
    [{ value: "Vanilla" }, { value: "Chocolate" }, {value: ""}, {value:""}],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];

  return (
    <div className={styles.page}>
      <div>Dashboard</div>
      <div> Filters & Selects </div>
      <div> main layout / grid / cells here </div>
      <Spreadsheet
        data={data}
        columnLabels={columnLabels}
        rowLabels={rowLabels}
      ></Spreadsheet>
    </div>
  );
};
