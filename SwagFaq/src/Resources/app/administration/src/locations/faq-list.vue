<script lang="ts" setup>
import { ref } from 'vue';
import type { Ref } from 'vue';
import { MtTextField, MtButton } from '@shopware-ag/meteor-component-library';
import faqItem from '../components/faq-item.vue';

interface FaqEntry {
    question: string;
    answer: string;
}

const faqList: Ref<FaqEntry[]> = ref([
    {
        question: 'Does this do X?',
        answer: 'Yes it does!',
    },
]);
const newQuestion = ref('');
const newAnswer = ref('');

function onAddButtonClicked() {
    faqList.value.push({
        question: newQuestion.value,
        answer: newAnswer.value,
    });
    newQuestion.value = '';
    newAnswer.value = '';
}
</script>

<template>
    <div class="faq-list__form">
        <!-- Todo: Use snippets -->
        <MtTextField
            v-model="newQuestion"
            label="Question"
            placeholder="Enter a new question"
        />
        <MtTextField
            v-model="newAnswer"
            label="Answer"
            placeholder="Enter corresponding answer"
        />
        <MtButton variant="primary" @click="onAddButtonClicked"> Add </MtButton>
    </div>

    <faq-item
        v-for="entry in faqList"
        :key="entry.question"
        :question="entry.question"
        :answer="entry.answer"
    />
</template>

<style scoped>
.faq-list__form {
    margin-bottom: 16px;
}
</style>
