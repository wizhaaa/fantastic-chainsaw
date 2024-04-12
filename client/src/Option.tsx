import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Option} from "./types";
import DragIcon from "./assets/drag-icon.svg";

import styles from "./controls.module.css";

export function DragOption(props: Readonly<Props>) {
  const {option} = props;

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
    opacity: "0.4",
  };
  return (
    <div
      className={styles.option}
      ref={setNodeRef}
      style={{...style, ...(isDragging ? draggingStyle : {})}}
    >
      <img
        className={styles.drag}
        src={DragIcon}
        alt="drag"
        {...attributes}
        {...listeners}
      />
      {option.content}
    </div>
  );
}

type Props = {
  option: Option;
};
