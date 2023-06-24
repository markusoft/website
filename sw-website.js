self.addEventListener('install', e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll([
                './index.html',
                // fonts
                './resources/plugins/fontello/font/fontello.eot',
                './resources/plugins/fontello/font/fontello.svg',
                './resources/plugins/fontello/font/fontello.ttf',
                './resources/plugins/fontello/font/fontello.woff',
                './resources/plugins/fontello/font/fontello.woff2',
                './resources/assets/fonts/CenturyGothic-Bold.ttf',
                './resources/assets/fonts/CenturyGothic-Regular.ttf',
                './resources/assets/fonts/VarelaRound-Regular.ttf',
                // assets
                // css
                './assets/css/normalize.css',
                './assets/css/template.css',
                // js
                './assets/js/tpl-config.js',
                './assets/js/tpl-mgelo.js',
                // images
                './assets/img/placeholders/rectangle.svg',
                './assets/img/placeholders/square.svg',
                './assets/img/placeholders/profile.svg',
                // module assets
                // css
                './css/website.css',
                './css/website-desktop.css',
                './css/website-tablet.css',
                './css/website-mobile.css',
                // js
                './js/data.js',
                './js/website.js',
                './js/website-ui.js',
                './js/website-proto.js'
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});