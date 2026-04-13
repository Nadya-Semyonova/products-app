import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  ProductsState,
  Product,
  UserCreatedProduct,
  YearRange,
} from "./types";

const initialState: ProductsState = {
  items: [],
  userProducts: [],
  likedFilter: false,
  searchQuery: "",
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  ratingFilter: null,
  yearFilter: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRatingFilter: (state, action: PayloadAction<number | null>) => {
      state.ratingFilter = action.payload;
      state.currentPage = 1;
    },
    setYearFilter: (
      state,
      action: PayloadAction<number | null | YearRange>,
    ) => {
      state.yearFilter = action.payload;
      state.currentPage = 1;
    },
    clearAllFilters: (state) => {
      state.likedFilter = false;
      state.searchQuery = "";
      state.yearFilter = null;
      state.currentPage = 1;
    },
    toggleLike: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;

      const apiProduct = state.items.find((p) => p.mal_id === id);
      if (apiProduct) {
        apiProduct.liked = !apiProduct.liked;
        return;
      }

      const userProduct = state.userProducts.find((p) => p.id === id);
      if (userProduct) {
        userProduct.liked = !userProduct.liked;
      }
    },
    deleteProduct: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      state.items = state.items.filter((p) => p.mal_id !== id);
      state.userProducts = state.userProducts.filter((p) => p.id !== id);
    },
    setLikedFilter: (state, action: PayloadAction<boolean>) => {
      state.likedFilter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addUserProduct: (state, action: PayloadAction<UserCreatedProduct>) => {
      state.userProducts.unshift(action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setRatingFilter,
  setYearFilter,
  clearAllFilters,
  toggleLike,
  deleteProduct,
  setLikedFilter,
  setSearchQuery,
  addUserProduct,
  setCurrentPage,
  setTotalPages,
} = productsSlice.actions;

export default productsSlice.reducer;
