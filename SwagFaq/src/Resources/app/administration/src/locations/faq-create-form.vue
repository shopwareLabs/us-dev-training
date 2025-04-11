<script lang="ts" setup>
import { ref } from 'vue';
import { MtTextField, MtButton } from '@shopware-ag/meteor-component-library';
import { composables } from '@shopware-ag/meteor-admin-sdk';
interface FaqEntry {
    id: string;
    question: string;
    answer: string;
}

// temporary solution until backend is implemented
// uses shared state between iframes,
// see https://developer.shopware.com/resources/admin-extension-sdk/api-reference/composables/useSharedState.html
const faqList = composables.useSharedState<FaqEntry[]>('faqList', [
    {
        id: '1',
        question: 'Does this do X?',
        answer: 'Yes it does!',
    },
]);
const newQuestion = ref('');
const newAnswer = ref('');
let currentId = 2; // todo: should be uuid from server
function onAddButtonClicked() {
    faqList.value.push({
        id: `${currentId}`,
        question: newQuestion.value,
        answer: newAnswer.value,
    });
    currentId++;
    newQuestion.value = '';
    newAnswer.value = '';
}
</script>

<template>
    <div class="faq-list__form">
        <MtTextField
            v-model="newQuestion"
            :label="$t('swagFaq.form.questionLabel')"
            :placeholder="$t('swagFaq.form.questionPlaceholder')"
        />
        <MtTextField
            v-model="newAnswer"
            :label="$t('swagFaq.form.answerLabel')"
            :placeholder="$t('swagFaq.form.answerPlaceholder')"
        />
        <MtButton variant="primary" @click="onAddButtonClicked">
            {{ $t('swagFaq.form.add') }}
        </MtButton>
    </div>
</template>

<style scoped></style>
