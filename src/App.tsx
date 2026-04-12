import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { CreateProductPage } from "./pages/CreateProductPage/CreateProductPage";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter basename="/anime-products-app">
      <div className={styles.app}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
