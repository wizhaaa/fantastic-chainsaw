import styles from "./controls.module.css";
import {DragOption} from "./Option";
import {useEffect, useState} from "react";

import {Option} from "./types";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  closestCorners,
  DragMoveEvent,
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";

export const Controls = () => {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeItem, setActiveItem] = useState<Option | null>(null);

  const initial_options = [
    {
      content: "Desks",
      id: 1,
    },
    {
      content: "Pods",
      id: 2,
    },
    {
      content: "Traders",
      id: 3,
    },
    {
      content: "Type",
      id: 4,
    },
    {
      content: "Class",
      id: 5,
    },
  ];

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(initial_options);
  }, []);

  return (
    <div className={styles.controls}>
      <div className={styles.title}> Search </div>
      <div className={styles.searchcontainer}>
        <input
          type="text"
          placeholder="ETF, Stock, Desk A, etc"
          className={styles.searchinput}
        />
      </div>
      <div className={styles.title}> Grouping Order </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
      >
        <SortableContext items={options}>
          {options.map((option) => {
            return <DragOption option={option} />;
          })}
        </SortableContext>
        <DragOverlay>
          {activeItem && <DragOption option={activeItem} />}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function searchItemById(id: string | number) {
    return initial_options.find((item) => item.id === id);
  }

  function handleDragStart(event: DragStartEvent) {
    const {active} = event;
    setActiveItem(active?.data?.current?.option);
  }

  function handleDragMove(event: DragMoveEvent) {
    const {active, over} = event;

    // handle sorting
    if (active && over && active.id !== over.id) {
      // 1. find active items
      const activeItem = searchItemById(active.id);
      const overItem = searchItemById(over.id);
      if (!activeItem || !overItem) return;

      // find indices
      const activeIndex = options.findIndex((item) => item.id === active.id);
      const overIndex = options.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(options, activeIndex, overIndex);
      setOptions(updatedItems);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      console.log("Drag Ending");
    }
    setActiveItem(null);
  }
};
