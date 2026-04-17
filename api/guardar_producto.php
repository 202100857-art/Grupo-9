<?php
include "../config/db.php";

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    echo json_encode(["status" => "error", "message" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("INSERT INTO productos (nombre, tipo, cantidad, costo, stock, usuario) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssisss", $data["nombre"], $data["tipo"], $data["cantidad"], $data["costo"], $data["stock"], $data["usuario"]);
$stmt->execute();

echo json_encode(["status" => "ok"]);
?>