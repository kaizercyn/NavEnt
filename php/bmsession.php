<?php
require_once "dbconnection.php";
session_start();
    //$eventid = $_POST['event'];  
    $UserID = $_SESSION['userId'];
    //echo $eventid;
    echo $UserID;
    $st = $conn -> prepare("SELECT * FROM bookmarks WHERE User_ID=?");
    $st -> bind_param("i",$UserID);
    $st -> execute();
    $result = $st -> get_result();
    if($result -> num_rows != 0){
        $marks = $result -> fetch_all(MYSQLI_ASSOC);
        $markslength = count($marks);
        for($i = 0; $i < $markslength; $i++){
            print_r($marks[$i]);
            echo "<br>";
        }
    }else{
        echo 'di okay';
    }