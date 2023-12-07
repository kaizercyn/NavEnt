<?php
session_start();

// include "php/header.php"

if (!isset($_SESSION["username"])) {
    include "client/userlogin.html";
}else{
    include "client/home.html";
}

//include "php/footer.php;
?>