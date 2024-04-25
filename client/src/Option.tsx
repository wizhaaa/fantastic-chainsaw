import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Option} from "./types";
import DragIcon from "./assets/drag-icon.svg";
import CancelIcon from "./assets/cancel.svg";

import styles from "./controls.module.css";

/** Basic Option component - only renders the value  */
export function DragOption(props: Readonly<Props>) {
  const {option, handleDeselect} = props;

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: option.id,
      data: {
        option: option,
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const draggingStyle = {
    background: "#F5F5F5",
  };

  return (
    <div
      className={styles.option}
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
      <div className={styles.draggable} {...attributes} {...listeners}></div>
      {isDragging ? (
        <img className={styles.draggeddrag} src={DragIcon} alt="drag" />
      ) : (
        <img className={styles.drag} src={DragIcon} alt="drag" />
      )}
      {option.value}
      <img
        className={styles.cancel}
        src={CancelIcon}
        alt="cancel"
        onClick={() => {
          console.log("Click");
          handleDeselect(option);
        }}
      />
    </div>
  );
}

type Props = {
  option: Option;
  handleDeselect: (deselect: Option) => void;
};
