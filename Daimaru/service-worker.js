const CACHE="granero-daimaru-v1";

const archivos=[
"./",
"./index.html",
"./css/style.css",
"./js/app.js",
"./assets/logo.png"
];


self.addEventListener("install",e=>{

e.waitUntil(
caches.open(CACHE)
.then(cache=>cache.addAll(archivos))
);

});


self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request)
.then(respuesta=>{

return respuesta ||
fetch(e.request);

})

);

});