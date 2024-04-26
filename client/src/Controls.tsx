import styles from "./controls.module.css";
import {DragOption} from "./Option";
import {useEffect, useState} from "react";

import {Option, FilterRow, QueryType} from "./types";

import {AddModal} from "./AddModal";
import {Filters} from "./Filters";

import trashicon from "./assets/trash.svg";
import addicon from "./assets/add.svg";

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

type Display = "none" | "loading" | "data";

type PropsType = {
  setQuery: (q: QueryType) => void;
  setDisplay: (s: Display) => void;
};

export const Controls = (props: PropsType) => {
  const {setQuery, setDisplay} = props;

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function handleApply() {
    setDisplay("loading");
    await sleep(1000);
    setDisplay("data");
  }

  const sensors = useSensors(useSensor(PointerSensor));
  const [activeItem, setActiveItem] = useState<Option | null>(null);

  const all_options: Option[] = [
    {
      value: "Desks",
      id: 1,
      table: "positions",
      selected: false,
      columnname: "desk",
    },
    {
      value: "Pods",
      id: 2,
      table: "positions",
      selected: false,
      columnname: "pod",
    },
    {
      value: "Traders",
      id: 3,
      table: "positions",
      selected: false,
      columnname: "trader",
    },
    {
      value: "Security ID",
      id: 4,
      table: "securities",
      selected: false,
      columnname: "securityid",
    },
    {
      value: "Security Type",
      id: 5,
      table: "securities",
      selected: false,
      columnname: "securitytype",
    },
    {
      value: "Asset Class",
      id: 6,
      table: "securities",
      selected: false,
      columnname: "assetclass",
    },
    {
      value: "Currency",
      id: 7,
      table: "securities",
      selected: false,
      columnname: "tradingcurrency",
    },
    {
      value: "Country",
      id: 8,
      table: "securities",
      selected: false,
      columnname: "tradingcountry",
    },
    {
      value: "Rating",
      id: 9,
      table: "securities",
      selected: false,
      columnname: "rating",
    },
    {
      value: "Region",
      id: 10,
      table: "securities",
      selected: false,
      columnname: "regionname",
    },
  ];

  const [rows, setRows] = useState<Option[]>([]);
  const [columns, setColumns] = useState<Option[]>([]);

  // Group Bys
  const [rowsTable, setRowsTable] = useState<string | null>(null);
  // Select Clause
  const [colsTable, setColsTable] = useState<string | null>(null);
  // Filters:
  const [filterRows, setFilterRows] = useState<FilterRow[]>([
    {variable: null, values: []},
  ]);

  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [showAddColModal, setShowAddColModal] = useState(false);

  const addRow = () => {
    setShowAddRowModal(true);
  };

  const addColumn = () => {
    setShowAddColModal(true);
  };

  function clearRows() {
    setRows([]);
    setRowsTable(null);
  }

  function clearCols() {
    setColumns([]);
    setColsTable(null);
  }

  function handleDeselectRow(deselect: Option) {
    console.log("deselecting row");
    deselect.selected = false;
    if (rows.length === 1) setRowsTable(null);
    const newOptions = rows.filter((opt) => opt.value != deselect.value);
    setRows(newOptions);
  }

  function handleDeselectCol(deselect: Option) {
    deselect.selected = false;
    if (columns.length === 1) setColsTable(null);
    const newOptions = columns.filter((opt) => opt.value != deselect.value);
    setColumns(newOptions);
  }

  useEffect(() => {
    console.log("Query Updated");
    setQuery({
      select: columns,
      groupby: rows,
      filters: filterRows,
    });
  }, [rows, columns, filterRows, setQuery]);

  return (
    <div className={styles.controls}>
      <AddModal
        allOptions={all_options}
        display={showAddRowModal}
        setDisplay={setShowAddRowModal}
        selectedOptions={rows}
        setOptions={setRows}
        currTable={rowsTable}
        setCurrTable={setRowsTable}
        otherTable={colsTable}
      />
      <AddModal
        allOptions={all_options}
        display={showAddColModal}
        setDisplay={setShowAddColModal}
        selectedOptions={columns}
        setOptions={setColumns}
        currTable={colsTable}
        setCurrTable={setColsTable}
        otherTable={rowsTable}
      />
      {/* 
      <div className={styles.title}> Filter Results </div>
      <div className={styles.searchcontainer}>
        <input
          type="text"
          placeholder="ETF, Stock, Desk A, etc"
          className={styles.searchinput}
        />
      </div> */}
      <div className={styles.controlstitle}> Controls </div>
      <div className={styles.row}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
        >
          <SortableContext items={rows}>
            <div className={styles.column}>
              <div className={styles.headerrow}>
                <div className={styles.title}> Rows </div>
                <button className={styles.addbutton} onClick={addRow}>
                  <img src={addicon} alt="add" />
                </button>
              </div>
              {rows.length > 0 ? (
                <div className={styles.groupbubble}>
                  {rows.map((option, i) => {
                    return (
                      <DragOption
                        key={i}
                        option={option}
                        handleDeselect={handleDeselectRow}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptybubble}> Add a variable </div>
              )}

              <div className={styles.clearall} onClick={clearRows}>
                <img src={trashicon} alt="trash icon" />
                <span className={styles.cleartext}>Clear All</span>
              </div>
            </div>
          </SortableContext>
          <DragOverlay>
            {activeItem && (
              <DragOption
                option={activeItem}
                handleDeselect={handleDeselectRow}
              />
            )}
          </DragOverlay>
        </DndContext>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragMove={handleDragMoveColumn}
        >
          <SortableContext items={rows}>
            <div className={styles.column}>
              <div className={styles.headerrow}>
                <div className={styles.title}> Columns </div>
                <button className={styles.addbutton} onClick={addColumn}>
                  <img src={addicon} alt="add" />
                </button>
              </div>
              {columns.length > 0 ? (
                <div className={styles.groupbubble}>
                  {columns.map((option, i) => {
                    return (
                      <DragOption
                        key={i}
                        option={option}
                        handleDeselect={handleDeselectCol}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={styles.emptybubble}> Add a variable </div>
              )}

              <div className={styles.clearall} onClick={clearCols}>
                <img src={trashicon} alt="trash icon" />
                <span className={styles.cleartext}>Clear All</span>
              </div>
            </div>
          </SortableContext>
          <DragOverlay>
            {activeItem && (
              <DragOption
                option={activeItem}
                handleDeselect={handleDeselectCol}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
      <Filters
        options={all_options}
        filterRows={filterRows}
        setFilterRows={setFilterRows}
      />
      <button onClick={handleApply}> Apply </button>
    </div>
  );

  function getColumnById(id: string | number) {
    return all_options.find((col: Option) => col.id === id);
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
      const activeItem = getColumnById(active.id);
      const overItem = getColumnById(over.id);
      if (!activeItem || !overItem) return;

      // find indices
      const activeIndex = rows.findIndex((item) => item.id === active.id);
      const overIndex = rows.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(rows, activeIndex, overIndex);
      setRows(updatedItems);
      // update options !
    }
  }

  function handleDragMoveColumn(event: DragMoveEvent) {
    const {active, over} = event;

    // handle sorting
    if (active && over && active.id !== over.id) {
      // 1. find active items
      const activeItem = getColumnById(active.id);
      const overItem = getColumnById(over.id);
      if (!activeItem || !overItem) return;

      // find indices
      const activeIndex = columns.findIndex((item) => item.id === active.id);
      const overIndex = columns.findIndex((item) => item.id === over.id);

      const updatedItems = arrayMove(columns, activeIndex, overIndex);
      setColumns(updatedItems);
      // update options !
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
