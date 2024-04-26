import styles from "./filters.module.css";
import {useState} from "react";

import {Option} from "./types";
import dropdown from "./assets/dropdown.svg";
import dropup from "./assets/dropup.svg";

import add from "./assets/add.svg";
import minus from "./assets/minus.svg";
// [data]
// list of all possible options:

// for each options => api to call possible values and then render them (useEffect -> useState)

// [frontend states]
// selected filters <-> disable under possible option
// selected filters values want to filter by
// filters = { param1: [value1, value2, value3], param2: [v1,v2,v3], etc...}

const init = [
  "Desk A",
  "Desk B",
  "Desk C",
  "Desk D",
  "Desk E",
  "Desk F",
  "Desk G",
  "Desk H",
  "Desk I",
  "Desk J",
];

const filter_values = init.map((val) => {
  return {value: val, selected: false};
});

type Value = {
  value: string;
  selected: boolean;
};

const VariableMenu = (props: {
  options: Option[];
  handleSelect: (opt: Option) => void;
  current: Option | null;
}) => {
  const {current, options, handleSelect} = props;

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

const ValueMenu = (props: {
  options: Value[];
  handleSelect: (val: string) => void;
}) => {
  const {options, handleSelect} = props;

  return (
    <div className={styles.menu}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={styles.menuitem}
          onClick={() => handleSelect(opt.value)}
        >
          <div className={`${opt.selected ? styles.checked : styles.box} `} />
          {opt.value}
        </div>
      ))}
    </div>
  );
};

const FilterRow = (props: RowProps) => {
  const {index, row, deleteRow, updateValues, updateVariable, options} = props;

  const [varDrop, setVarDrop] = useState<boolean>(false);

  const [valueDrop, setValueDrop] = useState<boolean>(false);
  const [values, setValues] = useState<Value[]>(filter_values);

  const handleSelectVar = (newVariable: Option) => {
    updateVariable(index, newVariable);
    setVarDrop(false);
  };

  const handleDropDownVar = () => {
    setVarDrop(!varDrop);
  };

  const handleDropDownVal = () => {
    if (row.variable) setValueDrop(!valueDrop);
  };

  function sortBySelected(a: Value, b: Value) {
    if (a.selected && !b.selected) return -1;
    else if (!a.selected && b.selected) return 1;
    else return a.value.localeCompare(b.value);
  }

  const handleSelectVal = (newValue: string) => {
    const newIndex = row.values.indexOf(newValue);
    if (newIndex !== -1) {
      row.values.splice(newIndex, 1);
      updateValues(index, row.values);
    } else {
      row.values.push(newValue);
      console.log(row.values);
      updateValues(index, row.values);
    }

    const newSelections = values.map((val) => {
      if (val.value === newValue) return {...val, selected: !val.selected};
      return val;
    });
    newSelections.sort(sortBySelected);
    setValues(newSelections);

    // if (!selected.selected) selectedVals.push({...selected, selected: true});
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
      <div className={styles.column}>
        <div
          className={`${styles.dropdown} ${
            !row.variable && styles["dropdown-disabled"]
          }`}
          onClick={handleDropDownVal}
        >
          <div className={styles.text}>
            {row.values.length > 0
              ? row.values.map((val) => val).join(", ")
              : "Select Values"}
          </div>
          {!valueDrop ? (
            <img src={dropdown} alt="dropdown" />
          ) : (
            <img src={dropup} alt="dropup" />
          )}
        </div>
        {valueDrop && (
          <ValueMenu options={values} handleSelect={handleSelectVal} />
        )}
      </div>
      <img
        className={styles.minus}
        src={minus}
        alt="delete filter row"
        onClick={() => deleteRow(index)}
      />
    </div>
  );
};

export const Filters = (props: Props) => {
  const {options: initialOptions, filterRows, setFilterRows} = props;

  function addFilterRow() {
    if (filterRows.length === 0 || filterRows.slice(-1)[0].values.length > 0) {
      const newRows = [...filterRows, {variable: null, values: []}];
      setFilterRows(newRows);
    }
  }

  function deleteRow(index: number) {
    const newRows = [...filterRows];
    newRows.splice(index, 1);
    setFilterRows(newRows);
  }

  function updateVariable(index: number, variable: Option) {
    const newRows = [...filterRows];
    const variableExists = newRows.some(
      (row, i) => i !== index && row.variable === variable
    );
    if (!variableExists) {
      newRows[index].variable = variable;
      setFilterRows(newRows);
    }
  }

  function updateValues(index: number, newValues: string[]) {
    const newRows = [...filterRows];
    newRows[index].values = newValues;
    setFilterRows(newRows);
  }

  return (
    <div>
      <div className={styles.title}>
        Filter Variables by Value
        <img
          className={styles.add}
          src={add}
          alt="add new filter"
          onClick={addFilterRow}
        />
      </div>
      <div className={styles.filtercol}>
        {filterRows.map((row, i) => {
          return (
            <div key={row.variable?.value}>
              <FilterRow
                index={i}
                row={row}
                deleteRow={deleteRow}
                updateVariable={updateVariable}
                updateValues={updateValues}
                options={initialOptions}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

type Props = {
  options: Option[];
  filterRows: FilterRow[];
  setFilterRows: (rows: FilterRow[]) => void;
};

type RowProps = {
  index: number;
  row: {variable: Option | null; values: string[]};
  deleteRow: (i: number) => void;
  updateVariable: (i: number, v: Option) => void;
  updateValues: (i: number, v: string[]) => void;
  options: Option[];
};

type FilterRow = {
  variable: Option | null;
  values: string[];
};
