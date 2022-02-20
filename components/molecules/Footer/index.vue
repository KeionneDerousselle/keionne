<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer bg-purple-700 py-10">
    <div class="k-container flex justify-center items-center">
      <span class="text-purple-300 text-sm">&copy; {{ currentYear }} Keionne Derousselle</span>
    </div>
  </footer>
</template>
