import { useEffect, useRef } from "react";
import styles from "./topbar.module.css";
type Props = {
  value: string | number | readonly string[] | undefined;
  setValue: (value: React.SetStateAction<string>) => void;
};

export function DynamicInput({ value, setValue }: Props) {
  const spanRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 2}px`; // +2 for some padding
    }
  }, [value]); // Update width when inputValue changes

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        className={styles.title}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (value == "") {
            setValue("Untitled Table");
          }
        }}
        style={{ width: "100%", minWidth: "20px", maxWidth: "500px" }} // Start with a small width
      />
      <span ref={spanRef} className={styles.titleSpan}>
        {value || " "} {/* Render a space to ensure a minimum size */}
      </span>
    </div>
  );
}
