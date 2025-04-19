<script lang="ts" setup>
import faqItem from '../components/faq-item.vue';
import { data } from '@shopware-ag/meteor-admin-sdk';
import { ref, watch, watchEffect } from 'vue';
import {
    MtButton,
    MtTextField,
    MtLoader,
} from '@shopware-ag/meteor-component-library';
import { createId } from '../utils';

const { Criteria } = data.Classes;
const faqEntryRepository = data.repository('swag_faq_entry');

interface PartialProduct {
    id: string;
    versionId: string;
    extensions: {
        swagFaqEntries: EntitySchema.EntityCollection<'swag_faq_entry'> | null;
    };
}

const isLoading = ref(true);
const product = ref<PartialProduct | null>(null);
const faqEntries = ref<EntitySchema.EntityCollection<'swag_faq_entry'> | null>(
    null
);

/**
 * Subscribe to product detail data
 * Update reactive product ref
 */
data.subscribe(
    'sw-product-detail__product',
    async ({ data }) => {
        product.value = data as PartialProduct;
    },
    {
        selectors: ['id', 'versionId', 'extensions'],
    }
);

/**
 * Watch product ref, fetch faq entries when:
 * - initially got a product id + versionId
 * - product was saved -> extensions are emptied
 */
watch(product, async (newValue, oldValue) => {
    if (
        (!oldValue?.id && newValue?.id) ||
        (oldValue?.extensions?.swagFaqEntries?.length &&
            oldValue?.extensions?.swagFaqEntries?.length > 0 &&
            newValue?.extensions?.swagFaqEntries?.length === 0)
    ) {
        // Note: the second condition checks if the product data
        // extensions was emptied, this happens on save
        isLoading.value = true;

        const criteria = new Criteria();
        criteria.addFilter(
            Criteria.multi('and', [
                Criteria.equals('productId', newValue.id),
                Criteria.equals('productVersionId', newValue.versionId),
            ])
        );

        faqEntries.value = await faqEntryRepository.search(criteria);
        isLoading.value = false;
    }
});

/**
 * Watch faqEntries, on update
 * push data back into product detail.
 *
 * So it can be saved together with the product
 */
watchEffect(async () => {
    await data.update({
        id: 'sw-product-detail__product',
        data: {
            extensions: {
                swagFaqEntries: faqEntries.value,
            },
        },
    });
});

async function onDelete(id: string) {
    // Note: best practice would be to show a confirmation modal first
    // To keep it simple we skip that here

    if (!faqEntries.value) return;
    isLoading.value = true;

    const toDelete = faqEntries.value.find((entry) => entry.id === id);
    if (!toDelete) {
        return;
    }

    if (!toDelete._isNew) {
        // delete it from the DB
        await faqEntryRepository.delete(toDelete.id);
    }

    const toDeleteIndex = faqEntries.value.indexOf(toDelete);
    faqEntries.value.splice(toDeleteIndex, 1);

    isLoading.value = false;
}

const newQuestion = ref('');
const newAnswer = ref('');
async function onAddButtonClicked() {
    const newEntry = await faqEntryRepository.create();
    if (!newEntry || !faqEntries.value) {
        console.error('failed to create new faqEntry');
        return;
    }

    newEntry.question = newQuestion.value;
    newEntry.answer = newAnswer.value;
    newEntry.id = createId();

    faqEntries.value.push(newEntry);

    newQuestion.value = '';
    newAnswer.value = '';
}
</script>

<template>
    <form class="faq-list__form">
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
        <MtButton variant="primary" @click.prevent="onAddButtonClicked">
            {{ $t('swagFaq.form.add') }}
        </MtButton>
    </form>
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
