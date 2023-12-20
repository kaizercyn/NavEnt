<?php
session_start();
require("saveevent.php");
print_r($_SESSION['name']);
print_r($activeevent);
echo "its working";
?>

