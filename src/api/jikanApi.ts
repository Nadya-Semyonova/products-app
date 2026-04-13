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

export const fetchTopAnime = async (
  page: number = 1,
  startDate?: string | null,
  endDate?: string | null,
) => {
  const params: Record<string, number | string> = {
    page,
    limit: DEFAULT_PAGE_SIZE,
    order_by: "popularity",
    sort: "asc",
  };

  // Добавляем фильтр по году если он есть

  if (startDate) {
    params.start_date = startDate;
  }
  if (endDate) {
    params.end_date = endDate;
  }

  const response = await axios.get<JikanResponse>(`${API_BASE_URL}/anime`, {
    params,
  });
  return response.data;
};

export const fetchAnimeById = async (id: number) => {
  const response = await axios.get<{ data: Product }>(
    `${API_BASE_URL}/anime/${id}/full`,
  );
  return response.data.data;
};
