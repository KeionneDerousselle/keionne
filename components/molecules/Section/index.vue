<script setup lang="ts">
import SectionTitle from '@/components/atoms/SectionTitle/index.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section>
    <SectionTitle :title="title" class="mb-16" />
    <slot />
  </section>
</template>
