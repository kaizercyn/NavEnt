<?php
session_start();

if (isset($_SESSION["username"])) {
    include("client/logged_home.html");
} else {
    include("client/index.html");
}
?>