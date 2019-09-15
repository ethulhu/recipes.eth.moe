const currentCacheName = 'v1';

const cacheFiles = [
  '/',
  '/elems.mjs',
  '/icon.png',
  '/index.html',
  '/menu.mjs',
  '/recipe.mjs',
  '/search.mjs',
];


self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open( currentCacheName ).then( cache => {
            return cache.addAll( cacheFiles );
        } )
    );
} );

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
