<?php 
$userAccount = $_SESSION["username"];
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NavEnt Home</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="client/style/logged_home.css">
</head>
  <body>

    <header>
      <div class="d-flex align-items-center justify-content-between">
        <div class="logo">
            <img src="res/imgs/navi-event-logo(3d).png" alt="Logo">
        </div>

        <div class="pf-dropdown">
          <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="d-flex align-items-center">

                <div class="pf">
                  <div class="profile-icon">
                    <i class="bi bi-person"></i>
                </div>
                <span class="username"><?php echo $userAccount ?></span>
                </div>

            </div>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="client/account_details.php">Account Details</a></li>
            <li><a class="dropdown-item" href="client/bookmarked_events.html">Bookmarks</a></li>
            <li><a class="dropdown-item" href="client/event_history.html">Event History</a></li>
            <li><a class="dropdown-item" href="client/pending_evaluation.html">Pending Evaluations</a></li>
            <li><a class="dropdown-item" href="client/qr_code.html">QR Code</a></li>
            <li><hr class="dropdown-divider"></li>
            <li>
            <form action="php\logoutfunctions.php" method="POST"><button type="submit" class="dropdown-item" onclick="return confirm('Are you sure you want to logout?')">Logout</button></form></li>
          </ul>
        </div>
      </div>
      
    </header>

    <nav>
        <div class="nav-links">
            <a href="../index.php">HOME</a>
            <a href="client/announcement.html">ANNOUNCEMENTS</a>
        </div>
        <div class="box">
            <input type="text" placeholder="Search...">
            <a href="">
                <i class="bi bi-search search-icon"></i>
                <i class="fas fa-search"></i>
            </a>
    </nav>
    <?php
    require("php/dbconnection.php");
    $public = 1;
    $open = 1;
    $st = $conn -> prepare("SELECT * FROM EVENTS WHERE isPublic=? and isOpen=?");
    $st-> bind_param('ii', $public, $open);
    $st-> execute();
    $result= $st->get_result();
    if ($result->num_rows !=0){
    $events = $result->fetch_all(MYSQLI_ASSOC);
    }
    $st -> close();
    $result -> close();      
 ?>  

    <div id="featured-events" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          
        <div class="carousel-inner">
          <div class="carousel-item active ev">
            <?php
            $event = array_shift($events);
            ?>
            <img src="res/imgs/event1.jpeg" class="d-block w-100 e-img" alt="event1">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase"><?php echo $event['Event_Tagline']; ?></h2>
                <h1 class="display-1 fw-bolder text-capitalize"><?php echo $event['Event_Name']; ?></h1>
                <form action="client/event_details.php" method="POST">
                <input type="hidden" name="event" value="<?php echo $event['Event_ID'];  ?>">
                <button type="submit" class="btn btn-primary px-4 py-2 fs-5 mt-5" name="readMore">Read More</button>
                </form>
              </div>
        </div>
          <div class="carousel-item ev">
            <?php 
            $event1 = array_shift($events);
            ?>
            <img src="res/imgs/event2.jpeg" class="d-block w-100 e-img" alt="event2">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase"><?php echo $event1['Event_Tagline']; ?></h2>
                <h1 class="display-1 fw-bolder text-capitalize"><?php echo $event1['Event_Name']; ?></h1>
                <form action="client/event_details.php" method="POST">
                <input type="hidden" name="event" value="<?php echo $event1['Event_ID'];  ?>">
                <button type="submit" class="btn btn-primary px-4 py-2 fs-5 mt-5" name="readMore">Read More</button>
                </form>
              </div>
        </div>
          <div class="carousel-item ev">
            <?php
            $event2 = array_shift($events);
            ?>
            <img src="res/imgs/event3.jpeg" class="d-block w-100 e-img" alt="event3">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase"><?php echo $event2['Event_Tagline']; ?></h2>
                <h1 class="display-1 fw-bolder text-capitalize"><?php echo $event2['Event_Name']; ?></h1>
                <form action="client/event_details.php" method="POST">
                <input type="hidden" name="event" value="<?php echo $event2['Event_ID'];  ?>">
                <button type="submit" class="btn btn-primary px-4 py-2 fs-5 mt-5" name="readMore">Read More</button>
                </form>
              </div>
        </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#featured-events" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#featured-events" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
      <div class="container events-container">
    <section id="packages" class="pt-3 pb-3">
        <h1 class="text-center my-3">Latest Events</h1>
    </section>
      
    <div id="latestEventsSlider" class="carousel slide" data-bs-ride="false">
    <div class="carousel-inner">
        <?php
        require("php/dbconnection.php");
        $st = $conn->prepare("SELECT * FROM events ORDER BY Event_StartDate");
        $st->execute();
        $result = $st->get_result();
        $eventCount = 0;
        $eventsPerSlide = 3;
        while ($row = $result->fetch_assoc()) {
            if ($eventCount % $eventsPerSlide === 0) {
                $active = ($eventCount === 0) ? 'active' : '';
                echo '<div class="carousel-item ' . $active . '"><div class="container"><div class="row">';
            }
            ?>
            <div class="col-lg">
                <div class="card latest-event w-100">
                    <!-- <img src="<?php //echo $row['Event_PicFilePath']; ?>" class="card-img" alt="<?php //echo $row['Event_Name']; ?>"> -->
                    <div class="card-img-overlay">
                        <h5 class="card-title text-black"><?php echo $row['Event_Name']; ?></h5>
                        <p class="card-text text-black"><?php echo $row['Event_Tagline']; ?></p>
                        <p class="card-text"><small class="text-black">Date of Event: <?php echo $row['Event_StartDate']; ?></small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                </div>
            </div>
            <?php
            $eventCount++;
            if ($eventCount % $eventsPerSlide === 0 || $eventCount === $result->num_rows) {
                echo '</div></div></div>';
            }
        }
        $st->close();
        $result->close();
        ?>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#latestEventsSlider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#latestEventsSlider" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

      <script>
        const latestEventsSlider = new bootstrap.Carousel(document.getElementById('latestEventsSlider'), {
          interval: false,
        });
      </script>
      
    <section id="packages" class="pt-3 pb-3">
        <h1 class="text-center my-3">Upcoming Events</h1>
    </section>

    <div id="upcomingEventsSlider" class="carousel slide" data-bs-ride="false">
    <div class="carousel-inner">
        <?php
        require("php/dbconnection.php");
        $public = 1;
        $open = 1;
        $st = $conn->prepare("SELECT * FROM events WHERE isPublic=? AND isOpen=? ORDER BY Event_StartDate DESC");
        $st->bind_param('ii', $public, $open);
        $st->execute();
        $result = $st->get_result();
        $eventCount = 0;
        while ($row = $result->fetch_assoc()) {
            if ($eventCount % 2 === 0) {
                $active = ($eventCount === 0) ? 'active' : '';
                echo '<div class="carousel-item ' . $active . '">';
                echo '<div class="container"><div class="row">';
            }
            ?>
            <div class="col-lg-6">
                <div class="card upcoming-event w-100">
                    <!-- <img src="<?php //echo $row['Event_PicFilePath']; ?>" class="card-img" alt="<?php //echo $row['Event_Name']; ?>"> -->
                    <div class="card-img-overlay">
                        <h5 class="card-title text-black"><?php echo $row['Event_Name']; ?></h5>
                        <p class="card-text text-black"><?php echo $row['Event_Description']; ?></p>
                        <p class="card-text text-black"><small>Date of Event: <?php echo $row['Event_StartDate']; ?></small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                </div>
            </div>
            <?php
            $eventCount++;
            if ($eventCount % 2 === 0 || $eventCount === $result->num_rows) {
                echo '</div></div></div>';
            }
        }
        $st->close();
        $result->close();
        ?>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#upcomingEventsSlider" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#upcomingEventsSlider" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>




      <script>
        const upcomingEventsSlider = new bootstrap.Carousel(document.getElementById('upcomingEventsSlider'), {
        interval: false,
        });
      </script>
      
      </div>

      <footer>
        <div class="footer-bottom">
            <div class="logo">
                <img src="res/imgs/navi-event-logo(3d).png" alt="Logo" class="footer-logo">
            </div>
            <p>© 2023 NavEnt. A Saint Louis University Company. All Rights Reserved. CS Slot Org ™</p>
        </div>
    </footer>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>

  </body>
</html>