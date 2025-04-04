import { location } from '@shopware-ag/meteor-admin-sdk';

// Only execute extensionSDK commands when
// it is inside a iFrame (only needed for plugins)
if (location.isIframe()) {
    if (location.is(location.MAIN_HIDDEN)) {
        /**
         * This gets executed in the administration in a hidden iFrame.
         * So we don't need any visual components here. It just initializes
         * all extension points needed for this component.
         */
        import('./init-sdk');
    } else {
        /**
         * This gets executed when the administration renders
         * a location. We use a general view renderer which renders
         * the correct view based on the given location.
         */
        import('./locations/init-locations');
    }
}
