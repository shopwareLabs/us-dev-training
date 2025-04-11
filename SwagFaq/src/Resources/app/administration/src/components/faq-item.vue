<script lang="ts" setup>
import { MtButton } from '@shopware-ag/meteor-component-library';

interface Props {
    id: string;
    question: string;
    answer: string;
}
const { question, answer } = defineProps<Props>();
const emit = defineEmits<{
    onDelete: [id: string];
}>();
</script>

<template>
    <div class="faq-item">
        <h2 class="question">
            {{ question }}
            <mt-button
                class="delete-button"
                variant="critical"
                @click="emit('onDelete', id)"
            >
                Delete
            </mt-button>
        </h2>
        <p class="answer">
            <strong>{{ $t('swagFaq.list.answerPrefix') }}</strong>
            {{ answer }}
        </p>
    </div>
</template>

<style scoped>
.question {
    display: flex;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid black;
    margin: 0;
    background-color: rgb(204, 217, 236);
    color: black;
}

.answer {
    padding: 16px;
    border-bottom: 1px solid black;
}

.faq-item:last-of-type .answer {
    border-bottom: none;
}
</style>
