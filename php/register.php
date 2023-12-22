<?php
session_start();
require("dbconnection.php");
require "../vendor/autoload.php";

use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;

if(isset($_POST["register"])) {
    if($_POST["IDnum"] == $_SESSION['userId']) {
        $nameUser = $_POST['uname'];
        $age = $_POST['age'];
        $course = $_POST['course'];
        $yearlevel = $_POST['year'];
        $eventiD = $_POST['eventid'];
        $uID = $_POST['IDnum'];
        $registerID = $uID . $eventiD;
        $_SESSION['IDEvent'] = $eventiD;
              
        $st = $conn->prepare('INSERT INTO registration (`Registration_ID`, `Name`, `Age`, `Course`, `Year`, `User_ID`) VALUES (?,?,?,?,?,?)');
        $st -> bind_param('issssi', $registerID, $nameUser, $age,$course, $yearlevel, $uID);
        $st -> execute();
        $st -> close();
        $qrData = $uID . $eventiD;
        $qr_code = QrCode::create($qrData);
        $writer = new PngWriter;
        $qrGenerated = $writer -> write($qr_code);
        $final = $qrGenerated -> getString();

        $st = $conn ->prepare('INSERT INTO regisdetails (`User_ID`, `Event_ID`,`QR_Code`) VALUES (?,?,?)');
        $st -> bind_param('iis', $uID,$eventiD,$final);
        $st -> execute();
        $st -> close();

        
        header("Content-type: " . $qrGenerated -> getMimeType());
        echo $qrGenerated -> getString();
    }


}
//header('Location: ../index.php');
?>