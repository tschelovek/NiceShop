import { ref, watchEffect, toValue, Ref, toRef } from "vue";
import axios from "axios";
import { ReactiveVariable } from "vue/macros";
import { ProductsData } from "@/composable/useFetchProducts";

interface IUseFetch {
  url: string | Ref<string>;
  params?: {} | ReactiveVariable<object>;
}

type TData = Ref<null | ProductsData>;

export function useFetch({ url, params }: IUseFetch) {
  const data: TData = ref(null);
  const isLoading = ref(false);
  const isFailed = ref(false);
  toRef(params);

  const fetchData = () => {
    data.value = null;
    isLoading.value = false;
    isFailed.value = false;

    axios
      .get(toValue(url), {
        params: { ...toValue(params) },
      })
      .then((response) => {
        data.value = response.data;
      })
      .catch(() => (isFailed.value = true))
      .finally(() => (isLoading.value = false));
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, isLoading, isFailed };
}
