import { API_BASE_URL } from "@/config";
import { useFetch } from "./useFetch";

type Colors = {
  items: {
    id: number;
    title: string;
    code: string;
  }[];
};

export type useFetchColors = useFetch<Colors>;

export function useFetchColors(): useFetchColors {
  const { data, isLoading, isFailed }: useFetchColors = useFetch<Colors>({
    url: `${API_BASE_URL}/api/colors`,
  });

  return { data, isLoading, isFailed };
}
