import { createApp, h, defineAsyncComponent } from 'vue';
import { createI18n } from 'vue-i18n';
import '@shopware-ag/meteor-component-library/styles.css';
import '@shopware-ag/meteor-component-library/font.css';
import { location, context } from '@shopware-ag/meteor-admin-sdk';
import './../iframe.css';
import { LOCATION_CMS_ELEMENT } from '../constants';
import enGB from '../snippet/en-GB.json';
import deDE from '../snippet/de-DE.json';

(async () => {
    // register all components for the location
    const locations = {
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
        name: `iframe-${location.get()}`,
        // @ts-expect-error -- TS does not know about the location object
        render: () => h(locations[location.get()]),
    });

    const currentLocale = await context.getLocale();
    type SnippetSchema = typeof enGB;
    const i18n = createI18n<[SnippetSchema], 'en-GB' | 'de-DE'>({
        locale: currentLocale.locale,
        fallbackLocale: currentLocale.fallbackLocale,
        messages: {
            'en-GB': enGB,
            'de-DE': deDE,
        },
    });

    // dynamically update locale
    context.subscribeLocale(({ locale, fallbackLocale }) => {
        i18n.global.locale = locale as 'en-GB' | 'de-DE';
        i18n.global.fallbackLocale = fallbackLocale as 'en-GB' | 'de-DE';
    });

    app.use(i18n);

    app.mount('#app');

    location.startAutoResizer();
})();
