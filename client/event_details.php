<?php
session_start();
require("../php/dbconnection.php");
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
        }
    }
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NavEnt Home</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="style/event_details.css">
</head>
  <body>

    <header>
      <div class="d-flex align-items-center justify-content-between">
        <div class="logo">
            <img src="../res/imgs/navi-event-logo(3d).png" alt="Logo">
        </div>

        <div class="pf-dropdown">
          <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="d-flex align-items-center">

                <div class="pf">
                  <div class="profile-icon">
                    <i class="bi bi-person"></i>
                </div>
                <span class="username"><?php echo $_SESSION['username']; ?><Username></span>
                </div>

            </div>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="acount_details.php">Account Details</a></li>
            <li><a class="dropdown-item" href="#">Bookmarks</a></li>
            <li><a class="dropdown-item" href="event_history.html">Event History</a></li>
            <li><a class="dropdown-item" href="pending_evaluation.html">Pending Evaluations</a></li>
            <li><a class="dropdown-item" href="qr_code.html">QR Code</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
      
    </header>

    <nav>
        <div class="nav-links">
            <a href="../index.php">HOME</a>
            <a href="announcement.html">ANNOUNCEMENTS</a>
        </div>
        <div class="box">
            <input type="text" placeholder="Search...">
            <a href="">
                <i class="bi bi-search search-icon"></i>
                <i class="fas fa-search"></i>
            </a>
    </nav>

    <div class="imgcov" style="background-image: url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
      <div class="color-overlay d-flex flex-column justify-content-end align-items-start" style="padding: 20px;">
        <h5><?php echo $_SESSION['start'];?></h5>
        <h1><?php echo $_SESSION['name'];?></h1>
        <h3><?php echo $_SESSION['tagline'];?></h3>
        <button class="bookmark-button">&#128278;</button>
      </div>
    </div>

    <div class="container mb-5">
      <div class="detcon mt-3">
          <div class="event-details">
              <h2>Description</h2>
              <p><?php echo $_SESSION['desc']; ?></p>
          </div>
      </div>
  
      <hr class="my-4">
  
      <h2 class="mb-3">Registration</h2>
  
      <label for="name" class="form-label">Name</label>
      <input id="name" type="text" class="form-control mb-3">
  
      <div class="row">
  
          <div class="col-md-6">
              <label for="course" class="form-label">Course</label>
              <input id="course" type="text" class="form-control mb-3">
          </div>
  
          <div class="col-md-6">
              <label for="year" class="form-label">Year</label>
              <input id="year" type="text" class="form-control mb-3">
          </div>
      </div>
  
      <div class="row">
  
          <div class="col-md-6">
              <label for="age" class="form-label">Age</label>
              <input id="age" type="text" class="form-control mb-3">
          </div>
  
          <div class="col-md-6">
              <label for="id" class="form-label">Student ID Number</label>
              <input id="id" type="text" class="form-control mb-3">
          </div>
      </div>

      <div class="reg-btn mt-3">
        <button type="button" class="btn">REGISTER</button>
      </div>
  </div>
  

      <footer>
        <div class="footer-bottom">
            <div class="logo">
                <img src="../res/imgs/navi-event-logo(3d).png" alt="Logo" class="footer-logo">
            </div>
            <p>© 2023 NavEnt. A Saint Louis University Company. All Rights Reserved. CS Slot Org ™</p>
        </div>
    </footer>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

  </body>
</html>