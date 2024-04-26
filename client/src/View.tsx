import React, { useState, useEffect } from "react";
import styles from "./view.module.css";
import { data } from "../data/fake_data";

type RowProps = {
  row: {
    desk: string;
    pod: string;
    assetclass: string;
    "percentile_approx(CAST(pnl AS DOUBLE), 0.05, 10000)": number;
  };
};

const Row = (props: RowProps) => {
  const { row } = props;
  // const row = data[i];

  return (
    <tr>
      {/* {row.map((r) => (
        <td> {r} </td>
      ))} */}
      <td> {row.desk}</td>
      <td> {row.pod}</td>
      <td> {row.assetclass}</td>
      <td> {row["percentile_approx(CAST(pnl AS DOUBLE), 0.05, 10000)"]}</td>
      {/* {JSON.stringify(row, null, 2)} */}
    </tr>
  );
};

export const View = () => {
  useEffect(() => {
    const table = document.querySelector(`.${styles.container} table`);
    let headerCell = null;
    for (let row of table.rows) {
      let firstCell = row.cells[0];

      if (headerCell === null || firstCell.innerText !== headerCell.innerText) {
        headerCell = firstCell;
      } else {
        headerCell.rowSpan++;
        firstCell.remove();
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <table cellSpacing={0}>
        <thead>
          <tr>
            <th>Desk</th>
            <th>Pod</th>
            <th>AssetClass</th>
            <th>VaR-95</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <Row row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};