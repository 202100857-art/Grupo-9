<?php
include "../config/db.php";

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    echo json_encode([]);
    exit;
}

$result = $conn->query("SELECT * FROM productos ORDER BY id DESC");
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode($data);
?>