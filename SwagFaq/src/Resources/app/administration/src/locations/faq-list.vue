<script lang="ts" setup>
import faqItem from '../components/faq-item.vue';
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

function onDelete(id: string) {
    faqList.value = faqList.value.filter((entry) => entry.id !== id);
}
</script>

<template>
    <p v-if="faqList.value.length === 0">
        {{ $t('swagFaq.list.emptyMessage') }}
    </p>
    <faq-item
        v-for="entry in faqList.value"
        v-else
        :id="entry.id"
        :key="entry.id"
        :question="entry.question"
        :answer="entry.answer"
        @on-delete="onDelete"
    />
</template>

<style scoped></style>
