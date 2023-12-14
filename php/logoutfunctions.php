<?php
require("dbconnection.php");

if(isset($_POST["SUBMIT"])) {
session_destroy();
}
header('Location: ../index.php');
exit();
?>