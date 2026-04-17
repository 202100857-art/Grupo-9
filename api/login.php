<?php
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("SELECT * FROM usuarios WHERE user = ?");
$stmt->bind_param("s", $data["user"]);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($data["pass"], $user["pass"])) {
    $_SESSION["user_id"] = $user["id"];
    $_SESSION["user_name"] = $user["user"];
    $_SESSION["logged_in"] = true;
    
    echo json_encode(["status" => "ok", "user" => $user["user"]]);
} else {
    echo json_encode(["status" => "error", "message" => "Credenciales incorrectas"]);
}
?>