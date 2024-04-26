import styles from "./dashboard.module.css";

import {QueryType} from "./types";

export const Query = (props: PropsType) => {
  const {query} = props;
  return (
    <div className={styles.code}>
      Current Query:
      <div>
        SELECT:{" "}
        {query.select.map((s) => [s.table, s.columnname].join(" ")).join(", ")}
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
        {query.groupby.map((s) => [s.table, s.columnname].join(" ")).join(", ")}
      </div>
    </div>
  );
};

type PropsType = {
  query: QueryType;
};
