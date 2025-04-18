<script lang="ts" setup>
import { MtButton } from '@shopware-ag/meteor-component-library';

interface Props {
    id: string;
    question: string;
    answer: string;
    isNew?: boolean;
}
const { id, question, answer, isNew = false } = defineProps<Props>();
const emit = defineEmits<{
    onDelete: [id: string];
}>();
</script>

<template>
    <div class="faq-item">
        <div class="question">
            <h2>
                {{ question }}
            </h2>
            <div class="actions">
                <span v-if="isNew">
                    {{ $t('swagFaq.item.unsaved') }}
                </span>
                <mt-button
                    class="delete-button"
                    variant="critical"
                    @click="emit('onDelete', id)"
                >
                    {{ $t('swagFaq.item.delete') }}
                </mt-button>
            </div>
        </div>
        <p class="answer">
            <strong>{{ $t('swagFaq.item.answerPrefix') }}</strong>
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

    h2 {
        margin: 0;
    }
}

.actions {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.answer {
    padding: 16px;
    border-bottom: 1px solid black;
}

.faq-item:last-of-type .answer {
    border-bottom: none;
}
</style>
