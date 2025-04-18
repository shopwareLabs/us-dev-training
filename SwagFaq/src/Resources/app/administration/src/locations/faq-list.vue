<script lang="ts" setup>
import faqItem from '../components/faq-item.vue';
import { data } from '@shopware-ag/meteor-admin-sdk';
import { computed, onMounted, ref } from 'vue';
import {
    MtButton,
    MtTextField,
    MtLoader,
} from '@shopware-ag/meteor-component-library';
import { createId } from '../utils';

const { Criteria } = data.Classes;

const isLoading = ref(true);
const product = ref<EntitySchema.Entity<'product'> | null>(null);
const faqEntryRepository = data.repository('swag_faq_entry');

const faqEntries = computed({
    get(): EntitySchema.EntityCollection<'swag_faq_entry'> | null {
        return product.value?.extensions
            ?.swagFaqEntries as EntitySchema.EntityCollection<'swag_faq_entry'> | null;
    },
    set(value: EntitySchema.EntityCollection<'swag_faq_entry'> | null): void {
        if (product.value?.extensions) {
            product.value.extensions.swagFaqEntries = value;
        }

        data.update({
            id: 'sw-product-detail__product',
            data: {
                extensions: {
                    swagFaqEntries: value,
                },
            },
        });
    },
});

onMounted(async () => {
    // on page reload when on the faq tab the data is sometimes null
    // Temporary fix:
    // Wait half second to be sure that everything is loaded
    // Better solution:
    // Subscribe and wait until data is there
    await new Promise((resolve) => setTimeout(resolve, 500));

    product.value = (await data.get({
        id: 'sw-product-detail__product',
        selectors: ['id', 'versionId', 'extensions'],
    })) as EntitySchema.Entity<'product'>;
    const criteria = new Criteria();
    criteria.addFilter(
        Criteria.multi('and', [
            Criteria.equals('productId', product.value.id),
            Criteria.equals('productVersionId', product.value.versionId),
        ])
    );

    faqEntries.value = await faqEntryRepository.search(criteria);
    isLoading.value = false;
});

async function onDelete(id: string) {
    if (!faqEntries.value) return;
    isLoading.value = true;

    // Note: best practice would be to show a confirmation modal first
    // To keep it simple we skip that here
    const toDelete = faqEntries.value.find((entry) => entry.id === id);
    if (!toDelete) {
        return;
    }

    if (!toDelete._isNew) {
        await faqEntryRepository.delete(toDelete.id);
    }

    faqEntries.value = faqEntries.value.filter(
        (entry) => entry.id !== id
    ) as EntitySchema.EntityCollection<'swag_faq_entry'>;

    isLoading.value = false;
}

const newQuestion = ref('');
const newAnswer = ref('');
async function onAddButtonClicked() {
    const newEntry = await faqEntryRepository.create();
    if (newEntry) {
        newEntry.question = newQuestion.value;
        newEntry.answer = newAnswer.value;
        newEntry.id = createId();

        // Todo this is ugly, is there another way to trigger the setter?
        faqEntries.value = [
            ...(faqEntries.value ?? []),
            newEntry,
        ] as EntitySchema.EntityCollection<'swag_faq_entry'>;
        newQuestion.value = '';
        newAnswer.value = '';
    }
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
    <mt-loader v-if="isLoading" />
    <p v-else-if="faqEntries?.length === 0">
        {{ $t('swagFaq.list.emptyMessage') }}
    </p>
    <faq-item
        v-for="entry in faqEntries"
        v-else
        :id="entry.id"
        :key="entry.id"
        :question="entry.question"
        :answer="entry.answer"
        :is-new="entry._isNew ?? false"
        @on-delete="onDelete"
    />
</template>

<style scoped>
.faq-list__form {
    margin-bottom: 16px;
}
</style>
