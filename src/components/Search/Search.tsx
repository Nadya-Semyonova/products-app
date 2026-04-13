import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Search.module.css";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Search: React.FC<SearchProps> = React.memo(
  ({ value, onChange, placeholder = "поиск аниме" }) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, 300);

    useEffect(() => {
      onChange(debouncedValue);
    }, [debouncedValue, onChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
      },
      [],
    );

    return (
      <div className={styles.search}>
        <input
          type="text"
          className={styles.input}
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

Search.displayName = "Search";
