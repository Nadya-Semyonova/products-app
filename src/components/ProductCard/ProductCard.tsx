import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import placeholderImage from "../../assets/placeholder.jpg";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  synopsis: string;
  score: number;
  liked: boolean;
  isUserCreated?: boolean;
  onLike: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onClick: (id: string | number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(
  ({
    id,
    title,
    imageUrl,
    synopsis,
    score,
    liked,
    isUserCreated,
    onLike,
    onDelete,
    onEdit,
    onClick,
  }) => {
    const [imgError, setImgError] = useState(false);

    const handleCardClick = (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".icon-button")) {
        onClick(id);
      }
    };

    return (
      <div className={styles.card} onClick={handleCardClick}>
        <img
          src={imgError ? placeholderImage : imageUrl}
          alt={title}
          className={styles.image}
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.synopsis}>{synopsis || "Нет описания"}</p>
          <p className={styles.score}>{score ? `${score}/10` : "Нет оценки"}</p>
          <div className={styles.actions}>
            <button
              className={`${styles.iconButton} icon-button`}
              onClick={(e) => {
                e.stopPropagation();
                onLike(id);
              }}
              aria-label={liked ? "Unlike" : "Like"}
            >
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </button>
            {isUserCreated && onEdit && (
              <button
                className={`${styles.iconButton} icon-button`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(id);
                }}
                aria-label="редактировать"
              >
                <EditIcon />
              </button>
            )}
            <button
              className={`${styles.iconButton} icon-button`}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              aria-label="удалить"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
