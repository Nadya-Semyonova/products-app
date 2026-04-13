import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { CreateProductPage } from "./pages/CreateProductPage/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage/EditProductPage";

function App() {
  return (
    <BrowserRouter basename="/anime-products-app">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
