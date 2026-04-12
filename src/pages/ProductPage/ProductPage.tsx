import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { fetchAnimeById } from "../../api/jikanApi";
import type {
  Product,
  UserCreatedProduct,
  DisplayProduct,
} from "../../store/types";
import styles from "./ProductPage.module.css";

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<DisplayProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((p) => p.id === id),
  );

  // Функция для преобразования API продукта в DisplayProduct
  const convertApiProductToDisplay = (apiProduct: Product): DisplayProduct => ({
    id: apiProduct.mal_id,
    title: apiProduct.title,
    imageUrl: apiProduct.images.jpg.image_url,
    synopsis: apiProduct.synopsis,
    score: apiProduct.score,
    status: apiProduct.status,
    year: apiProduct.year,
    episodes: apiProduct.episodes,
    isUserCreated: false,
  });

  // Функция для преобразования пользовательского продукта в DisplayProduct
  const convertUserProductToDisplay = (
    userProduct: UserCreatedProduct,
  ): DisplayProduct => ({
    id: userProduct.id,
    title: userProduct.title,
    imageUrl: userProduct.image_url,
    synopsis: userProduct.synopsis,
    score: userProduct.score,
    isUserCreated: true,
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (userProduct) {
        setProduct(convertUserProductToDisplay(userProduct));
        setLoading(false);
        return;
      }

      if (!id || isNaN(Number(id))) {
        setError("Неверный ID продукта");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchAnimeById(Number(id));
        setProduct(convertApiProductToDisplay(data));
        setError(null);
      } catch (err) {
        setError("Не удалось загрузить продукт");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, userProduct]);

  const handleBack = () => {
    navigate("/products");
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (error || !product) {
    return <div className={styles.error}>{error || "Продукт не найден"}</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        ← Назад к продуктам
      </button>

      <div className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <img
            src={product.imageUrl}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.score}>
            {product.score ? `${product.score}/10` : "Нет оценки"}
          </div>

          <div className={styles.info}>
            {product.status && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Статус</span>
                <span className={styles.infoValue}>{product.status}</span>
              </div>
            )}
            {product.year && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Год</span>
                <span className={styles.infoValue}>{product.year}</span>
              </div>
            )}
            {product.episodes && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Эпизоды</span>
                <span className={styles.infoValue}>{product.episodes}</span>
              </div>
            )}
            {product.isUserCreated && (
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Тип</span>
                <span className={styles.infoValue}>Создано пользователем</span>
              </div>
            )}
          </div>

          <div className={styles.synopsis}>
            <h3>Описание</h3>
            <p>{product.synopsis || "Описание не доступно."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
