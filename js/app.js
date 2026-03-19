const form = document.getElementById("formRegistro");
const mensaje = document.getElementById("mensaje");
const btn = document.getElementById("btnSubmit");


document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", () => {
        if (el.value.trim() === "") {
            el.classList.add("input-error");
        } else {
            el.classList.remove("input-error");
        }
    });
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value) || 0;
    const costo = parseFloat(document.getElementById("costo").value) || 0;
    const stock = document.getElementById("stock").value;

    if (!nombre || !tipo || !stock) {
        mensaje.innerHTML = `<div class="alert error">Completa los campos obligatorios</div>`;
        return;
    }

    btn.innerText = "Guardando...";
    btn.disabled = true;

    setTimeout(() => {

        const producto = {
            nombre,
            tipo,
            cantidad,
            costo,
            stock,
            fecha: new Date().toLocaleString()
        };

        let productos = JSON.parse(localStorage.getItem("productos")) || [];
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));

        mensaje.innerHTML = `<div class="alert success">Producto guardado correctamente</div>`;

        form.reset();
        btn.innerText = "Guardar Producto";
        btn.disabled = false;

    }, 600);
});