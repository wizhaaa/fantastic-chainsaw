import { useState } from "react";
import styles from "./filters.module.css";

import dropdown from "./assets/dropdown.svg";
import dropup from "./assets/dropup.svg";
import { Option } from "./types";

const VariableMenu = (props: {
  options: Option[];
  handleSelect: (opt: Option) => void;
  current: Option | null;
}) => {
  const { current, options, handleSelect } = props;

  return (
    <div className={styles.menu}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={`${styles.menuitem} ${
            current?.id === opt.id && styles.selected
          }`}
          onClick={() => handleSelect(opt)}
        >
          {opt.value}
        </div>
      ))}
    </div>
  );
};

export const Dropdown = (props: RowProps) => {
  const { index, row, updateVariable, options } = props;

  const [varDrop, setVarDrop] = useState<boolean>(false);

  const handleSelectVar = (newVariable: Option) => {
    updateVariable(index, newVariable);
    setVarDrop(false);
  };

  const handleDropDownVar = () => {
    setVarDrop(!varDrop);
  };

  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <div className={styles.dropdown} onClick={handleDropDownVar}>
          {row.variable
            ? `${row.variable.value.toString()}`
            : "Select Variable"}
          {!varDrop ? (
            <img src={dropdown} alt="dropdown" />
          ) : (
            <img src={dropup} alt="dropup" />
          )}
        </div>
        {varDrop && (
          <VariableMenu
            options={options}
            handleSelect={handleSelectVar}
            current={row.variable}
          />
        )}
      </div>
    </div>
  );
};

type RowProps = {
  index: number;
  row: { variable: Option | null; values: string[] };
  updateVariable: (i: number, v: Option) => void;
  options: Option[];
};
