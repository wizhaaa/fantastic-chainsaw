import styles from "./addmodal.module.css";
import {Option} from "./types";

import check from "./assets/check.svg";

export const AddModal = (props: Props) => {
  // const [currTable, setCurrTable] = useState<string | null>(null);
  const {
    display,
    setDisplay,
    allOptions,
    selectedOptions,
    setOptions,
    currTable,
    setCurrTable,
    otherTable,
  } = props;

  const handleSelect = (opt: Option) => {
    opt.selected = true;
    if (!currTable || selectedOptions.length === 0) setCurrTable(opt.table);
    else if (currTable && currTable != opt.table) {
      return;
    }
    setOptions([...selectedOptions, opt]);
    return true;
  };

  const handleDeselect = (deselect: Option) => {
    deselect.selected = false;
    if (selectedOptions.length === 1) setCurrTable(null);
    const newOptions = selectedOptions.filter(
      (opt) => opt.value != deselect.value
    );
    setOptions(newOptions);
  };

  const handleTick = (option: Option, selected: boolean) => {
    if (selected) handleDeselect(option);
    else handleSelect(option);
  };

  // const options = [1, 2, 3, 4];
  if (display)
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          Add
          <div className={styles.options}>
            {allOptions.map((opt) => {
              let selected = false;
              selectedOptions.map((x) => {
                if (opt.value === x.value) selected = true;
              });
              const disable =
                (currTable != null && opt.table != currTable) ||
                (otherTable != null && opt.table == otherTable);
              // if (opt.table === "both") disable = false;

              return (
                <div className={`${styles.row} ${disable && styles.disabled}`}>
                  {/* <input
                    className={`${styles.option} ${
                      selected && styles.selected
                    }`}
                    type="checkbox"
                    id={opt.value}
                    disabled={disable}
                    onClick={() => handleTick(opt, selected)}
                  /> */}
                  {selected && (
                    <div
                      className={styles.checkedbox}
                      onClick={() => handleTick(opt, selected)}
                    >
                      <img
                        className={styles.checkicon}
                        src={check}
                        alt="check"
                      />
                    </div>
                  )}
                  {!selected && (
                    <div
                      className={styles.checkbox}
                      onClick={() => {
                        if (!disable) handleTick(opt, selected);
                      }}
                    />
                  )}
                  <label htmlFor={opt.value}>{opt.value}</label>

                  {/* <button
                    className={`${styles.option} ${
                      selected && styles.selected
                    }`}
                    onClick={() => handleTick(opt, selected)}
                    disabled={disable}
                  ></button> */}
                  {/* {selected && (
                    <button
                      className={styles.deselect}
                      onClick={() => handleDeselect(opt)}
                    >
                      X
                    </button>
                  )} */}
                </div>
              );
            })}
          </div>
          <button
            className={styles.savebutton}
            onClick={() => setDisplay(false)}
          >
            Save
          </button>
        </div>
      </div>
    );
};

type Props = {
  display: boolean;
  setDisplay: (display: boolean) => void;
  allOptions: Option[];
  setOptions: (new_opts: Option[]) => void;
  selectedOptions: Option[];
  currTable: string | null;
  setCurrTable: (arg: string | null) => void;
  otherTable: string | null;
};
