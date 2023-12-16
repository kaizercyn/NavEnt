<?php
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NavEnt Home</title>
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css">

    <link rel="stylesheet" href="client/style/home.css">
</head>
  <body>

    <header>
        <div class="d-flex align-items-center justify-content-between">
            <div class="logo">
                <img src="res/imgs/navi-event-logo(3d).png" alt="Logo">
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn me-md-2 text-light h-btn" type="button"><a href="client/user_login.html">Login</a></button>
                <button class="btn text-light h-btn" type="button"><a href="client/user_signup.html">Signup</a></button>
              </div>
        </div>
    </header>
   
    <nav>
        <div class="nav-links"> 
            <a href="index.php">HOME</a>
            <a href="announcement.html">ANNOUNCEMENTS</a>
        </div>
        <div class="box">
            <input type="text" placeholder="Search...">
            <a href="">
                <i class="bi bi-search search-icon"></i>
                <i class="fas fa-search"></i>
            </a>
    </nav>

    <div id="featured-events" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#featured-events" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          
        <div class="carousel-inner">
            <?php
                require("php/dbconnection.php");
                $public = 1;
                $open = 1;
                $st = $conn -> prepare("SELECT * FROM EVENTS WHERE isPublic=? and isOpen=?;");
                $st-> bind_param('ii', $public, $open);
                $st-> execute();
                $result= $st->get_result();
                if ($result->num_rows !=0){
                    foreach($result as $row){
                        $rows [] = $row;
                    }  
                }

                $st -> close();
                $result -> close();
                

            ?>
          <div class="carousel-item active ev">
            <img src="res/imgs/event1.jpeg" class="d-block w-100 e-img" alt="event1">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase"></h2>
                <h1 class="display-1 fw-bolder text-capitalize">Event Name</h1>
                <button class="btn btn-primary px-4 py-2 fs-5 mt-5">Read More</button>
              </div>
        </div>
          <div class="carousel-item ev">
            <img src="res/imgs/event2.jpeg" class="d-block w-100 e-img" alt="event2">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase">Tagline</h2>
                <h1 class="display-1 fw-bolder text-capitalize">Event Name</h1>
                <button class="btn btn-primary px-4 py-2 fs-5 mt-5">Read More</button>
              </div>
        </div>
          <div class="carousel-item ev">
            <img src="res/imgs/event2.jpeg" class="d-block w-100 e-img" alt="event3">
            <div class="carousel-caption top-0 mt-4 d-none d-md-block">
                <h2 class="mt-5c fs-3 text-uppercase">Tagline</h2>
                <h1 class="display-1 fw-bolder text-capitalize">Event Name</h1>
                <button class="btn btn-primary px-4 py-2 fs-5 mt-5">Read More</button>
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
          <div class="carousel-item active">
            <div class="container">
              <div class="row">
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
      
          <div class="carousel-item">
            <div class="container">
              <div class="row">
                <div class="col-lg">
                  <div class="card latest-event w-100">
                    <img src="https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event4">
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
                   <img src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event5">
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
                    <img src="https://plus.unsplash.com/premium_photo-1679547202141-82c80e5a99c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event6">
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
          <div class="carousel-item active">
            <div class="container">
              <div class="row">
                <div class="col-lg">
                  <div class="card upcoming-event w-100">
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
                  <div class="card upcoming-event w-100">
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
                  <div class="card upcoming-event w-100">
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
      
          <div class="carousel-item">
            <div class="container">
              <div class="row">
                <div class="col-lg">
                  <div class="card upcoming-event w-100">
                    <img src="https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event4">
                    <div class="card-img-overlay">
                        <h5 class="card-title">Event Name</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text"><small>Date of Event</small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg">
                  <div class="card upcoming-event w-100">
                   <img src="https://images.unsplash.com/photo-1582192730841-2a682d7375f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event5">
                    <div class="card-img-overlay">
                        <h5 class="card-title">Event Name</h5>
                        <p class="card-text">Description</p>
                        <p class="card-text"><small>Date of Event</small></p>
                        <button class="btn btn-primary">Read More</button>
                    </div>
                  </div>
                </div>
                <div class="col-lg">
                  <div class="card upcoming-event w-100">
                    <img src="https://plus.unsplash.com/premium_photo-1679547202141-82c80e5a99c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="card-img" alt="event6">
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  </body>
</html>