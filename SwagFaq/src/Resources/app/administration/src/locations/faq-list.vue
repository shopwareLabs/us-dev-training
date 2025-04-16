<script lang="ts" setup>
import faqItem from '../components/faq-item.vue';
import { data } from '@shopware-ag/meteor-admin-sdk';
import { computed, onMounted, ref } from 'vue';
import { MtButton, MtTextField } from '@shopware-ag/meteor-component-library';
import EntityCollection from '@shopware-ag/meteor-admin-sdk/es/_internals/data/EntityCollection';

const { Criteria } = data.Classes;

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
    // Todo: on page reload when on the faq tab this is sometimes null
    // Todo: how can we wait for it to be there?
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
});

async function onDelete(id: string) {
    if (!faqEntries.value) return;

    // Todo: add confirm modal
    const toDelete = faqEntries.value.find((entry) => entry.id === id);
    if (!toDelete) {
        return;
    }
    await faqEntryRepository.delete(toDelete.id);
    faqEntries.value = faqEntries.value.filter(
        (entry) => entry.id !== id
    ) as EntityCollection<'swag_faq_entry'>;
}

const newQuestion = ref('');
const newAnswer = ref('');
async function onAddButtonClicked() {
    const newEntry = await faqEntryRepository.create();
    if (newEntry) {
        newEntry.question = newQuestion.value;
        newEntry.answer = newAnswer.value;

        // Todo this is ugly, is there another way to trigger the setter?
        faqEntries.value = [
            ...(faqEntries.value ?? []),
            newEntry,
        ] as EntityCollection<'swag_faq_entry'>;
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
    <hr />
    <p v-if="faqEntries?.length === 0">
        {{ $t('swagFaq.list.emptyMessage') }}
    </p>
    <faq-item
        v-for="entry in faqEntries"
        v-else
        :id="entry.id"
        :key="entry.id"
        :question="entry.question"
        :answer="entry.answer"
        @on-delete="onDelete"
    />
</template>

<style scoped></style>
