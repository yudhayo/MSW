const namaCache = 'yudhamws';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(namaCache).then(async cache => {
            return cache.addAll([
                // js
                'js/register_sw.js',
                'js/main.js',
                'js/config.js',
                'js/peta.js',
                'js/dbhelper.js',
                'js/kalkulator.js',

                // css 
                'css/main.css',

                // home
                '/index.html',
                '/404.html',

                // kalkulator
                'project/index.html',

                // maps
                'project2/index.html',
                'project2/data.json',

                // gambar
                'images/icon.png', // kalo offline gambarnya ini nanti
                
            ]).catch(err => {
                console.log(`Gagal membuka cache, error: ${err}`);
            });
        })
    )
});

self.addEventListener('fetch', e => {

    // useless jadi tidak perlu sebenernya
    if(navigator.onLine === false){
        console.log('offline');
        offline = true;
    }

    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(async fetchResponse => {
                return caches.open(namaCache).then(cache => {
                    cache.put(e.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(err => {
            if(e.request.url.includes('.png')){
                return caches.match('images/icon.png'); // tanpa koneksi
            }
            
            return new Promise('Tidak terkoneksi ke internet', {
                status: 404,
                statusText: 'Tidak terkoneksi ke internet ya pak'
            });
        })
    )
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(namaCacheBaru => {
            return Promise.all(
                namaCacheBaru.filter(namaCacheBaru2 => {
                    return namaCacheBaru2.startsWith('yudhamws-')&& namaCacheBaru2 !== namaCache;
                }).map(namaCache => {
                    return caches.delete(namaCache);
                })
            )
        })
    )
});