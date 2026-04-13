import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useMemo } from "react";
import type { Product, UserCreatedProduct } from "../store/types";

export const useProducts = () => {
  const {
    items,
    userProducts,
    likedFilter,
    searchQuery,
    ratingFilter,
    yearFilter,
  } = useSelector((state: RootState) => state.products);

  const filteredProducts = useMemo(() => {
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

    // Фильтр по рейтингу
    if (ratingFilter !== null) {
      allProducts = allProducts.filter((p) => (p.score || 0) >= ratingFilter);
    }

    // Фильтр по году (с поддержкой динамических диапазонов)
    if (yearFilter !== null) {
      allProducts = allProducts.filter((p) => {
        // Проверяем, есть ли у продукта год
        if ("year" in p && p.year && typeof p.year === "number") {
          const productYear = p.year;

          // Если yearFilter - это объект YearRange
          if (
            typeof yearFilter === "object" &&
            "type" in yearFilter &&
            yearFilter.type === "range"
          ) {
            const { min, max } = yearFilter;

            // Диапазон с min и max (например, 2021-2026)
            if (min !== null && max !== null) {
              return productYear >= min && productYear <= max;
            }
            // Только max (до определенного года, например, "До 1970")
            if (min === null && max !== null) {
              return productYear <= max;
            }
          }

          // Если yearFilter - это число (для обратной совместимости)
          if (typeof yearFilter === "number") {
            return productYear >= yearFilter;
          }
        }
        return false;
      });
    }

    return allProducts;
  }, [items, userProducts, likedFilter, searchQuery, ratingFilter, yearFilter]);

  return { filteredProducts, hasProducts: filteredProducts.length > 0 };
};
