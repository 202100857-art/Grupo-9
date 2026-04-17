let chartTipo = null;

document.addEventListener("DOMContentLoaded", () => {
    checkAuth();
    mostrarUsuario();
    cargarReportes();
});

function cargarReportes() {
    fetch("api/reportes.php")
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                // Actualizar resumen
                document.getElementById("resumenTotalProductos").innerText = data.resumen.totalProductos;
                document.getElementById("resumenValorTotal").innerText = "$" + data.resumen.valorTotal.toLocaleString();
                document.getElementById("resumenEnStock").innerText = data.resumen.enStock;
                document.getElementById("resumenSinStock").innerText = data.resumen.sinStock;

                // Crear gráfico de tipos
                crearGraficoTipo(data.productosPorTipo);

                // Llenar tabla de top productos más caros
                llenarTablaTopCaros(data.topProductosCaros);

                // Llenar tabla de productos con bajo stock
                llenarTablaBajoStock(data.productosBajoStock);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function crearGraficoTipo(datos) {
    const ctx = document.getElementById('chartTipo').getContext('2d');
    
    const tipos = datos.map(item => item.tipo);
    const cantidades = datos.map(item => item.cantidad);
    
    // Colores para el gráfico
    const colores = [
        '#F68121', '#3b82f6', '#22c55e', '#ef4444', '#8b5cf6', 
        '#ec4899', '#06b6d4', '#84cc16', '#f59e0b', '#6366f1'
    ];
    
    if (chartTipo) {
        chartTipo.destroy();
    }
    
    chartTipo = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tipos,
            datasets: [{
                label: 'Cantidad de productos',
                data: cantidades,
                backgroundColor: colores,
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#f1f5f9'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#f1f5f9'
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                }
            }
        }
    });
}

function llenarTablaTopCaros(productos) {
    const tabla = document.getElementById("tablaTopCaros");
    tabla.innerHTML = "";
    
    if (productos.length === 0) {
        tabla.innerHTML = `<tr><td colspan="4" class="text-center text-secondary">No hay productos</td></tr>`;
        return;
    }
    
    productos.forEach(p => {
        const stockBadge = p.stock === 'si' 
            ? '<span class="badge-stock-si">En stock</span>' 
            : '<span class="badge-stock-no">Sin stock</span>';
        
        tabla.innerHTML += `
            <tr>
                <td style="color: white;"><strong>${escapeHtml(p.nombre)}</strong></td>
                <td style="color: white;">${escapeHtml(p.tipo)}</td>
                <td style="color: white;">$${parseFloat(p.costo).toLocaleString()}</td>
                <td>${stockBadge}</td>
            </tr>
        `;
    });
}

function llenarTablaBajoStock(productos) {
    const tabla = document.getElementById("tablaBajoStock");
    tabla.innerHTML = "";
    
    if (productos.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="text-center text-secondary">No hay productos con bajo stock</td></tr>`;
        return;
    }
    
    productos.forEach(p => {
        const stockBadge = p.stock === 'si' 
            ? '<span class="badge-stock-si">En stock</span>' 
            : '<span class="badge-stock-no">Sin stock</span>';
        
       
        const cantidadColor = p.cantidad === 0 ? 'style="color: #ef4444; font-weight: bold;"' : 'style="color: white;"';
        
        tabla.innerHTML += `
            <tr>
                <td style="color: white;"><strong>${escapeHtml(p.nombre)}</strong></td>
                <td style="color: white;">${escapeHtml(p.tipo)}</td>
                <td ${cantidadColor}>${p.cantidad}</td>
                <td style="color: white;">$${parseFloat(p.costo).toLocaleString()}</td>
                <td>${stockBadge}</td>
            </tr>
        `;
    });
}

function exportarReporte() {
    fetch("api/reportes.php")
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                // Crear contenido CSV
                let csvContent = "REPORTE DE INVENTARIO\n\n";
                csvContent += "RESUMEN GENERAL\n";
                csvContent += `Total Productos,${data.resumen.totalProductos}\n`;
                csvContent += `Valor Total del Inventario,$${data.resumen.valorTotal.toLocaleString()}\n`;
                csvContent += `Productos en Stock,${data.resumen.enStock}\n`;
                csvContent += `Productos Sin Stock,${data.resumen.sinStock}\n\n`;
                
                csvContent += "LISTADO DE PRODUCTOS\n";
                csvContent += "ID,Nombre,Tipo,Cantidad,Costo,Stock,Usuario\n";
                
                data.todosProductos.forEach(p => {
                    csvContent += `${p.id},${p.nombre},${p.tipo},${p.cantidad},${p.costo},${p.stock},${p.usuario || "Admin"}\n`;
                });
                
                // Descargar archivo
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.href = url;
                link.setAttribute("download", `reporte_inventario_${new Date().toISOString().slice(0,19)}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
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