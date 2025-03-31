<script setup lang="ts">

    import {ref} from "vue";
    import FaqItem from "./faq-item.vue";
    import {MtTextField, MtButton} from "@shopware-ag/meteor-component-library";

    interface FaqEntry {
        question: string,
        answer: string,
    }

    // Todo: no type checking is happening here?
    // we might need a proper ESLint + TSC setup
    const faqList: Ref<List<FaqEntry>> = ref([
        {
            question: 'Does this do X?',
            answer: 'Yes it does!'
        }
    ]);
    const newQuestion = ref('');
    const newAnswer = ref('');

    function onAddButtonClicked(e) {
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
        <MtTextField v-model="newQuestion" label="Question" placeholder="Enter a new question"/>
        <MtTextField v-model="newAnswer" label="Answer" placeholder="Enter corresponding answer"/>
        <MtButton @click="onAddButtonClicked" variant="primary">Add</MtButton>
    </div>

    <faq-item v-for="entry in faqList" :key="entry.question" :question="entry.question" :answer="entry.answer"/>
</template>

<style scoped>
    .faq-list__form {
        margin-bottom: 16px;
    }
</style>
