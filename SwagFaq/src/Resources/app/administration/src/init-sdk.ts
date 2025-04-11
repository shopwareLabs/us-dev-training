import { ui, cms } from '@shopware-ag/meteor-admin-sdk';
import {
    LOCATION_CARD_LIST,
    LOCATION_CMS_ELEMENT,
} from './constants';

/**
 * All extension points will be registered here
 */
(async () => {
    /**
     * Product detail tab
     */
    const TAB_PRODUCT = 'swagfaq-product-detail-tab-faq';
    await ui.tabs('sw-product-detail').addTabItem({
        label: 'swagFaq.productTab',
        componentSectionId: TAB_PRODUCT,
    });

    await ui.componentSection.add({
        component: 'card',
        positionId: TAB_PRODUCT,
        props: {
            title: 'swagFaq.list.title',
            locationId: LOCATION_CARD_LIST,
        },
    });

    /**
     * CMS extension
     */
    await cms.registerCmsElement({
        name: LOCATION_CMS_ELEMENT,
        label: 'swagFaq.cms.elementLabel',
        defaultConfig: {
            faqContent: {
                source: 'static',
                value: '',
            },
        },
    });

    await cms.registerCmsBlock({
        name: 'swag-faq-block',
        label: 'swagFaq.cms.blockLabel',
        slots: [{ element: LOCATION_CMS_ELEMENT }],
        // optional properties
        category: 'commerce',
        // previewImage: 'https://placehold.co/350x200',
        slotLayout: {
            grid: 'auto',
        },
    });
})();
