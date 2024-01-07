<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event History</title>
 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="style/event_history.css">
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
                  <div class="profile-box">
                      <div class="pf">
                        <div class="profile-icon">
                          <i class="bi bi-person"></i>
                      </div>
                      <span class="username">John Doe</span>
                      
                      </div>
              </div>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="account_details.html">Account Details</a></li>
              <li><a class="dropdown-item" href="bookmarked_events.html">Bookmarks</a></li>
              <li><a class="dropdown-item" href="event_history.html">Event History</a></li>
            <li><a class="dropdown-item" href="pending_evaluation.html">Pending Evaluations</a></li>
            <li><a class="dropdown-item" href="qr_code.html">QR Code</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">
                <form action="logout.php" method="post"><button type="submit" class="dropdown-item" onclick="return confirm('Are you sure you want to logout?')">Logout</button></form></a></li>
            </ul>
          </div>
        </div>
        
      </header>

    <nav>
        <div class="nav-links">
            <a href="home.php">HOME</a>
        </div>
    </nav>

    <section id="packages" class="pt-3 pb-3 custom-left-padding">
        <h2 class="text-left my-3">Event History</h2>
    </section>

    <div id="latestEventsSlider" class="carousel slide" data-bs-ride="false">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="container">
                <div class="col-lg">
                  <div class="card latest-event w-100">
                    <img src="https://images.unsplash.com/photo-1560439514-07abbb294a86?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event4">
                    <div class="card-img-overlay">
                        <h5 class="card-title">Event Name</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text"><small>Date of Event</small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg">
                  <div class="card latest-event w-100">
                    <img src="https://images.unsplash.com/photo-1559223694-98ed5e272fef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event5">
                    <div class="card-img-overlay">
                        <h5 class="card-title">Event Name</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text"><small>Date of Event</small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg">
                  <div class="card latest-event w-100">
                    <img src="https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event6">
                    <div class="card-img-overlay">
                        <h5 class="card-title">Event Name</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text"><small>Date of Event</small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
            </div>
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