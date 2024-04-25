import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { DateDivider } from "./Divider";
import styles from "./topbar.module.css";

type Props = {
  date: Date;
  setDate: (value: React.SetStateAction<Date>) => void;
};

export const TopDatePicker = ({ date, setDate }: Props) => {
  const [day, setDay] = useState<string>("DD");
  const [month, setMonth] = useState<string>("MM");
  const [year, setYear] = useState<string>("YYYY");

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    dayRef.current.focus();
  }, [day]);

  useEffect(() => {
    monthRef.current.focus();
  }, [month]);

  useEffect(() => {
    yearRef.current.focus();
  }, [year]);

  const updateDate = () => {
    if (day && month && year) {
      console.log(parseInt(year));
      const newDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
      if (!isNaN(newDate.getTime())) {
        // Check if the date is valid
        console.log("hit");
        setDate(newDate);
      }
    }
  };

  const changeDate = (date: Date) => {
    setDay(String(date.getDate()));
    setMonth(String(date.getMonth() + 1));
    setYear(String(date.getFullYear()));
    setDate(date);
  };

  const CustomInput = ({ value, onClick }) => (
    <div className={styles.date} onClick={onClick}>
      <input
        type="text"
        value={month}
        ref={monthRef}
        onChange={(e) => setMonth(e.target.value)}
        onBlur={updateDate}
      />
      <DateDivider />
      <input
        type="text"
        value={day}
        ref={dayRef}
        onChange={(e) => setDay(e.target.value)}
        onBlur={updateDate}
      />
      <DateDivider />
      <input
        type="text"
        style={{ width: "250px" }}
        value={year}
        ref={yearRef}
        onChange={(e) => setYear(e.target.value)}
        onBlur={updateDate}
      />
    </div>
  );

  const updateDatePart = (val: string, datePart: string) => {
    const value = parseInt(val, 10);
    const newDate = new Date(date);
    if (datePart === "day") {
      newDate.setDate(value);
    } else if (datePart === "month") {
      newDate.setMonth(value - 1); // JavaScript months are 0-indexed
    } else if (datePart === "year") {
      newDate.setFullYear(value);
    }
    setDate(newDate);
  };

  return (
    <DatePicker
      className={styles.date}
      placeholderText="MM/DD/YYYY"
      selected={date}
      onChange={changeDate}
      customInput={<CustomInput />}
    />
  );
};
