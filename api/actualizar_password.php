<?php
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);
$user = $data["user"];
$newPass = $data["newPass"];

// Hashear nueva contraseña
$passHash = password_hash($newPass, PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE usuarios SET pass = ? WHERE user = ?");
$stmt->bind_param("ss", $passHash, $user);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "message" => "Contraseña actualizada correctamente"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error al actualizar contraseña"]);
}
?>