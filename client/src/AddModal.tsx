import styles from "./addmodal.module.css";
import {Option} from "./types";

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

  // const options = [1, 2, 3, 4];
  if (display)
    return (
      <div className={styles.modal}>
        <div className={styles.content}>
          Add
          <div> selected options: </div>
          {/* <div className={styles.options}>
            {selectedOptions.map((opt) => {
              return <div className={styles.option}>{opt.value}</div>;
            })}
          </div> */}
          <div className={styles.options}>
            {allOptions.map((opt) => {
              let selected = false;
              selectedOptions.map((x) => {
                if (opt.value === x.value) selected = true;
              });
              const disable =
                (currTable != null && opt.table != currTable) ||
                (otherTable != null && opt.table == otherTable);

              return (
                <div className={styles.row}>
                  <button
                    className={`${styles.option} ${
                      selected && styles.selected
                    }`}
                    onClick={() => !selected && handleSelect(opt)}
                    disabled={disable}
                  >
                    <span>{opt.value}</span>
                    {/* Selected = {selected.toString()} */}
                  </button>
                  {selected && (
                    <button
                      className={styles.deselect}
                      onClick={() => handleDeselect(opt)}
                    >
                      X
                    </button>
                  )}
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
