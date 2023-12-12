<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товара(-ов) </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
          v-model:price-from="filter.filterPriceFrom"
          v-model:price-to="filter.filterPriceTo"
          v-model:category-id="filter.filterCategoryId"
          v-model:color-id="filter.filterColorId"
      />

      <section class="catalog">
        <div v-if="isLoading"><PreloaderDotsWave /></div>
        <div v-else-if="isFailed">
          Произошла ошибка при загрузке
<!--          <button @click.prevent="fetchProducts">Попробовать ещё раз</button>-->
        </div>
<!--        <ProductList v-else :products="productsOnPage" />-->

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
import ProductList from "@/components/ProductList.vue";
import PreloaderDotsWave from "@/components/PreloaderDotsWave.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import {computed, reactive, ref, toValue, unref} from "vue";
import {useStore} from "@/store/store";
import useProducts from "@/composable/useFetchProducts";

const store = useStore();

const filter = reactive({
  filterPriceFrom: 0,
  filterPriceTo: 0,
  filterCategoryId: 0,
  filterColorId: 0,
});

const page = ref(1);
const productsPerPage = ref(6);

const { productsData, isLoading, isFailed} = useProducts({
  page: toValue(page),
  colorId: filter.filterColorId,
  categoryId: filter.filterCategoryId,
  minPrice: filter.filterPriceFrom,
  maxPrice: filter.filterPriceTo
});

const productsOnPage = () => {
  return productsData
      ? productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      }))
      : [];
};
const countProducts = computed(() => {
  return productsData ? toValue(productsData)?.pagination.total : 0;
});

</script>

