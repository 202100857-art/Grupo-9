<?php
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user = $data["user"];

$stmt = $conn->prepare("SELECT id FROM usuarios WHERE user = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "ok", "user" => $user]);
} else {
    echo json_encode(["status" => "error", "message" => "Usuario no encontrado"]);
}
?>