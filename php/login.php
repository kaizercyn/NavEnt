<?php
require("dbconnection.php");
session_start();
if (isset($_POST['submit'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    // require("loginfuntions.php");

    // if (emptyInputLogin($username, $password) !== false){
    //     header("Location: ../login.php?error=emptyinput");
    //     exit();
    // }

    // if (userNotFound($conn, $username) !== false){
    //     header("Location: ../login.php?error=usernotfound");
    //     exit();
    // }

    $st = $conn -> prepare("SELECT * FROM ACCOUNTS WHERE User_ID=? and Password=?;");
    $st-> bind_param('ss', $username, $password);
    $st-> execute();
    $result= $st->get_result();
    if ($result->num_rows !=0){
        $row = $result->fetch_assoc();
        $firstName = $row['First_Name'];
        $_SESSION['username'] = $username;
        echo "logged in as: $firstName";
    }else{
        echo "wrong login credentials";
    }
    $st->close();
}
header('Location: ../index.php');
?>