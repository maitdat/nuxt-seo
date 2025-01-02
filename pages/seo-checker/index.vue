<script setup lang="ts">


import { useSeoScore } from '@/composables/useSeoScore';

const score = ref(0);
const suggestions = ref<string[]>([]);

const handleFormSubmit = (meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
}) => {
    const result = useSeoScore(meta);
    score.value = result.score;
    suggestions.value = result.suggestions;
};
</script>

<template>
    <div>
        <h1>SEO Checker</h1>
        <SeoCheckerSeoForm @submit="handleFormSubmit" />
        <SeoCheckerSeoResult :score="score" :suggestions="suggestions" v-if="score > 0" />
    </div>
</template>

<style scoped>
h1 {
    text-align: center;
    color: #333;
}
</style>
