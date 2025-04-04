import { ui, cms } from '@shopware-ag/meteor-admin-sdk';
import { LOCATION_CARD_CREATE, LOCATION_CMS_ELEMENT } from './constants';

/**
 * All extension points will be registered here
 */
(async () => {
    const TAB_PRODUCT = 'swagfaq-product-detail-tab-faq';
    await ui.tabs('sw-product-detail').addTabItem({
        label: 'FAQ', // Todo: snippet
        componentSectionId: TAB_PRODUCT,
    });

    await ui.componentSection.add({
        component: 'card',
        positionId: TAB_PRODUCT,
        props: {
            // Todo: snippets
            title: 'Hello from plugin',
            subtitle: 'I am before the properties card',
            locationId: LOCATION_CARD_CREATE,
        },
    });

    await cms.registerCmsElement({
        name: LOCATION_CMS_ELEMENT,
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
        slots: [{ element: LOCATION_CMS_ELEMENT }],
        // optional properties
        category: 'commerce',
        // previewImage: 'https://placehold.co/350x200',
        slotLayout: {
            grid: 'auto',
        },
    });
})();
