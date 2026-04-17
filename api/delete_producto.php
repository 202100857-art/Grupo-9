<?php
include "../config/db.php";

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    echo json_encode(["status" => "error", "message" => "No autorizado"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$stmt = $conn->prepare("DELETE FROM productos WHERE id=?");
$stmt->bind_param("i", $data["id"]);
$stmt->execute();

echo json_encode(["status" => "ok"]);
?>