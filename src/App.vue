<script setup lang="ts">
import Slots from "./components/Slots.vue";
import Toaster from "./components/Toaster.vue";
</script>
<template>
  <div class="max-w-6xl mx-auto p-4 md:px-6 py-12">
    <Toaster />
    <Slots />
  </div>
</template>
