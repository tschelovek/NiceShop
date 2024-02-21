<template>
  <li v-bind="$attrs" v-for="product in products" :key="product.id">
    <!-- <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    > -->
    <img :src="product.image" :alt="product.title" />
    <!-- </router-link> -->

    <h3 class="catalog__title">
      <a href="#">
        <!-- <a href="#" @click.prevent="openQuickView(product.id)"> -->
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>
    <ColorOptions class="colors colors--black" :colors="product.colors" />
  </li>
  <!-- <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentProductId" />
  </BaseModal> -->
</template>

<script lang="ts">
import ColorOptions from "@/components/ColorOptions.vue";
// import formatNumber from "@/helpers/formatNumber";
import BaseModal from "@/components/BaseElements/BaseModal.vue";
// import { defineAsyncComponent, h } from "vue";

export default {
  inheritAttrs: false,
  components: {
    // ProductQuickView: defineAsyncComponent({
    //   loader: () => import("@/components/ProductQuickView.vue"),
    //   delay: 0,
    //   loadingComponent: () => h("div", "Загрузка"),
    // }),
    BaseModal,
    ColorOptions,
  },
  data() {
    return {
      currentProductId: null,
    };
  },
  props: ["products"],
  computed: {
    isQuickViewOpen: {
      get() {
        return this.currentProductId;
      },
      set(isOpen: boolean) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
    // productsNormalized() {
    //   return this.products.map((product) => {
    //     return {
    //       ...product,
    //       pricePretty: formatNumber(product.price),
    //     };
    //   });
    // },
  },
  methods: {
    // openQuickView(productId) {
    //   this.currentProductId = productId;
    // },
  },
};
</script>

<style>
.colors__value {
  border: 1px solid #999999;
}
</style>
