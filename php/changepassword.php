<?php
session_start();
require("dbconnection.php");
$errors = array('password'=> '', 'newPassword' => '', 'confirm' => '');
if($_POST['currentPassword'] == $_SESSION['Password']){
    if($_POST['newPassword'] == $_POST['confirmNewPassword']){
        $newPassword = $_POST['newPassword'];
        $email = $_SESSION['email'];
    $st = $conn ->prepare("UPDATE 'ACCOUNTS' SET 'Password' = ?, WHERE Email_Address=?;");
    $st -> bind_param("ss", $newPassword, $email);
    $st -> execute();
    if ($result) {
        // Update successful
        print_r( "Password updated successfully!");
    } else {
        // Update failed
        $errors['password'] = "Error updating password: " . $st->error;
    }
    }else{
        $errors['confirm'] = "did not match!";
        $errors['newPassword'] = "did not match!";
    }
}else{
    $errors["password"] = "Incorrect Password";
}

?>