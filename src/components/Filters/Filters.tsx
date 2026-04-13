import React, { useCallback } from "react";
import styles from "./Filters.module.css";

interface FiltersProps {
  showLikedOnly: boolean;
  onToggleLikedFilter: (value: boolean) => void;
}

export const Filters: React.FC<FiltersProps> = React.memo(
  ({ showLikedOnly, onToggleLikedFilter }) => {
    const handleShowAll = useCallback(() => {
      onToggleLikedFilter(false);
    }, [onToggleLikedFilter]);

    const handleShowFavorites = useCallback(() => {
      onToggleLikedFilter(true);
    }, [onToggleLikedFilter]);

    return (
      <div className={styles.filters}>
        <button
          className={`${styles.filterButton} ${!showLikedOnly ? styles.filterButtonActive : ""}`}
          onClick={handleShowAll}
        >
          Всё аниме
        </button>
        <button
          className={`${styles.filterButton} ${showLikedOnly ? styles.filterButtonActive : ""}`}
          onClick={handleShowFavorites}
        >
          Избранное
        </button>
      </div>
    );
  },
);

Filters.displayName = "Filters";
