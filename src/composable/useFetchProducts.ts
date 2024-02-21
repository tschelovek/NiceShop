import { API_BASE_URL } from "@/config";
import { reactive, Ref } from "vue";
import { useFetch } from "@/composable/useFetch";

type FetchProductsParams = {
  page: number | Ref<number>;
  limit: number | Ref<number>;
  colorId?: number | Ref<number>;
  categoryId?: number | Ref<number>;
  minPrice?: number | Ref<number>;
  maxPrice?: number | Ref<number>;
};

export type ProductsData = {
  items: [
    {
      id: number;
      title: string;
      slug: string;
      image: {
        file: {
          url: string;
          name: string;
          originalName: string;
          extension: string;
          size: string;
        };
      };
      price: number;
      colors: {
        id: number;
        title: string;
        code: string;
      }[];
    }
  ];
  pagination: {
    page: number;
    pages: number;
    total: number;
  };
};

export type useFetchProducts = useFetch<ProductsData>;

export function useFetchProducts(
  filterParams: FetchProductsParams
): useFetchProducts {
  const params = reactive(filterParams);

  const { data, isLoading, isFailed } = useFetch<ProductsData>({
    url: `${API_BASE_URL}/api/products`,
    params,
  });

  return { data, isLoading, isFailed };
}
