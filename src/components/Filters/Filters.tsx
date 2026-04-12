import React from 'react';
import styles from './Filters.module.css';

interface FiltersProps {
  showLikedOnly: boolean;
  onToggleLikedFilter: (value: boolean) => void;
}

export const Filters: React.FC<FiltersProps> = React.memo(({
  showLikedOnly,
  onToggleLikedFilter,
}) => {
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filterButton} ${!showLikedOnly ? styles.filterButtonActive : ''}`}
        onClick={() => onToggleLikedFilter(false)}
      >
        Всё аниме
      </button>
      <button
        className={`${styles.filterButton} ${showLikedOnly ? styles.filterButtonActive : ''}`}
        onClick={() => onToggleLikedFilter(true)}
      >
        Избранное
      </button>
    </div>
  );
});

Filters.displayName = 'Filters';