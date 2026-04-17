<?php
include "../config/db.php";

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    echo json_encode(["status" => "error", "message" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("UPDATE productos SET nombre=?, tipo=?, cantidad=?, costo=?, stock=? WHERE id=?");
$stmt->bind_param("ssissi", $data["nombre"], $data["tipo"], $data["cantidad"], $data["costo"], $data["stock"], $data["id"]);
$stmt->execute();

echo json_encode(["status" => "ok"]);
?>