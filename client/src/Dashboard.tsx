import {useState, useEffect} from "react";

import styles from "./dashboard.module.css";

import {Controls} from "./Controls";
import {View} from "./View";

import {QueryType} from "./types";
// const elements = Array.from({length: 40}, (_, index) => (
//   <div key={index}>
//     <div className={styles.entry}> </div>
//   </div>
// ));

export const Dashboard = () => {
  const [query, setQuery] = useState<QueryType>({
    select: [],
    groupby: [],
    filters: [],
  });

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
      <div>
        Current Query:
        <div>
          SELECT:{" "}
          {query.select
            .map((s) => [s.table, s.columnname].join(" "))
            .join(", ")}
        </div>
        <div>
          WHERE:
          {query.filters.map((filter) => (
            <div key={filter.variable?.value}>
              <div>
                {filter.variable?.table} {filter.variable?.value} =
              </div>
              <div>{filter.values.map((val) => val).join(", ")}</div>
            </div>
          ))}
        </div>
        <div>
          GROUP BY
          {query.groupby
            .map((s) => [s.table, s.columnname].join(" "))
            .join(", ")}
        </div>
      </div>

      <div className={styles.header}></div>
      <div className={styles.row}>
        <div className={styles.column}>
          <View />
        </div>

        <Controls setQuery={setQuery} />
      </div>
    </div>
  );
};
