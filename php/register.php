<?php
session_start();
require("dbconnection.php");
require "../vendor/autoload.php";

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

if(isset($_POST["register"])) {
    if($_POST["IDnum"] == $_SESSION['userId']) {
        $registerID = substr(uniqid(), 0,8);
        $nameUser = $_POST['uname'];
        $age = $_POST['age'];
        $course = $_POST['course'];
        $yearlevel = $_POST['year'];
        $eventiD = $_POST['eventid'];
        $uID = $_POST['IDnum'];
        $qrCode = $nameUser . $eventiD;

        $st = $conn->prepare('INSERT INTO registration (`Registration_ID`, `Name`, `Age`, `Course`, `Year`, `User_ID`) VALUES (?,?,?,?,?,?)');
        $st -> bind_param('issssi', $registerID, $nameUser, $age,$course, $yearlevel, $uID);
        $st -> execute();
        $st -> close();

        $st = $conn ->prepare('INSERT INTO regisdetails (`User_ID`, `Event_ID`) VALUES (?,?)');
        $st -> bind_param('ii', $uID,$eventiD);
        $st -> execute();
        $st -> close();

        $qrData = $uID . $eventiD;
        $qr_code = QrCode::create($qrData);
        $writer = new PngWriter;
        $qrGenerated = $writer -> write($qr_code);
        header("Content-type: " . $qrGenerated -> getMimeType());
        echo $qrGenerated -> getString();
    }


}
//header('Location: ../index.php');
?>