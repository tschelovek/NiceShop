<template>
  <ul class="catalog__list">
    <ProductItems v-bind="$attrs" class="catalog__item" />
    <!-- <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.id"
    /> -->
  </ul>
</template>

<script setup lang="ts">
import ProductItems from "@/components/ProductItems.vue";
</script>
