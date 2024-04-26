import {useState, useEffect} from "react";

import styles from "./dashboard.module.css";

import {Controls} from "./Controls";
import {TopBar} from "./TopBar";
import {View} from "./View";

import {QueryType} from "./types";
// const elements = Array.from({length: 40}, (_, index) => (
//   <div key={index}>
//     <div className={styles.entry}> </div>
//   </div>
// ));

type Display = "none" | "loading" | "data";

export const Dashboard = () => {
  const [query, setQuery] = useState<QueryType>({
    select: [],
    groupby: [],
    filters: [],
  });

  const [display, setDisplay] = useState<Display>("none");

  useEffect(() => {
    let sqlquery = "S" + "ELECT ";
    sqlquery += query.select
      .map((s) => [s.table, s.columnname].join(" "))
      .join(", ");
    sqlquery += " FROM positions, securities, pnl";

    if (query.filters[0]?.variable !== null) {
      sqlquery += " WHERE ";
      sqlquery += query.filters
        .map(
          (filter) =>
            `${filter.variable?.columnname} = ${filter.values.join(", ")} `
        )
        .join(", ");
    }

    sqlquery += " GROUP BY ";
    sqlquery += query.groupby
      .map((s) => [s.table, s.columnname].join(" "))
      .join(", ");

    console.log(sqlquery);
  }, [query]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <TopBar />
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <View display={display} />
        </div>

        <Controls setQuery={setQuery} setDisplay={setDisplay} />
      </div>
    </div>
  );
};
