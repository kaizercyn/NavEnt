<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login Page</title>
    <link rel="stylesheet" href="style/user_login.css">
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <img src="../res/imgs/navi-event-logo(3d).png" alt="Your Logo" class="logo">
        </div>
        <div class="login-form-container">
            <div class="login_form">
                <form action="../php/login.php" method="POST">
                    
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required>

                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>

                    <button type="submit" id="submit">Continue</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
