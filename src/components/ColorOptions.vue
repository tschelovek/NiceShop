<template>
  <ul>
    <li class="colors__item" v-for="(itemColor, key) in colors" :key="key">
      <label class="colors__label">
        <input
          class="colors__radio sr-only"
          type="radio"
          :value="itemColor.id"
          v-model="computedColorId"
        />
        <span
          class="colors__value"
          :style="setColorValue(itemColor.code)"
        ></span>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: ["colors", "currentColorId"],
  data() {
    return {
      computedColorId: this.currentColorId,
    };
  },
  methods: {
    setColorValue(color) {
      return `background-color: ${color};`;
    },
  },
  watch: {
    computedColorId(v) {
      this.$emit("update:currentColorId", v);
    },
  },
  created() {
    if (!this.computedColorId) {
      this.computedColorId = this.colors[0]?.id;
    }
  },
};
</script>

<style scoped></style>
