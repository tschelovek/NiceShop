<template>
  <header class="header">
    <div class="header__wrapper container">
      <!-- <span class="header__info">Каталог</span> -->
      <router-link :to="{ name: 'main' }" class="header__logo">
        <img src="/src/assets/vue.svg" alt="FineShop" width="190" height="33" />
        <use xlink:href="#logo"></use>
      </router-link>

      <a class="header__tel" href="tel:+79046409444">8 904 640 9444</a>

      <!-- <CardIndicator /> -->
      <!-- <ColorThemeSwitcher /> -->
    </div>
  </header>
</template>

<script setup lang="ts">
// import CardIndicator from "@/components/Cart/CartIndicator.vue";
// import ColorThemeSwitcher from "../ColorThemeSwitcher/ColorThemeSwitcher.vue";

// export default {
//   components: { CardIndicator },
// };
</script>
