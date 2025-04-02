<script setup>
    const props = defineProps(['question', 'answer']);
</script>

<template>
    <div class="faq-item">
        <h2>Question: {{ question }}</h2>
        <p>Answer: {{ answer }}</p>
    </div>
</template>

<style scoped>
    .faq-item h2 {
        margin: 0;
    }
    .faq-item {
        margin-bottom: 16px;
    }
</style>
