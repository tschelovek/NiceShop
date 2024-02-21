<template>
  <div class="product__counter form__counter">
    <button
      type="button"
      @click.prevent="decrement"
      aria-label="Убрать один товар"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" name="count" v-model="counter" />

    <button
      type="button"
      @click.prevent="increment"
      aria-label="Добавить один товар"
    >
      <svg width="10" height="10" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const counter = defineModel<number>({ default: 1 });

function decrement(): void {
  counter.value > 0 ? counter.value-- : null;
}
function increment(): void {
  counter.value++;
}
</script>
