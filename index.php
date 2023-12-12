<?php
session_start();

if (isset($_SESSION["username"])) {
    include("html/logged_home.html");
} else {
    include("html/index.html");
}
?>