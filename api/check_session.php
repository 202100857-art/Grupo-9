<?php
include "../config/db.php";

if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
    echo json_encode(["status" => "ok", "user" => $_SESSION["user_name"]]);
} else {
    echo json_encode(["status" => "error"]);
}
?>