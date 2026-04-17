<?php
include "../config/db.php";

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    echo json_encode(["status" => "error", "message" => "No autorizado"]);
    exit;
}

// Obtener todos los productos
$result = $conn->query("SELECT * FROM productos ORDER BY id DESC");
$productos = [];
while ($row = $result->fetch_assoc()) {
    $productos[] = $row;
}

// 1. Resumen general
$totalProductos = count($productos);
$valorTotal = 0;
$enStock = 0;
$sinStock = 0;

foreach ($productos as $p) {
    $valorTotal += ($p["cantidad"] * $p["costo"]);
    if ($p["stock"] == "si") {
        $enStock++;
    } else {
        $sinStock++;
    }
}

// 2. Productos por tipo
$tipos = [];
foreach ($productos as $p) {
    $tipo = $p["tipo"];
    if (!isset($tipos[$tipo])) {
        $tipos[$tipo] = 0;
    }
    $tipos[$tipo]++;
}

$tiposData = [];
foreach ($tipos as $nombre => $cantidad) {
    $tiposData[] = ["tipo" => $nombre, "cantidad" => $cantidad];
}

// 3. Top 5 productos más caros
$topCaros = $productos;
usort($topCaros, function($a, $b) {
    return $b["costo"] <=> $a["costo"];
});
$topCaros = array_slice($topCaros, 0, 5);

// 4. Productos con bajo stock (cantidad <= 5)
$bajoStock = array_filter($productos, function($p) {
    return $p["cantidad"] <= 5;
});
$bajoStock = array_values($bajoStock);

echo json_encode([
    "status" => "ok",
    "resumen" => [
        "totalProductos" => $totalProductos,
        "valorTotal" => $valorTotal,
        "enStock" => $enStock,
        "sinStock" => $sinStock
    ],
    "productosPorTipo" => $tiposData,
    "topProductosCaros" => $topCaros,
    "productosBajoStock" => $bajoStock,
    "todosProductos" => $productos
]);
?>