<?php
session_start();

// include "php/header.php"

if (!isset($_SESSION["username"])) {
    include "html/userlogin.html";
}else{
    include "html/home.html";
}

//include "php/footer.php;
?>