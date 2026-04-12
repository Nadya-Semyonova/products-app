import axios from "axios";
import { API_BASE_URL, DEFAULT_PAGE_SIZE } from "../utils/constants";
import type { Product } from "../store/types";

interface JikanResponse {
  data: Product[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

export const fetchTopAnime = async (page: number = 1) => {
  const response = await axios.get<JikanResponse>(`${API_BASE_URL}/top/anime`, {
    params: {
      page,
      limit: DEFAULT_PAGE_SIZE,
    },
  });
  return response.data;
};

export const fetchAnimeById = async (id: number) => {
  const response = await axios.get<{ data: Product }>(
    `${API_BASE_URL}/anime/${id}/full`,
  );
  return response.data.data;
};
