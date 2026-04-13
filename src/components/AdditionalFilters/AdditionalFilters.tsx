import { useDispatch, useSelector } from "react-redux";
import { useMemo, useCallback } from "react";
import type { RootState } from "../../store/store";
import { setYearFilter, clearAllFilters } from "../../store/productsSlice";
import type { YearRange } from "../../store/types";
import styles from "./AdditionalFilters.module.css";
import React from "react";

interface YearRangeItem {
  label: string;
  min: number | null;
  max: number | null;
}

export const AdditionalFilters: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { yearFilter } = useSelector((state: RootState) => state.products);

  // Функция для генерации динамических диапазонов годов
  const yearRanges = useMemo((): YearRangeItem[] => {
    const currentYear = new Date().getFullYear();
    const ranges: YearRangeItem[] = [];

    let startYear = currentYear;
    let endYear = currentYear;

    while (startYear % 5 !== 0) {
      startYear--;
    }
    endYear = startYear + 4;

    while (startYear >= 2005) {
      ranges.push({
        label: `${startYear}-${endYear}`,
        min: startYear,
        max: endYear,
      });

      startYear -= 5;
      endYear = startYear + 4;
    }

    return ranges;
  }, []);

  const handleYearFilter = useCallback(
    (range: YearRangeItem | null) => {
      if (range === null) {
        dispatch(setYearFilter(null));
      } else {
        const yearRangeValue: YearRange = {
          type: "range",
          min: range.min,
          max: range.max,
          label: range.label,
        };
        dispatch(setYearFilter(yearRangeValue));
      }
    },
    [dispatch],
  );

  const handleClearFilters = useCallback(() => {
    dispatch(clearAllFilters());
  }, [dispatch]);

  const isYearRangeActive = useCallback(
    (range: YearRangeItem): boolean => {
      if (
        !yearFilter ||
        typeof yearFilter !== "object" ||
        !("label" in yearFilter)
      ) {
        return false;
      }
      return yearFilter.label === range.label;
    },
    [yearFilter],
  );

  const hasActiveFilters = yearFilter !== null;

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Год выпуска</h4>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.filterButton} ${yearFilter === null ? styles.active : ""}`}
            onClick={() => handleYearFilter(null)}
          >
            Все
          </button>
          {yearRanges.map((range) => (
            <button
              key={range.label}
              className={`${styles.filterButton} ${isYearRangeActive(range) ? styles.active : ""}`}
              onClick={() => handleYearFilter(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className={styles.clearButton} onClick={handleClearFilters}>
          Сбросить фильтр
        </button>
      )}
    </div>
  );
});

AdditionalFilters.displayName = "AdditionalFilters";
