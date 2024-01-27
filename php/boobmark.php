<?php
require_once "dbconnection.php";
date_default_timezone_set("UTC+8");
if(isset($_POST['boobmark'])){
    $bookmarkIDGenerator = substr(uniqid(),0,7);
    $date = date('Y-m-d');
    $userBookmark = $_POST['user'];
    $eventBookmark = $_POST['eID'];
    $st = $conn -> prepare("INSERT INTO bookmarks (`Bookmark_ID`,`Date_Bookmarked`,`User_ID`,`Event_ID` VALUES 
                            (`$bookmarkIDGenerator`,`$date`,`$userBookmark`,`$eventBookmark`" );
    $st -> execute();
    $st -> close();
}