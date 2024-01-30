<template>
  <ul class="catalog__list">
    <ProductItems v-bind="$attrs" class="catalog__item" />
  </ul>
</template>

<script setup lang="ts">
import ProductItems from "@/components/ProductItems.vue";
</script>
