import axios from "axios";
import {API_BASE_URL} from "@/config";
import {reactive, ref} from "vue";

interface IFetchProductsParams {
    page?: number;
    limit?: number;
    colorId: number;
    categoryId: number;
    minPrice: number;
    maxPrice: number;
}

export default function () {
    const productsData = ref(null);

    const fetchStatus = reactive({
        isLoading: false,
        isFailed: false,
    });

    const fetchProducts = (params: IFetchProductsParams) => {
        fetchStatus.isLoading = true;
        fetchStatus.isFailed = false;
        axios
            .get(`${API_BASE_URL}/api/products`, {
                params: {...params}
            })
            .then((response) => {
                productsData.value = response.data
            })
            .catch(() => (fetchStatus.isFailed = true))
            .then(() => (fetchStatus.isLoading = false));
    };

    return {
        products: productsData,
        status: fetchStatus,

        fetchProducts,
    }
}