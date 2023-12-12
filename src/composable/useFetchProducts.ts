import {API_BASE_URL} from "@/config";
import {reactive} from "vue";
import {useFetch} from "@/composable/useFetch";

interface IFetchProductsParams {
    page?: number;
    limit?: number;
    colorId: number;
    categoryId: number;
    minPrice: number;
    maxPrice: number;
}

interface IProductsData {
    items: [
        {
            id: number,
            title: string,
            slug: string,
            image: {
                file: {
                    url: string,
                    name: string,
                    originalName: string,
                    extension: string,
                    size: string,
                }
            },
            price: number,
            colors:
                {
                    id: number,
                    title: string,
                    code: string,
                }[]
        }
    ],
    pagination?: {
        page: number,
        pages: number,
        total: number
    }
}


export default function (filterParams: IFetchProductsParams) {
    // const productsData = ref(null);
    //
    // const fetchStatus = reactive({
    //     isLoading: false,
    //     isFailed: false,
    // });
    //
    // const fetchProducts = (params: IFetchProductsParams) => {
    //     fetchStatus.isLoading = true;
    //     fetchStatus.isFailed = false;
    //     axios
    //         .get(`${API_BASE_URL}/api/products`, {
    //             params: {...params}
    //         })
    //         .then((response) => {
    //             productsData.value = response.data
    //         })
    //         .catch(() => (fetchStatus.isFailed = true))
    //         .then(() => (fetchStatus.isLoading = false));
    // };
    //
    // return {
    //     products: productsData,
    //     status: fetchStatus,
    //
    //     fetchProducts,
    // }
    // const productsData = ref(null)
    // const url = ref(`${API_BASE_URL}/api/products`)
    const params = reactive(filterParams)

    const { data, isLoading, isFailed } = useFetch({
        url: `${API_BASE_URL}/api/products`,
        params
    })

    return {productsData: data, isLoading, isFailed}
}