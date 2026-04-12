export interface Product {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  synopsis: string;
  score: number;
  year: number;
  status: string;
  episodes: number;
  liked?: boolean;
  isUserCreated?: boolean;
}

export interface UserCreatedProduct {
  id: string;
  title: string;
  synopsis: string;
  image_url: string;
  score: number;
  liked?: boolean;
  isUserCreated: true;
}

export interface ProductsState {
  items: Product[];
  userProducts: UserCreatedProduct[];
  likedFilter: boolean;
  searchQuery: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

export interface DisplayProduct {
  id: string | number;
  title: string;
  imageUrl: string;
  synopsis: string;
  score: number;
  status?: string;
  year?: number;
  episodes?: number;
  isUserCreated?: boolean;
}