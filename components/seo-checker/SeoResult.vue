<script setup lang="ts">
defineProps({
  score: Number,
  suggestions: Array as PropType<string[]>,
});
</script>

<template>
  <div>
    <h2>Điểm SEO: {{ score }}/100</h2>
    <ul>
      <li v-for="(suggestion, index) in suggestions" :key="index">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h2 {
  color: #4caf50;
}
ul {
  margin-top: 16px;
  list-style: none;
  padding: 0;
}
li {
  color: #f44336;
}
</style>
