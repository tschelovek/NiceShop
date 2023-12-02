import {computed, reactive, ref} from "vue";
import formatNumber from "@/helpers/formatNumber";
import axios from "axios";
import {API_BASE_URL} from "@/config";

export default function () {
    const productData = ref(null);
    const category = computed(() => {
        return productData.value.category.title | 1;
    });

    const fetchStatus = reactive({
        isLoading: false,
        isFailed: false,
    })

    const fetchProduct = (productId) => {
        fetchStatus.isLoading = true;
        fetchStatus.isFailed = false;
        axios
            .get(`${API_BASE_URL}/api/products/${productId}`)
            .then((response) => {
                const product = response.data

                productData.value = Object.assign(response.data, {
                    pricePretty: formatNumber(product.price)
                })
            })
            .catch(() => (fetchStatus.isFailed = true))
            .then(() => (fetchStatus.isLoading = false));
    };

    return {
        product: productData,
        category,
        status: fetchStatus,

        fetchProduct,
    }
}