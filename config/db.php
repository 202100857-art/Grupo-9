<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "grupo_9";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

$conn->set_charset("utf8");


session_start();
?>