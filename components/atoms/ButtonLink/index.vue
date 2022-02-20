<script setup lang="ts">
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
})

const emit = defineEmits<{
  (e: 'click', value: MouseEvent): void
}>()
</script>

<template>
  <component
    :is="to ? 'nuxt-link' : href ? 'a' : 'button'"
    v-bind="$attrs"
    :to="to"
    :href="href"
    :class="['button', { 'button--loading': loading }]"
    @click="(e) => emit('click', e)"
  >
    <div class="button__content">
      <span v-if="$slots.left" class="button__content--left">
        <span v-if="!$slots.right && loading" class="button__spinner" />
        <slot v-else name="left" />
      </span>

      <span class="button__content--center">
        <slot />
      </span>

      <span v-if="$slots.right || (!$slots.left && loading)" class="button__content--right">
        <span v-if="loading" class="button__spinner" />
        <slot v-else name="right" />
      </span>
    </div>
  </component>
</template>

<style lang="scss">
.button {
  @apply appearance-none relative flex items-center justify-center align-middle rounded-full;
  @apply cursor-pointer no-underline select-none;
  @apply py-3 px-8 m-0;
  @apply font-bold text-center leading-none;
  @apply text-white bg-pink-400;

  font-family: inherit;
  transform: perspective(1px) translateZ(0);
  transition: all 0.3s ease-out;

  &__content {
    @apply mr-0 ml-0;

    color: inherit;
    transition: margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &__content,
  &__content--center,
  &__content--left,
  &__content--right {
    @apply flex items-center justify-center;
  }

  &__content--left,
  &__content--right {
    @apply text-sm font-normal;
  }

  &__content--left {
    @apply mr-2;
  }

  &__content--right {
    @apply ml-2;
  }

  &__spinner {
    @apply hidden w-5 h-5 bg-transparent border-solid border-2 border-r-0 rounded-full text-center normal-case sm:text-sm not-italic font-normal border-white;

    color: inherit;
    transition: all 0.3s ease-in-out;
  }

  &:hover,
  &:active,
  &:focus {
    @apply outline-none;
    transform: scale(0.9);
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }

    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  &--loading {
    .button__spinner {
      @apply inline-block;

      animation: spin 1s infinite;
    }
  }

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    /* transform: translateY(-3px); */
  }

  &:active:not(:disabled) {
    transform: translateY(3px);
  }

  &:disabled {
    @apply cursor-not-allowed opacity-70;
  }
}
</style>
