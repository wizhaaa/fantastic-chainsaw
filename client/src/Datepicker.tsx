import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { DateDivider } from "./Divider";
import styles from "./topbar.module.css";

type Props = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
};

export const TopDatePicker = ({ date, setDate }: Props) => {
  const [day, setDay] = useState<string>("DD");
  const [month, setMonth] = useState<string>("MM");
  const [year, setYear] = useState<string>("YYYY");

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dayRef && dayRef.current) {
      dayRef.current.focus();
    }
  }, [day]);

  useEffect(() => {
    monthRef.current!.focus();
  }, [month]);

  useEffect(() => {
    yearRef.current!.focus();
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

  const CustomInput = ({ onClick }: { value: string; onClick: () => void }) => (
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

  return (
    <DatePicker
      className={styles.date}
      placeholderText="MM/DD/YYYY"
      selected={date}
      onChange={changeDate}
      customInput={<CustomInput value="" onClick={()=>{}}/>}
    />
  );
};
