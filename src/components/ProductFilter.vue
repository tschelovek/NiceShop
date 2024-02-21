<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      v-bind="$attrs"
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.number="priceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.number="priceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model.number="categoryId"
          >
            <option value="0">Все категории</option>
            <!-- <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.title }}
            </option> -->
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ColorOptions
          class="colors"
          :colors="colors"
          v-model:currentColorId="colorId"
        />
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script setup lang="ts">
import { useFetchColors } from "@/composable/useFetchColors";
import { ref } from "vue";
// import { FilterParams } from "@/pages/CatalogPage.vue";

// const filter = defineModel<FilterParams>("filter");
const priceFrom = defineModel<number>("priceFrom");
const priceTo = defineModel<number>("priceTo");
const categoryId = defineModel<number>("categoryId");
const colorId = defineModel<number>("colorId");

const colors = ref([]);
// colors.value = await useFetchColors();
// console.log(colors);
// console.log(colors.value);

function reset() {
  priceFrom.value = 0;
  priceTo.value = 0;
  categoryId.value = 0;
  colorId.value = 0;
}
function submit() {}
</script>

<!-- <script>
import ColorOptions from "@/components/ColorOptions.vue";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import {mapActions} from "vuex";
import function from '../composable/useFetchProduct';
import { useFetchColors } from '../composable/useFetchColors';

export default {
  components: { ColorOptions },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColorId: 0,

      categoriesData: null,
      colorsData: null,
    };
  },
  props: ["priceFrom", "priceTo", "categoryId", "colorId"],
  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : [];
    },
    colors() {
      return this.colorsData ? this.colorsData.items : [];
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    colorId(value) {
      this.currentColorId = value;
    },
  },
  methods: {
    ...mapActions(['loadCategories']),
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom);
      this.$emit("update:priceTo", this.currentPriceTo);
      this.$emit("update:categoryId", this.currentCategoryId);
      this.$emit("update:colorId", this.currentColorId);
    },
    reset() {
      this.$emit("update:priceFrom", 0);
      this.$emit("update:priceTo", 0);
      this.$emit("update:categoryId", 0);
      this.$emit("update:colorId", 0);
    },
    // loadCategories() {
    //   axios
    //     .get(`${API_BASE_URL}/api/productCategories`)
    //     // eslint-disable-next-line no-return-assign
    //     .then((response) => (this.categoriesData = response.data));
    // },
    loadColors() {
      axios
        .get(`${API_BASE_URL}/api/colors`)
        // eslint-disable-next-line no-return-assign
        .then((response) => (this.colorsData = response.data));
    },
  },
  created() {
    this.loadCategories();
    this.loadColors();
  },
};
</> -->
