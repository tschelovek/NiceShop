import { ref, watchEffect, toValue, Ref, toRef } from "vue";
import axios, { AxiosResponse } from "axios";
import { ReactiveVariable } from "vue/macros";

interface UseFetchParams {
  url: string | Ref<string>;
  params?: {} | ReactiveVariable<object>;
}

export type useFetch<T> = {
  data: Ref<T | null>;
  isLoading: Ref<boolean>;
  isFailed: Ref<boolean>;
};

// type Data = Ref<null | ProductsData>;

export function useFetch<T>({ url, params }: UseFetchParams): useFetch<T> {
  const data: Ref<T | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const isFailed: Ref<boolean> = ref(false);
  toRef(params);

  const fetchData = () => {
    data.value = null;
    isLoading.value = false;
    isFailed.value = false;

    axios
      .get(toValue(url), {
        params: { ...toValue(params) },
      })
      .then((response: AxiosResponse<T>) => {
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
