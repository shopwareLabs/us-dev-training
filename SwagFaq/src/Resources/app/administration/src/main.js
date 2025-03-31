import * as sw from '@shopware-ag/meteor-admin-sdk';
import { createApp } from "vue";
import FaqDetailPage from "./faq/faq-detail-page.vue";

// apply meteor general styling
// Todo: is this correct? Documentation didn't work:
// https://shopware.design/get-started/#developers
import '../node_modules/@shopware-ag/meteor-component-library/dist/index.css';

const TAB_LOCATION ='swagfaq-product-detail-tab-faq';
const CARD_LOCATION = 'swagfaq-product-detail-tab-faq-card';

(async () => {

    // Add the ui extensions when your extension is loaded in the hidden iFrame
    if (sw.location.is(sw.location.MAIN_HIDDEN)) {
        await sw.ui.tabs('sw-product-detail').addTabItem({
            label: 'FAQ', // Todo: snippet
            componentSectionId: TAB_LOCATION
        });

        await sw.ui.componentSection.add({
            component: 'card',
            positionId: TAB_LOCATION,
            props: {
                // Todo: snippets
                title: 'Hello from plugin',
                subtitle: 'I am before the properties card',
                locationId: CARD_LOCATION,
            }
        });
    }

    // Render the custom UI when the iFrame location matches your defined location
    if (sw.location.is(CARD_LOCATION)) {
        createApp(FaqDetailPage).mount('#app');
    }

})();

