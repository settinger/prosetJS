// add service worker things for offline caching of PWA files
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#demo

const cacheName = "proset-cache";
const filesToCache = ["/", "favicon.ico", "index.html", "proset-main.js", "proset-style.css", "manifest.json", "../../favicon.ico"];

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(resources);
}

self.addEventListener("install", (e) => {
  e.waitUntil(addResourcesToCache(filesToCache));
});

const putInCache = async (req, res) => {
  const cache = await caches.open(cacheName);
  await cache.put(req, res);
}

const useCached = async (req) => {
  const cacheResponse = await caches.match(req);
  if (cacheResponse) {
    return cacheResponse;
  }
  try {
    const networkResponse = await fetch(req);
    if (networkResponse) {
      return networkResponse;
    }
  } catch (error) {

  }

  return new Response("Network error", {
    status: 420,
    headers: {"Content-Type": "text/plain"}
  });

  //return fetch(req);

  // Try to get resource from network if online
  // try {
  //   const networkResponse = await fetch(req);
  //   // Clone, save one copy in cache, serve other
  //   event.waitUntil(putInCache(req, networkResponse.clone()));
  //   return networkResponse;
  // } catch (error) {
  //   // const fallbackResponse = await caches.match(fallbackUrl);
  //   // if (fallbackResponse) {
  //   //   return fallbackResponse;
  //   // }
// 
  //   // return new Response("Network error", {
  //   //   status: 408,
  //   //   headers: {"Content-Type": "text/plain"}
  //   // });
  // }

  //return fetch(req);
}

self.addEventListener("fetch", (e) => {
  e.respondWith(useCached(e.request));
});