<?php
session_start();
require("dbconnection.php");
if(isset($_POST["register"])) {
    if($_POST["IDnum"] == $_SESSION['userId']) {
        $registerID = uniqid();
        $nameUser = $_POST['uname'];
        $age = $_POST['age'];
        $course = $_POST['course'];
        $yearlevel = $_POST['year'];
        $eventiD = $_POST['eventid'];
        $uID = $_POST['IDnum'];
        $st = $conn->prepare('INSERT INTO registration (`Registration_ID`, `Name`, `Age`, `Course`, `Year`, `User_ID`) VALUES (?,?,?,?,?,?)');
        $st -> bind_param('issssi', $registerID, $nameUser, $age,$course, $yearlevel, $uID);
        $st -> execute();
        $st -> close();
        $st = $conn ->prepare('INSERT INTO regisdetails (`User_ID`, `Event_ID`) VALUES (?,?)');
        $st -> bind_param('ii', $uID,$eventiD);
        $st -> execute();
        $st -> close();
    }


}
header('Location: ../index.php');
?>