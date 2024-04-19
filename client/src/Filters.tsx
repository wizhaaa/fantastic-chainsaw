import styles from "./filters.module.css";
import {useEffect, useState} from "react";

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
          {opt.value} [{opt.selected.toString()}]
        </div>
      ))}
    </div>
  );
};

const ValueMenu = (props: {
  options: Value[];
  handleSelect: (val: Value) => void;
}) => {
  const {options, handleSelect} = props;
  return (
    <div className={styles.menu}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={styles.menuitem}
          onClick={() => handleSelect(opt)}
        >
          <div className={`${opt.selected ? styles.checked : styles.box} `} />
          {opt.value} | [{opt.selected.toString()}]
        </div>
      ))}
    </div>
  );
};

const FilterRow = (props: RowProps) => {
  const {options, setOptions, handleFilter} = props;

  const [currVariable, setCurrVariable] = useState<Option | null>(null);
  const [varDrop, setVarDrop] = useState<boolean>(false);

  const [valueDrop, setValueDrop] = useState<boolean>(false);
  const [values, setValues] = useState<Value[]>(filter_values);
  const [selectedVals, setSelectedVals] = useState<Value[]>([]);

  const handleSelectVar = (newVariable: Option) => {
    // check if another filter row selected this filter already
    // 1. look at all variables => if var.selected & var.value = newVar then we just return early
    let selected = false;
    options.map((opt) => {
      if (opt.selected && opt.value === newVariable.value) selected = true;
    });
    if (selected) return;

    if (newVariable.value !== currVariable?.value) setSelectedVals([]);

    // is not selected before
    newVariable.selected = !newVariable.selected;

    setVarDrop(false);
    const newOptions = options.map((opt) => {
      if (newVariable.value === opt.value) return newVariable;
      else if (opt.value === currVariable?.value)
        return {...opt, selected: false};
      else return opt;
    });
    if (newVariable.selected) setCurrVariable(newVariable);
    else setCurrVariable(null);
    setOptions(newOptions);
  };

  const handleDropDownVar = () => {
    setVarDrop(!varDrop);
  };

  const handleDropDownVal = () => {
    setValueDrop(!valueDrop);
  };

  function sortBySelected(a: Value, b: Value) {
    if (a.selected && !b.selected) return -1;
    else if (!a.selected && b.selected) return 1;
    else return a.value.localeCompare(b.value);
  }

  const handleSelectVal = (selected: Value) => {
    const newSelections = values.map((val) => {
      if (val.value === selected.value)
        return {...val, selected: !val.selected};
      return val;
    });
    newSelections.sort(sortBySelected);
    setValues(newSelections);

    if (!selected.selected) selectedVals.push({...selected, selected: true});
    // const selectedFilter = values.filter((val) => val.selected);
    // setSelectedVals(selectedFilter);

    console.log(selectedVals);
    if (currVariable && values.length > 0)
      handleFilter(currVariable, selectedVals);
  };

  return (
    <div className={styles.row}>
      <div className={styles.column}>
        <div className={styles.dropdown} onClick={handleDropDownVar}>
          {currVariable
            ? `${currVariable.value.toString()}`
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
            current={currVariable}
          />
        )}
      </div>
      <div className={styles.column}>
        <div className={styles.dropdown} onClick={handleDropDownVal}>
          <div className={styles.text}>
            {selectedVals.length > 0
              ? selectedVals.map((val) => val.value).join(", ")
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
      <img className={styles.minus} src={minus} alt="add new filter" />
    </div>
  );
};

export const Filters = (props: Props) => {
  useEffect(() => {}, []);

  const {options: initialOptions} = props;
  const [options, setOptions] = useState(initialOptions);
  const [filters, setFilters] = useState<Filter>({});

  function handleFilter(variable: Option, values: Value[]) {
    setFilters({...filters, [variable.value]: values});
    console.log("Filters ", filters);
  }

  return (
    <div>
      <div className={styles.title}>
        Filter <img className={styles.add} src={add} alt="add new filter" />
      </div>
      <div> Current Where Clause: </div>
      <div>
        {Object.keys(filters).map((key: string) => (
          <div key={key}>
            <div>{key}</div>
            <div>
              {filters[key].map((val) => (
                <div key={key}> {val.value} </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div> Selected: </div>
      <div>
        {options.map((opt) => {
          if (opt.selected) return <div> {opt.value} </div>;
        })}
      </div>
      <FilterRow
        options={options}
        setOptions={setOptions}
        handleFilter={handleFilter}
      />
    </div>
  );
};

type Props = {
  options: Option[];
};

type RowProps = {
  options: Option[];
  setOptions: (opt: Option[]) => void;
  handleFilter: (key: Option, values: Value[]) => void;
};

type Filter = {
  [key: string]: {value: string}[];
};
