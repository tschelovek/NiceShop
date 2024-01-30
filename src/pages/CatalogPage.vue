<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товара(-ов) </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="priceFrom"
        v-model:price-to="priceTo"
        v-model:category-id="categoryId"
        v-model:color-id="colorId"
      />
      <!-- <ProductFilter v-model:filter="filter" /> -->

      <section class="catalog">
        <div v-if="isLoading"><PreloaderDotsWave /></div>
        <div v-else-if="isFailed">
          Произошла ошибка при загрузке
          <!-- <button @click.prevent="fetchProducts">Попробовать ещё раз</button> -->
        </div>
        <ProductList v-else :products="productsOnPage" />
        <BasePagination
          v-model:page="page"
          :count="countProducts"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import BasePagination from "@/components/BaseElements/BasePagination.vue";
import ProductList from "@/components/Product/ProductList.vue";
import PreloaderDotsWave from "@/components/PreloaderDotsWave.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import { Ref, computed, reactive, ref, toValue } from "vue";
import { ProductsData, useFetchProducts } from "@/composable/useFetchProducts";
import formatNumber from "@/helpers/formatNumber";

export interface ProductsOnPage extends ProductsData {
  image: string;
}
export interface FilterParams {
  priceFrom: number;
  priceTo: number;
  categoryId: number;
  colorId: number;
}

const filter: FilterParams = reactive({
  priceFrom: 0,
  priceTo: 0,
  categoryId: 0,
  colorId: 0,
});

const priceFrom: Ref<number> = ref(0);
const priceTo: Ref<number> = ref(0);
const categoryId: Ref<number> = ref(0);
const colorId: Ref<number> = ref(0);

const page: Ref<number> = ref(1);
const productsPerPage: Ref<number> = ref(6);

const {
  data: productsData,
  isLoading,
  isFailed,
} = useFetchProducts({
  page: page,
  limit: productsPerPage,
  colorId: colorId,
  categoryId: categoryId,
  minPrice: priceFrom,
  maxPrice: priceTo,
});

const productsOnPage = computed(() => {
  return productsData.value
    ? toValue(productsData)!["items"].map((product) => ({
        ...product,
        image: product.image.file.url,
        pricePretty: formatNumber(product.price),
      }))
    : [];
});
const countProducts = computed<number>(() => {
  return productsData.value ? productsData.value["pagination"]["total"] : 0;
});
</script>
