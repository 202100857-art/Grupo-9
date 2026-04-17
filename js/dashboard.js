let productos = [];
let paginaActual = 1;
const porPagina = 5;
let editIndex = null;
let modalInstance = null;

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    mostrarUsuario();
    cargarProductos();

    const modalElement = document.getElementById('modalEditar');
    if (modalElement) {
        modalInstance = new bootstrap.Modal(modalElement);
    }

    const btnGuardar = document.getElementById("btnGuardar");
    if (btnGuardar) {
        btnGuardar.addEventListener("click", guardarEdicion);
    }
});

function cargarProductos() {
    fetch("api/get_productos.php")
        .then(res => res.json())
        .then(data => {
            productos = data;
            render();
        });
}

function render() {
    const tabla = document.getElementById("tablaRegistros");
    if (!tabla) return;
    tabla.innerHTML = "";

    const inicio = (paginaActual - 1) * porPagina;
    const datos = productos.slice(inicio, inicio + porPagina);

    datos.forEach((p, i) => {
        const stockBadge = p.stock === 'si' 
            ? '<span class="badge-stock-si">En stock</span>' 
            : '<span class="badge-stock-no">Sin stock</span>';

        tabla.innerHTML += `
            <tr>
                 <td><strong style="color: black;">${escapeHtml(p.nombre)}</strong></td>
        <td style="color: black;">${escapeHtml(p.tipo)}</td>
        <td style="color: black;">${p.cantidad}</td>
        <td style="color: black;">$${p.costo}</td>
        <td>${stockBadge}</td>
        <td style="color: black;">${escapeHtml(p.usuario || "Admin")}</td>
                <td>
                    <button class="btn-edit" onclick="abrirModal(${inicio + i})">Editar</button>
                    <button class="btn-delete ms-1" onclick="eliminar(${p.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    // Actualizar
    document.getElementById("totalProductos").innerText = productos.length;

    const totalCantidad = productos.reduce((sum, p) => sum + (parseInt(p.cantidad) || 0), 0);
    document.getElementById("totalCantidad").innerText = totalCantidad;

    const totalCosto = productos.reduce((sum, p) => sum + ((parseInt(p.cantidad) || 0) * (parseFloat(p.costo) || 0)), 0);
    document.getElementById("totalCosto").innerText = "$" + totalCosto.toLocaleString();

    const totalStock = productos.filter(p => p.stock === "si").length;
    document.getElementById("totalStock").innerText = totalStock;

    // Paginación
    const total = Math.ceil(productos.length / porPagina);
    const cont = document.getElementById("paginacion");
    if (cont) {
        cont.innerHTML = "";
        for (let i = 1; i <= total; i++) {
            const activeClass = paginaActual === i ? 'active' : '';
            cont.innerHTML += `<button class="page-btn ${activeClass}" onclick="cambiar(${i})">${i}</button>`;
        }
    }
}

function cambiar(pagina) {
    paginaActual = pagina;
    render();
}

function eliminar(id) {
    if (confirm("¿Eliminar producto?")) {
        fetch("api/delete_producto.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(() => cargarProductos());
    }
}

function abrirModal(index) {
    editIndex = index;
    const producto = productos[index];
    document.getElementById("editNombre").value = producto.nombre;
    document.getElementById("editTipo").value = producto.tipo;
    document.getElementById("editCantidad").value = producto.cantidad;
    document.getElementById("editCosto").value = producto.costo;
    document.getElementById("editStock").value = producto.stock;
    modalInstance.show();
}

function guardarEdicion() {
    const producto = productos[editIndex];
    const usuarioActual = JSON.parse(localStorage.getItem("session")) || { user: "Admin" };

    fetch("api/update_producto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: producto.id,
            nombre: document.getElementById("editNombre").value,
            tipo: document.getElementById("editTipo").value,
            cantidad: parseInt(document.getElementById("editCantidad").value) || 0,
            costo: parseFloat(document.getElementById("editCosto").value) || 0,
            stock: document.getElementById("editStock").value,
            usuario: usuarioActual.user
        })
    })
    .then(res => res.json())
    .then(() => {
        modalInstance.hide();
        cargarProductos();
    });
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function(m) {
        if (m === "&") return "&amp;";
        if (m === "<") return "&lt;";
        if (m === ">") return "&gt;";
        return m;
    });
}