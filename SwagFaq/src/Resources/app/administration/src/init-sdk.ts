import { ui, cms } from '@shopware-ag/meteor-admin-sdk';
import { LOCATION_CMS_ELEMENT } from './constants';

/**
 * All extension points will be registered here
 */
(async () => {
    /**
     * CMS extension
     */
    await cms.registerCmsElement({
        name: LOCATION_CMS_ELEMENT,
        label: 'swagFaq.cms.elementLabel',
        defaultConfig: {
            exampleConfig: {
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
