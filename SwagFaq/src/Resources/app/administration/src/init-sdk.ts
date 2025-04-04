import { ui, cms } from '@shopware-ag/meteor-admin-sdk';

/**
 * All extension points will be registered here
 */

const TAB_LOCATION = 'swagfaq-product-detail-tab-faq';
const CARD_LOCATION = 'swagfaq-product-detail-tab-faq-card';

(async () => {
    await ui.tabs('sw-product-detail').addTabItem({
        label: 'FAQ', // Todo: snippet
        componentSectionId: TAB_LOCATION,
    });

    await ui.componentSection.add({
        component: 'card',
        positionId: TAB_LOCATION,
        props: {
            // Todo: snippets
            title: 'Hello from plugin',
            subtitle: 'I am before the properties card',
            locationId: CARD_LOCATION,
        },
    });

    await cms.registerCmsElement({
        name: 'swagfaq',
        label: 'FAQ element',
        defaultConfig: {
            faqContent: {
                source: 'static',
                value: '',
            },
        },
    });

    await cms.registerCmsBlock({
        name: 'swag-faq-block',
        label: 'FAQ',
        slots: [
            { element: 'swagfaq' },
        ],
        // optional properties
        category: 'commerce',
        // previewImage: 'https://placehold.co/350x200',
        slotLayout: {
            grid: 'auto'
        },
    });
})();
