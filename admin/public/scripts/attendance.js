const oneTimeDiv = document.getElementById('onetime');
const ampmDiv = document.getElementById('ampm');
const seriesDiv = document.getElementById('series');
const missingTypeMsg = document.getElementById('none');
const oneTimeTitle = document.querySelector('#oneTimeTitle')
const oneTimeTagline = document.querySelector('#oneTimeTagline')
const oneTimeDesc = document.querySelector('#oneTimeDesc');
const oneTimeVenue = document.querySelector('#oneTimeVenue');
const oneTimeDate = document.querySelector('#oneTimeDate');
const oneTimeTable = document.querySelector('table#oneTimeTable tbody');
const ampmTitle = document.querySelector('#ampmTitle')
const ampmTagline = document.querySelector('#ampmTagline')
const ampmDesc = document.querySelector('#ampmDesc');
const venueAM = document.querySelector('#venueAM');
const venuePM = document.querySelector('#venuePM');
const ampmTable = document.querySelector('table#ampmTable tbody');
const seriesTitle = document.querySelector('#seriesTitle')
const seriesTagline = document.querySelector('#seriesTagline')
const seriesDesc = document.querySelector('#seriesDesc');
const seriesContainer = document.querySelector('.seriesContainer')
const toHomeBtn = document.querySelector('.toHome')
const logoutBtn = document.querySelector('.logout-btn');
const urlParams = new URLSearchParams(window.location.search)
var eventID = urlParams.get('eventID')

document.addEventListener('DOMContentLoaded', function () {
    fetch(`/search/${eventID}`)
    .then(response => response.json())
    .then(data => {
      loadEvent(data['data'])
    })
    .catch(error => console.error("Error fetching data:", error)); 
})


logoutBtn.addEventListener('click', function(e) {
  e.preventDefault();
  fetch('/logout', {
    method: 'GET',
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      console.log('Logout successful');
      window.location.href = '/';
    } else {
      console.error('Logout failed');
    }
  })
  .catch(error => {
    console.error('Error during logout:', error);
  });
});


toHomeBtn.addEventListener('click', function(e) {
    console.log('home clicked')
    window.location.href = '/';
})


function loadEvent(data) {
    console.log(data)
    switch (data[0].Event_Type) {
        case "OneTime":
            ampmDiv.style.display = 'none';
            seriesDiv.style.display = 'none';
            oneTimeTitle.innerHTML = data[0].Event_Name
            oneTimeTagline.innerHTML = data[0].Event_Tagline
            oneTimeDesc.innerHTML = data[0].Event_Description
            oneTimeDate.innerHTML =  new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(new Date(data[0].Event_StartDate))
            loadOneTime(eventID)
            break;
        case "AM/PM":
            oneTimeDiv.style.display = 'none';
            seriesDiv.style.display = 'none';
            ampmTitle.innerHTML = data[0].Event_Name
            ampmTagline.innerHTML = data[0].Event_Tagline
            ampmDesc.innerHTML = data[0].Event_Description
            ampmDate.innerHTML =  new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(new Date(data[0].Event_StartDate))
            loadAMPM(eventID)
            break;
        case "Series":
            oneTimeDiv.style.display = 'none';
            ampmDiv.style.display = 'none';
            seriesTitle.innerHTML = data[0].Event_Name
            seriesTagline.innerHTML = data[0].Event_Tagline
            seriesDesc.innerHTML = data[0].Event_Description
            loadSeries(eventID)
            break;
        default:
            oneTimeDiv.style.display = 'none';
            ampmDiv.style.display = 'none';
            seriesDiv.style.display = 'none';
            missingTypeMsg.innerHTML = "Attendance record is unavailable. Please set an attendance type for this event first."
            break;
    }
}

async function loadOneTime(ID){
    const oneTimeData = await getAttendanceDetails("onetime", ID)
    console.log("Received data:", oneTimeData);
    oneTimeVenue.innerHTML = oneTimeData[0].Venue
    const registrants  = await getRegistrants(ID)
    console.log(registrants)

    if (!registrants || registrants.length === 0) {
        oneTimeTable.innerHTML = "<tr><td class='no-data' colspan='2'>No Participants Yet</td></tr>";
        return;
    }

    let tableHTML = ""
    registrants.forEach(function ({User_ID, Name}){
        tableHTML += "<tr>"
        tableHTML += `<td>${Name}</td>`
        tableHTML += `<td class=${ID} id=${User_ID}></td>`
        tableHTML += "</tr>"
    })
    oneTimeTable.innerHTML = tableHTML
}

async function loadAMPM(ID){
    const AMPMData = await getAttendanceDetails("ampm", ID)
    console.log("Received data:", AMPMData);
    venueAM.innerHTML = "AM Session Venue: " + AMPMData[0].AM_Venue
    venuePM.innerHTML = "PM Session Venue: " + AMPMData[0].PM_Venue
    const registrants  = await getRegistrantsAMPM(ID)
    console.log(registrants)

    if (!registrants || registrants.length === 0) {
        ampmTable.innerHTML = "<tr><td class='no-data' colspan='3'>No Participants Yet</td></tr>";
        return;
    }

    let tableHTML = ""
    registrants.forEach(function ({User_ID, Name}){
        tableHTML += "<tr>"
        tableHTML += `<td>${Name}</td>`
        tableHTML += `<td class=${ID} id=${User_ID}></td>`
        tableHTML += "</tr>"
    })
    ampmTable.innerHTML = tableHTML
}

async function loadSeries(ID){
    const seriesData = await getAttendanceDetails("series", ID)
    console.log("Received data:", seriesData);
    var seriesCount = seriesData.length

    let containerHTMl = ""
    for (var i = 0; i < seriesCount; i++){
        let date = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(new Date(seriesData[i].Date))
        containerHTMl += `<div class=series${i+1}>`
        containerHTMl += `<h3>${seriesData[i].Series_Name}</h3>`
        containerHTMl += `<p id="seriesVenue${i}">${seriesData[i].Venue}</p>`
        containerHTMl += `<div class="row">
                            <div class="col-10"></div>
                            <div class="col-2 text-right">
                                <p class="date${i+1}">${date}</p>
                                </div>
                        </div>`
        containerHTMl += `<div class="table-responsive">
                            <table class="table table-striped table-hover" id="seriesTable${i+1}">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col">Participant</th>
                                        <th scope="col">In Time</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                             </table>
                        </div>`
        containerHTMl += "</div>"
    }

    seriesContainer.innerHTML = containerHTMl

    const registrants  = await getRegistrantsSeries(ID)
    console.log("Registrants: ", registrants)
    let seriesTable = ''
    for (var j = 1; j <= seriesCount; j++){
        seriesTable = document.querySelector(`table#seriesTable${j} tbody`);
        if (!registrants || registrants.length === 0) {
            seriesTable.innerHTML = "<tr><td class='no-data' colspan='2'>No Participants Yet</td></tr>";
        } else {
            let tableHTML = ""
            registrants.forEach(function ({User_ID, Name}){
                tableHTML += "<tr>"
                tableHTML += `<td>${Name}</td>`
                tableHTML += `<td class=${ID} id=${User_ID}></td>`
                tableHTML += "</tr>"
            })
            seriesTable.innerHTML = tableHTML
        }
    }
}

function getAttendanceDetails(type, ID){
    console.log("From edit.js: ", type)
    return fetch(`/getAttnDetails/${ID}/${type}`)
        .then(response => response.json())
        .then(data => data['data'])
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
    });
}

function getRegistrants(ID){
    return fetch(`/getRegistrants/${ID}`)
        .then(response => response.json())
        .then(data => data['data'])
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
    });
}

function getRegistrantsAMPM(ID){
    return fetch(`/getRegistrantsAMPM/${ID}`)
        .then(response => response.json())
        .then(data => data['data'])
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
    });
}

function getRegistrantsSeries(ID){
    return fetch(`/getRegistrantsSeries/${ID}`)
        .then(response => response.json())
        .then(data => data['data'])
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error; 
    });
}