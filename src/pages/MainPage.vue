<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Чудо-магазин</h1>
      <!--      <span class="content__info"> {{ countProducts }} товара(-ов) </span>-->
      <p>В дальнейшем тут будет ещё что-то. А пока только этот текст.</p>
      <router-link :to="{ name: 'catalog' }"> Каталог </router-link>
    </div>

    <!--    <div class="content__catalog">-->
    <!--      <ProductFilter-->
    <!--        v-model:price-from="filterPriceFrom"-->
    <!--        v-model:price-to="filterPriceTo"-->
    <!--        v-model:category-id="filterCategoryId"-->
    <!--        v-model:color-id="filterColorId"-->
    <!--      />-->

    <!--      <section class="catalog">-->
    <!--        <div v-if="productsIsLoading"><PreloaderDotsWave /></div>-->
    <!--        <div v-else-if="productsLoadingFailed">-->
    <!--          Произошла ошибка при загрузке-->
    <!--          <button @click.prevent="loadProducts">Попробовать ещё раз</button>-->
    <!--        </div>-->
    <!--        <ProductList v-else :products="productsOnPage" />-->

    <!--        <BasePagination-->
    <!--          v-model:page="page"-->
    <!--          :count="countProducts"-->
    <!--          :per-page="productsPerPage"-->
    <!--        />-->
    <!--      </section>-->
    <!--    </div>-->
  </main>
</template>

<script>
import ProductList from "@/components/Product/ProductList.vue";
import BasePagination from "@/components/BaseElements/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import PreloaderDotsWave from "@/components/PreloaderDotsWave.vue";

export default {
  name: "MainPage",
  components: {
    PreloaderDotsWave,
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 6,

      productsData: null,

      productsIsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    productsOnPage() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
            ...product,
            image: product.image.file.url,
          }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsIsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              colorId: this.filterColorId,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => (this.productsData = response.data))
          // eslint-disable-next-line no-return-assign
          .catch(() => (this.productsLoadingFailed = true))
          // eslint-disable-next-line no-return-assign
          .then(() => (this.productsIsLoading = false));
      }, 800);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped></style>
