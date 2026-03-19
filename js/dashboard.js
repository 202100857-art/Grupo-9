document.addEventListener("DOMContentLoaded", () => {
    checkAuth();        //
    mostrarUsuario();   

    productos = JSON.parse(localStorage.getItem("productos")) || [];
    render();
});

let productos = [];
let paginaActual = 1;
const porPagina = 5;
let editIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    productos = JSON.parse(localStorage.getItem("productos")) || [];
    render();
});

function render() {
    const tabla = document.getElementById("tablaRegistros");
    tabla.innerHTML = "";

    let inicio = (paginaActual - 1) * porPagina;
    let datos = productos.slice(inicio, inicio + porPagina);

    datos.forEach((p, i) => {
        tabla.innerHTML += `
        <tr>
            <td>${p.nombre}</td>
            <td>${p.tipo}</td>
            <td>${p.cantidad}</td>
            <td>$${p.costo}</td>
            <td>${p.stock}</td>
 <td>${p.usuario || "Admin"}</td>
            <td>
                <button class="btn-edit" onclick="abrirModal(${inicio + i})">Editar</button>
                <button class="btn-delete" onclick="eliminar(${inicio + i})">Eliminar</button>
            </td>
        </tr>`;
    });

   
   document.getElementById("totalProductos").innerText = productos.length;


let totalCantidad = productos.reduce((sum, p) => sum + (p.cantidad || 0), 0);
document.getElementById("totalCantidad").innerText = totalCantidad;


let totalCosto = productos.reduce((sum, p) => sum + ((p.cantidad || 0) * (p.costo || 0)), 0);
document.getElementById("totalCosto").innerText = "$" + totalCosto.toLocaleString();


let totalStock = productos.filter(p => p.stock === "si").length;
document.getElementById("totalStock").innerText = totalStock;

    paginacion();
}

function paginacion() {
    let total = Math.ceil(productos.length / porPagina);
    let cont = document.getElementById("paginacion");
    cont.innerHTML = "";

    for (let i = 1; i <= total; i++) {
        cont.innerHTML += `<button onclick="cambiar(${i})">${i}</button>`;
    }
}

function cambiar(p) {
    paginaActual = p;
    render();
}

function eliminar(i) {
    if (confirm("Eliminar producto?")) {
        productos.splice(i, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        render();
    }
}

function abrirModal(i) {
    editIndex = i;
    document.getElementById("modal").style.display = "flex";

    let p = productos[i];

    editNombre.value = p.nombre;
    editTipo.value = p.tipo;
    editCantidad.value = p.cantidad;
    editCosto.value = p.costo;
    editStock.value = p.stock;
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("btnGuardar").addEventListener("click", () => {
	 let usuarioActual = JSON.parse(localStorage.getItem("session")) || { user: "Admin" };

    productos[editIndex].nombre = editNombre.value;
    productos[editIndex].tipo = editTipo.value;
    productos[editIndex].cantidad = parseInt(editCantidad.value) || 0;
    productos[editIndex].costo = parseFloat(editCosto.value) || 0;
    productos[editIndex].stock = editStock.value;
	 productos[editIndex].usuario = usuarioActual.user;

    localStorage.setItem("productos", JSON.stringify(productos));

    cerrarModal();
    render();
});