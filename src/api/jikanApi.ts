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

interface FetchParams {
  page: number;
  limit: number;
  order_by: string;
  sort: string;
  start_date?: string;
  end_date?: string;
}

export const fetchTopAnime = async (
  page: number = 1,
  startDate?: string | null,
  endDate?: string | null,
) => {
  const params: FetchParams = {
    page,
    limit: DEFAULT_PAGE_SIZE,
    order_by: "popularity",
    sort: "asc",
  };

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
