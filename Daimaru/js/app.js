const URL="https://docs.google.com/spreadsheets/d/1sktRzcW4hz2z7BwbwPjsgRrfksKi_Lf6/export?format=csv&gid=461144142";

const contenedor=document.getElementById("contenedorProductos");
const buscador=document.getElementById("buscarProducto");
const fecha=document.getElementById("fechaActualizacion");
const total=document.getElementById("totalProductos");
const contador=document.getElementById("contadorResultados");
const limpiar=document.getElementById("limpiarBusqueda");
const botonFavoritos=document.getElementById("verFavoritos");
const actualizar=document.getElementById("actualizarDatos");
const ultima=document.getElementById("ultimaActualizacion");

let productos=[];
let vista=[];
let modoFavoritos=false;

let favoritos=
JSON.parse(localStorage.getItem("favoritos"))||[];

function numero(valor){
return Number(valor?.toString().replace(/,/g,"").replace(/"/g,"").trim())||0;
}

function formatoPrecio(valor){
return numero(valor).toLocaleString("es-CO");
}

function esProducto(nombre){
if(!nombre)return false;

let bloqueados=[
"LISTA",
"CÓDIGO",
"CODIGO",
"VERSIÓN",
"VERSION",
"FECHA",
"MÍNIMO",
"MÁXIMO",
"VERDURAS",
"FRUTAS",
"PROCESADOS",
"CÁRNICOS",
"CARNICOS",
"TOTAL"
];

let texto=nombre.toUpperCase();

return !bloqueados.some(x=>texto.includes(x));
}

function mostrarProductos(lista){

contenedor.innerHTML="";

contador.textContent=
"Mostrando: "+lista.length+" productos";

if(lista.length===0){

contenedor.innerHTML=`
<div class="producto-card">
<h3>No hay favoritos guardados</h3>
</div>`;

return;

}

lista.forEach(producto=>{

let activo=favoritos.includes(producto.nombre);

contenedor.innerHTML+=`

<div class="producto-card">

<span class="favorito ${activo?"activo":""}" data-producto="${producto.nombre}">
★
</span>

<h3>${producto.nombre}</h3>

<div class="precio">
$${formatoPrecio(producto.precio)}
</div>

<div class="unidad">
Precio promedio
</div>

<div class="fecha">
Actualizado:
${fecha.textContent}
</div>

</div>`;

});

}

async function cargarDatos(){

try{

let respuesta=await fetch(URL);

if(!respuesta.ok){
throw new Error("CSV no disponible");
}

let csv=await respuesta.text();

let filas=Papa.parse(csv).data;

productos=[];

filas.forEach(fila=>{

let nombre=fila[1]?.trim();
let precio=fila[6]?.trim();

if(!esProducto(nombre))return;

if(numero(precio)<=0)return;

productos.push({
nombre,
precio
});

});

productos.sort((a,b)=>
a.nombre.localeCompare(b.nombre)
);

fecha.textContent=
new Date().toLocaleDateString("es-CO");

total.textContent=
productos.length;

ultima.textContent=
new Date().toLocaleTimeString("es-CO");

vista=[...productos];

mostrarProductos(vista);

}catch(error){

console.log(error);

contenedor.innerHTML=`

<div class="producto-card">
<h3>Error cargando precios</h3>
</div>`;

}

}

function aplicarFiltros(){

let texto=
buscador.value.toLowerCase().trim();

vista=
productos.filter(p=>{

let coincide=
p.nombre.toLowerCase().includes(texto);

if(modoFavoritos){

return coincide &&
favoritos.includes(p.nombre);

}

return coincide;

});

mostrarProductos(vista);

}

buscador.addEventListener("input",()=>{
aplicarFiltros();
});

limpiar.addEventListener("click",()=>{

buscador.value="";

aplicarFiltros();

});

botonFavoritos.addEventListener("click",()=>{

modoFavoritos=!modoFavoritos;

botonFavoritos.classList.toggle("activo");

botonFavoritos.textContent=
modoFavoritos
?"Todos"
:"Favoritos ⭐";

aplicarFiltros();

});

actualizar.addEventListener("click",()=>{

actualizar.textContent="Actualizando...";

cargarDatos();

setTimeout(()=>{

actualizar.textContent="Actualizar 🔄";

},1000);

});

contenedor.addEventListener("click",e=>{

if(e.target.classList.contains("favorito")){

let nombre=
e.target.dataset.producto;

if(favoritos.includes(nombre)){

favoritos=
favoritos.filter(x=>x!==nombre);

}else{

favoritos.push(nombre);

}

localStorage.setItem(
"favoritos",
JSON.stringify(favoritos)
);

aplicarFiltros();

}

});

setInterval(()=>{

cargarDatos();

},300000);

cargarDatos();

if("serviceWorker" in navigator){

navigator.serviceWorker.register("service-worker.js");

}