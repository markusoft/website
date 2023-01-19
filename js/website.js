document.addEventListener('DOMContentLoaded', function () {

    Website = (function () {

        const app = {};

        /* 
         * =====================================================================
         * Private Members
         * =====================================================================
         */

        app.init = function () {
//            app.initializeServiceWorker();
            app.bindings();
        };

        app.bindings = function () {
            
        };
        
        app.initializeServiceWorker = function() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('../../sw-website.js').then(function(reg) {
                    console.log('Successfully registered service worker', reg);
                }).catch(function(err) {
                    console.warn('Error whilst registering service worker', err);
                });
            }
        };

        app.init();

        /* 
         * =====================================================================
         * Public Members
         * =====================================================================
         */

        return {
//            functionName: function(params) {
//                return app.functionName(params);
//            },
        };

    }());

});