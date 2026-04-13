import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useMemo } from "react";
import type { Product, UserCreatedProduct } from "../store/types";

export const useProducts = () => {
  const { items, userProducts, likedFilter, searchQuery } = useSelector(
    (state: RootState) => state.products,
  );

  const filteredProducts = useMemo(() => {
    // Объединяем API продукты и пользовательские
    let allProducts: (Product | UserCreatedProduct)[] = [
      ...items,
      ...userProducts,
    ];

    // Фильтр по лайкам
    if (likedFilter) {
      allProducts = allProducts.filter((p) => p.liked === true);
    }

    // Фильтр по поиску
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      allProducts = allProducts.filter((p) =>
        p.title.toLowerCase().includes(query),
      );
    }

    return allProducts;
  }, [items, userProducts, likedFilter, searchQuery]);

  return { filteredProducts, hasProducts: filteredProducts.length > 0 };
};
