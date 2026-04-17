<?php
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

// Verificar si usuario ya existe
$check = $conn->prepare("SELECT id FROM usuarios WHERE user = ?");
$check->bind_param("s", $data["user"]);
$check->execute();
$check->store_result();

if ($check->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Usuario ya existe"]);
    exit;
}

$passHash = password_hash($data["pass"], PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO usuarios (user, pass) VALUES (?, ?)");
$stmt->bind_param("ss", $data["user"], $passHash);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al registrar"]);
}
?>