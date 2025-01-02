<script setup lang="ts">
import { ref } from 'vue';
import { AnalysisWorkerWrapper, createWorker, Paper } from "yoastseo";

// `url` needs to be the full URL to the script for the browser to know where to load the worker script from.
// This should be the script created by the previous code-snippet.
const url = "${window.location.origin}/yoastseo-worker.js"

const worker = new AnalysisWorkerWrapper( createWorker( url ) );

worker.initialize( {
    locale: "en_US",
    contentAnalysisActive: true,
    keywordAnalysisActive: true,
    logLevel: "ERROR",
} ).then( () => {
    // The worker has been configured, we can now analyze a Paper.
    const paper = new Paper( "Text to analyze", {
        keyword: "analyze",
    } );

    return worker.analyze( paper );
} ).then( ( results ) => {
    console.log( 'Analysis results:' );
    console.log( results );
} ).catch( ( error ) => {
    console.error( 'An error occured while analyzing the text:' );
    console.error( error );
} );

worker.register();

const meta = ref({
  title: '',
  description: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  twitterCard: 'summary_large_image',
});

const emit = defineEmits();

const submitForm = () => {
  // Gửi dữ liệu lên component cha để chấm điểm
  emit('submit', meta.value);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Title:</label>
      <input v-model="meta.title" type="text" placeholder="Nhập tiêu đề..." />
    </div>
    <div>
      <label>Description:</label>
      <textarea v-model="meta.description" placeholder="Nhập description..."></textarea>
    </div>
    <div>
      <label>OG Title:</label>
      <input v-model="meta.ogTitle" type="text" placeholder="Nhập og:title..." />
    </div>
    <div>
      <label>OG Description:</label>
      <textarea v-model="meta.ogDescription" placeholder="Nhập og:description..."></textarea>
    </div>
    <div>
      <label>OG Image:</label>
      <input v-model="meta.ogImage" type="url" placeholder="Nhập URL og:image..." />
    </div>
    <div>
      <label>Twitter Card:</label>
      <select v-model="meta.twitterCard">
        <option value="summary">summary</option>
        <option value="summary_large_image">summary_large_image</option>
      </select>
    </div>
    <button type="submit">Chấm Điểm</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
