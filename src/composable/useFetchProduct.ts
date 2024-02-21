import { Ref, computed, reactive, ref } from "vue";
import formatNumber from "@/helpers/formatNumber";
import axios from "axios";
import { API_BASE_URL } from "@/config";

type SuccessResponse = {
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
  colors: [
    {
      id: number;
      title: string;
      code: string;
    }
  ];
  category: {
    id: number;
    title: string;
    slug: string;
  };
  content: string;
};

type ErrorResponse = {
  error: {
    message: string;
    code: number;
  };
};

export type ResponseFetchProduct = SuccessResponse | ErrorResponse;

export default function () {
  const productData: Ref<ResponseFetchProduct | null> = ref(null);
  /*   const category = computed(() => {
    if (productData.value) {
      return productData.value.category.title || "";
    }
  }); */

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false,
  });

  const fetchProduct = (productId: number) => {
    fetchStatus.isLoading = true;
    fetchStatus.isFailed = false;
    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response): ResponseFetchProduct => {
        const product = response.data;

        return (productData.value = Object.assign(response.data, {
          pricePretty: formatNumber(product.price),
        }));
      })
      .catch(() => (fetchStatus.isFailed = true))
      .then(() => (fetchStatus.isLoading = false));
  };

  return {
    product: productData,
    status: fetchStatus,

    fetchProduct,
  };
}
