<template>
  <ul class="catalog__pagination pagination" v-if="pages > 1">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === 1 }"
        href="#"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(currentPage - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === currentPage }"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': currentPage === pages }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginate(currentPage + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ComputedRef, computed, toValue } from "vue";

const props = defineProps(["count", "perPage"]);
const modelPage = defineModel<number>("page");

const currentPage: ComputedRef<number> = computed((): number => {
  return modelPage.value || 0;
});
const pages = computed(() => {
  return Math.ceil(props.count / props.perPage);
});

function paginate(page: number): void {
  if (page >= 1 && page <= toValue(pages)) {
    modelPage.value = page;
  }
  console.log("paginate", page);
}
// export default {
// props: ["modelValue", "count", "perPage"],
// computed: {
//   page() {
//     return this.modelValue;
//   },
//   pages() {
//     return Math.ceil(this.count / this.perPage);
//   },
// },
// methods: {
//   paginate(page) {
//     if (page >= 1 && page <= this.pages) {
//       this.$emit("update:modelValue", page);
//     }
//   },
// },
// }
</script>
