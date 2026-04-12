import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductList.module.css";

interface Product {
  id: string | number;
  title: string;
  imageUrl: string;
  synopsis: string;
  score: number;
  liked: boolean;
  isUserCreated?: boolean;
}

interface ProductListProps {
  products: Product[];
  onLike: (id: string | number) => void;
  onDelete: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onProductClick: (id: string | number) => void;
}

export const ProductList: React.FC<ProductListProps> = React.memo(
  ({ products, onLike, onDelete, onEdit, onProductClick }) => {
    if (products.length === 0) {
      return <div className={styles.empty}>No products found</div>;
    }

    return (
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.imageUrl}
            synopsis={product.synopsis}
            score={product.score}
            liked={product.liked}
            isUserCreated={product.isUserCreated}
            onLike={onLike}
            onDelete={onDelete}
            onEdit={onEdit}
            onClick={onProductClick}
          />
        ))}
      </div>
    );
  },
);

ProductList.displayName = "ProductList";
