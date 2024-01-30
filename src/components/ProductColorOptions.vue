<template>
  <label class="colors__label">
    <input
      class="colors__radio sr-only"
      type="radio"
      :value="itemColor.codeHEX"
    />
    <span
      class="colors__value"
      :style="setColorValue(itemColor.codeHEX)"
    ></span>
  </label>
</template>

<script>
import colors from "../data/colors";

export default {
  props: ["itemColor"],
  computed: {
    colors() {
      return colors;
    },
  },
  methods: {
    setColorValue(color) {
      return `background-color: ${color};`;
    },
  },
};
</script>
