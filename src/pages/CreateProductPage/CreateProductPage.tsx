import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addUserProduct } from "../../store/productsSlice";
import { SuccessModal } from "../../components/SuccessModal/SuccessModal";
import styles from "../EditProductPage/EditProductPage.module.css";

interface FormData {
  title: string;
  synopsis: string;
  image_url: string;
  score: number;
}

export const CreateProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [productTitle, setProductTitle] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newProduct = {
      id: uuidv4(),
      title: data.title,
      synopsis: data.synopsis,
      image_url: data.image_url,
      score: data.score,
      liked: false,
      isUserCreated: true as const,
    };

    dispatch(addUserProduct(newProduct));
    setProductTitle(data.title);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добавь свой Тайтл в коллекцию</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Название</label>
          <input
            className={styles.input}
            {...register("title", {
              required: "Название обязательно",
              minLength: {
                value: 3,
                message: "Название должно содержать минимум 3 символа",
              },
            })}
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Описание</label>
          <textarea
            className={styles.textarea}
            {...register("synopsis", {
              required: "Описание обязательно",
              minLength: {
                value: 10,
                message: "Описание должно содержать минимум 10 символов",
              },
            })}
          />
          {errors.synopsis && (
            <span className={styles.error}>{errors.synopsis.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>URL изображения</label>
          <input
            className={styles.input}
            placeholder="https://example.com/image.jpg"
            {...register("image_url", {
              required: "URL изображения обязателен",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message:
                  "Введите корректный URL изображения (png, jpg, jpeg, gif, webp)",
              },
            })}
          />
          {errors.image_url && (
            <span className={styles.error}>{errors.image_url.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Рейтинг (1-10)</label>
          <input
            type="number"
            step="0.1"
            className={styles.input}
            {...register("score", {
              required: "Рейтинг обязателен",
              min: {
                value: 1,
                message: "Рейтинг должен быть не менее 1",
              },
              max: {
                value: 10,
                message: "Рейтинг должен быть не более 10",
              },
            })}
          />
          {errors.score && (
            <span className={styles.error}>{errors.score.message}</span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => navigate("/products")}
          >
            Отмена
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Создание..." : "Создать Тайтл"}
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={showModal}
        message={`"${productTitle}" добавлен в коллекцию!`}
        onClose={handleCloseModal}
      />
    </div>
  );
};
