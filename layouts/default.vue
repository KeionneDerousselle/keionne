<script setup lang="ts">
import Footer from '@/components/molecules/Footer/index.vue'
</script>

<template>
  <div class="k-app">
    <main class="k-main bg-white-f-9">
      <div class="k-container">
        <slot />
      </div>
    </main>
    <Footer class="k-footer" />
  </div>
</template>

<style lang="scss">
.k-app {
  @apply flex flex-col min-h-screen w-full relative;
}

.k-main {
  @apply w-full;
  flex: 1 0 auto;
  // padding-top: 9.7rem;
}

.k-footer {
  @apply flex-shrink-0;
}
</style>
