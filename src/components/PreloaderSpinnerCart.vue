<template>
  <div class="preloader__spinner_green">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 128 128"
      xml:space="preserve"
    >
      <g>
        <path
          d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"
          fill="#9eff00"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur="600ms"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.preloader__spinner_green {
  position: absolute;
  top: -4px;
  right: 0;
}
</style>
