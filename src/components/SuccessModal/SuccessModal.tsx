import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SuccessModal.module.css";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const handleGoToHome = useCallback(() => {
    onClose();
    navigate("/products");
  }, [onClose, navigate]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={handleGoToHome}>
          На главную
        </button>
        <button className={styles.closeButton} onClick={handleClose}>
          ✕
        </button>
      </div>
    </div>
  );
};
