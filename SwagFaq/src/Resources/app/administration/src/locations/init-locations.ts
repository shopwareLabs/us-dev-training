import { createApp, h, defineAsyncComponent } from 'vue';
import { createI18n } from 'vue-i18n';
import '@shopware-ag/meteor-component-library/styles.css';
import '@shopware-ag/meteor-component-library/font.css';
import { location } from '@shopware-ag/meteor-admin-sdk';
import './../iframe.css';
import { LOCATION_CARD_CREATE, LOCATION_CMS_ELEMENT } from '../constants';
import enGB from '../../snippets/faq.en-GB.json';
import deDE from '../../snippets/faq.de-DE.json';

// register all components for the location
const locations = {
    [LOCATION_CARD_CREATE]: defineAsyncComponent(
        () => import('./faq-list.vue')
    ),
    [`${LOCATION_CMS_ELEMENT}-element`]: defineAsyncComponent(
        () => import('./faq-cms-element.vue')
    ),
    [`${LOCATION_CMS_ELEMENT}-config`]: defineAsyncComponent(
        () => import('./faq-cms-config.vue')
    ),
    [`${LOCATION_CMS_ELEMENT}-preview`]: defineAsyncComponent(
        () => import('./faq-cms-preview.vue')
    ),
};

const app = createApp({
    // @ts-expect-error -- TS does not know about the location object
    render: () => h(locations[location.get()]),
});

type SnippetSchema = typeof enGB;
const i18n = createI18n<[SnippetSchema], 'en-GB' | 'de-DE'>({
    locale: 'en-GB', // Todo: set locale based on shopware admin language
    messages: {
        'en-GB': enGB,
        'de-DE': deDE,
    },
});

app.use(i18n);

app.mount('#app');

location.startAutoResizer();
