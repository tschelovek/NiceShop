<template>
  <li class="catalog__item">
    <!-- <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image" :alt="product.title" />
    </router-link> -->
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>
    <!-- <ColorOptions
      class="colors colors--black"
      :colors="colors"
      :currentColorId.sync="currentColorId"
    /> -->
    <!-- <ColorOptions class="colors colors--black" :colors="product.colors" /> -->
  </li>
</template>

<script setup lang="ts">
const product = defineProps(["product"]);
</script>
