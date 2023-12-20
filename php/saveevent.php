<?php
require("dbconnection.php");
//require("../php/saveevent.php");

if(isset($_POST['readMore'] )){
    $eventid = $_POST['event'];
    $st = $conn ->prepare("SELECT * FROM EVENTS WHERE Event_id=?");
    $st -> bind_param("i", $eventid);
    $st -> execute();
    $result = $st -> get_result();
        if($result->num_rows > 0) {
            $activeevent = $result->fetch_assoc();
            $_SESSION['name'] = $activeevent['Event_Name'];
            $_SESSION['tagline'] =  $activeevent['Event_Tagline'];
            $_SESSION['desc'] = $activeevent['Event_Description'];
            $_SESSION['start'] = $activeevent['Event_StartDate'];
            $_SESSION['end'] = $activeevent['Event_EndDate'];
            echo $_SESSION['name'] . $_SESSION['tagline'];
            
        //header('Location: ../client/event_details.php');
        //header('Location: temp.php');
        }
    }

?>