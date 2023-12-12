import {ref, watchEffect, toValue, Ref} from 'vue'
import axios from "axios";
import {ReactiveVariable} from "vue/macros";

interface IUseFetch {
    url: string | Ref<string>,
    params?: {} | ReactiveVariable<object>
}

export function useFetch( { url, params }:IUseFetch ) {
    const data = ref(null)
    const isLoading = ref(false);
    const isFailed = ref(false);

    const fetchData = () => {
        data.value = null
        isLoading.value = false
        isFailed.value = false

        axios
            .get(toValue(url), {
                params: {...params}
            })
            .then((response) => {
                data.value = response.data;
            })
            .catch(() => (isFailed.value = true))
            .finally(() => (isLoading.value = false));
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, isLoading, isFailed }
}