<?php
include "../config/db.php";
session_destroy();
echo json_encode(["status" => "ok"]);
?>