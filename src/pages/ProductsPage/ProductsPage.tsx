import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import {
  setProducts,
  setLoading,
  setError,
  toggleLike,
  deleteProduct,
  setLikedFilter,
  setSearchQuery,
  setCurrentPage,
  setTotalPages,
} from "../../store/productsSlice";
import { fetchTopAnime } from "../../api/jikanApi";
import { ProductList } from "../../components/ProductList/ProductList";
import { Filters } from "../../components/Filters/Filters";
import { Search } from "../../components/Search/Search";
import { useProducts } from "../../hooks/useProducts";
import styles from "./ProductsPage.module.css";

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, likedFilter, searchQuery, currentPage, totalPages } =
    useSelector((state: RootState) => state.products);
  const { filteredProducts } = useProducts();

  useEffect(() => {
    const loadProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchTopAnime(currentPage);
        const productsWithLike = data.data.map((product) => ({
          ...product,
          liked: false,
        }));
        dispatch(setProducts(productsWithLike));
        dispatch(setTotalPages(data.pagination.last_visible_page));
        dispatch(setError(null));
      } catch (err) {
        dispatch(setError("Аниме не загружено"));
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadProducts();
  }, [dispatch, currentPage]);

  const handleLike = useCallback(
    (id: string | number) => {
      dispatch(toggleLike(id));
    },
    [dispatch],
  );

  const handleDelete = useCallback(
    (id: string | number) => {
      dispatch(deleteProduct(id));
    },
    [dispatch],
  );

  const handleProductClick = useCallback(
    (id: string | number) => {
      navigate(`/products/${id}`);
    },
    [navigate],
  );

  const handleCreateProduct = useCallback(() => {
    navigate("/create-product");
  }, [navigate]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setCurrentPage(newPage));
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [dispatch],
  );

  const mappedProducts = filteredProducts.map((product) => ({
    id: "mal_id" in product ? product.mal_id : product.id,
    title: product.title,
    imageUrl:
      "images" in product ? product.images.jpg.image_url : product.image_url,
    synopsis: product.synopsis || "No description available",
    score: product.score || 0,
    liked: product.liked || false,
    isUserCreated: product.isUserCreated || false,
  }));

  if (loading && currentPage === 1) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Коллекция топ аниме Тайтлов</h1>
        <button className={styles.createButton} onClick={handleCreateProduct}>
          Создать
        </button>
      </div>

      <Search
        value={searchQuery}
        onChange={(v) => dispatch(setSearchQuery(v))}
      />
      <Filters
        showLikedOnly={likedFilter}
        onToggleLikedFilter={(v) => dispatch(setLikedFilter(v))}
      />

      <ProductList
        products={mappedProducts}
        onLike={handleLike}
        onDelete={handleDelete}
        onProductClick={handleProductClick}
      />

      {!likedFilter && !searchQuery && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Предыдущие
          </button>
          <span className={styles.pageInfo}>
            Страница {currentPage} из {totalPages}
          </span>
          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Следующие
          </button>
        </div>
      )}
    </div>
  );
};
