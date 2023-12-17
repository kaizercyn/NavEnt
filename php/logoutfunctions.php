<?php
require("dbconnection.php");

if(isset($_SESSION["username"])) {
session_destroy();
}
header('Location: ../index.php');
exit();
?> 