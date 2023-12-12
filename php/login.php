<?php
session_start();
require("dbconnection.php");
if (isset($_POST['username'])){
    $username = $_POST['username'];
    $password = $_POST['password'];
    $st = $conn -> prepare("SELECT * FROM ACCOUNTS WHERE User_ID=? and Password=?;");
    $st-> bind_param('ss', $username, $password);
    $st-> execute();
    $result= $st->get_result();
    if ($result->num_rows !=0){
        // $row = $result->fetch_assoc();
        // $firstName = $row['First_Name'];
        $_SESSION['username'] = $username;
        header('Location: ../index.php');
        // echo "logged in as: $firstName";
    }else{
        echo "wrong login credentials";
    }
    $st->close();
} else {
    header("Location: login.php");
}
?>