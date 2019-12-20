const currentCacheName = 'v1';

// 
const cacheFiles = [
  '/index.html',
  '/icon.png',
  '/tofu-rolls',
  '/vegan-cake',
  . . .
];


self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open( currentCacheName ).then( cache => {
            return cache.addAll( cacheFiles );
        } )
    );
} );

// TODO: remove files not in cacheFiles.
// see `trimCache` at https://www.afasterweb.com/2017/01/31/upgrading-your-service-worker-cache/
self.addEventListener( 'activate', e => {
    e.waitUntil(
        caches.keys().then( cacheNames =>
            Promise.all( cacheNames.map( name => {
                if ( name !== currentCacheName ) {
                    return caches.delete( name );
                }
            } ) )
        )
    );
 
    return self.clients.claim();
} );

self.addEventListener( 'fetch', e => {
  e.respondWith(
    fetch( e.request ).then(
      response => caches.open( currentCacheName )
                        .then(
                           cache => cache.put( e.request, response.clone() ) )
                        .then( () => response ) )
                      .catch( () => caches.match( e.request ) )
  );
} );
