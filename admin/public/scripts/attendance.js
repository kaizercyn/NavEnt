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
const scanQrButtons = document.querySelectorAll('.btn-scan-qr');
// const addParticipantButtons  = document.querySelectorAll('.btn-add-parti');
const closeModalButtons = document.querySelectorAll('.closeModal');
const addModalButtons = document.querySelectorAll('.btn-addtoRecord');
const urlParams = new URLSearchParams(window.location.search)


var eventID = urlParams.get('eventID')
var eventType = ''
var seriesCount = ''
let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { 
        fps: 10, 
        qrbox: {width: 250, height: 250} 
    },
    false)

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

scanQrButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        document.getElementById('result').innerHTML = ''
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    });
});

// addParticipantButtons.forEach(function (button) {
//     button.addEventListener('click', function () {
//         var partiContainer = document.getElementById('parti')

//         const labelElement = document.createElement('label');
//         labelElement.setAttribute('for', 'userID');
//         labelElement.setAttribute('class', 'form-label');

//         labelElement.textContent = 'Enter ID Number: ';

//         partiContainer.appendChild(labelElement)

//         const inputElement = document.createElement('input');

//         inputElement.id = 'userID';
//         inputElement.type = 'text';
//         inputElement.classList.add('form-control');

//         partiContainer.appendChild(inputElement)

//         // `
//         // <label for="userID" class="form-label">Enter ID Number: </label>
//         // <input id="userID" type="text" class="form-control">
//         // `
//     });
// });

closeModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        html5QrcodeScanner.clear();
    });
});

addModalButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        if(!document.getElementById('participantID').value.trim()){
            document.getElementById('msg').innerHTML = 'Please enter an ID Number.'
        } else {
            console.log("oms")
            // addParticipant(document.getElementById('participantID').value.trim())
        }
    });
});

async function loadEvent(data) {
    console.log(data)
    eventType = data[0].Event_Type
    console.log(eventType)
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
            const oneTimeData = await getAttendanceDetails("onetime", eventID)
            console.log("Received data:", oneTimeData);
            oneTimeVenue.innerHTML = oneTimeData[0].Venue
            loadOneTime()
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
            const AMPMData = await getAttendanceDetails("ampm", eventID)
            console.log("Received data:", AMPMData);
            venueAM.innerHTML = "AM Session Venue: " + AMPMData[0].AM_Venue
            venuePM.innerHTML = "PM Session Venue: " + AMPMData[0].PM_Venue
            loadAMPM()
            break;
        case "Series":
            oneTimeDiv.style.display = 'none';
            ampmDiv.style.display = 'none';
            seriesTitle.innerHTML = data[0].Event_Name
            seriesTagline.innerHTML = data[0].Event_Tagline
            seriesDesc.innerHTML = data[0].Event_Description
            genSeriesTables()
            loadSeries()
            break;
        default:
            oneTimeDiv.style.display = 'none';
            ampmDiv.style.display = 'none';
            seriesDiv.style.display = 'none';
            missingTypeMsg.innerHTML = "Attendance record is unavailable. Please set an attendance type for this event first."
            break;
    }
}

async function loadOneTime(){
    oneTimeTable.innerHTML = ''
    const registrants  = await getRegistrants(eventID)
    console.log(registrants)

    if (!registrants || registrants.length === 0) {
        oneTimeTable.innerHTML = "<tr><td class='no-data' colspan='2'>No Participants Yet</td></tr>";
        return;
    }

    let tableHTML = ""
    registrants.forEach(function ({User_ID, Name, In_Time}){
        
        tableHTML += "<tr>"
        tableHTML += `<td>${Name}</td>`
        if(!In_Time){
            tableHTML += `<td class=${eventID} id=${User_ID}></td>`
        } else {
            tableHTML += `<td class=${eventID} id=${User_ID}>${In_Time}</td>`
        }
        tableHTML += "</tr>"
    })
    oneTimeTable.innerHTML = tableHTML
}

async function loadAMPM(){
    ampmTable.innerHTML = ''
    const registrants  = await getRegistrantsAMPM(eventID)
    console.log(registrants)

    if (!registrants || registrants.length === 0) {
        ampmTable.innerHTML = "<tr><td class='no-data' colspan='3'>No Participants Yet</td></tr>";
        return;
    }

    let tableHTML = ""
    registrants.forEach(function ({User_ID, Name}){
        tableHTML += "<tr>"
        tableHTML += `<td>${Name}</td>`
        tableHTML += `<td class=${eventID} id=${User_ID}></td>`
        tableHTML += "</tr>"
    })
    ampmTable.innerHTML = tableHTML
}

async function genSeriesTables(){
    const seriesData = await getAttendanceDetails("series", eventID)
    console.log("Received data:", seriesData);
    seriesCount = seriesData.length

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
}
async function loadSeries(){
    const registrants  = await getRegistrantsSeries(eventID)
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
                tableHTML += `<td class=${eventID} id=${User_ID}></td>`
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


function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult)
    html5QrcodeScanner.clear()
    addRecord(decodedText)
  }
  
  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
  }


function addRecord(txt){
    const userID = txt.slice(0, -5)
    const eventID = txt.slice(-5)
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toTimeString().split(' ')[0];
    console.log("User ID: " +userID)
    console.log("Event ID: " +eventID)
    console.log('Date:', date);
    console.log('Time:', time);
    const recordBody = {
        Date: date,
        InTime: time,
        user: 2224512,
        event: 10001
    }
    fetch('/addRecord', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(recordBody)
    })
    .then(response => response.json())
    .then(data => {
        handleRecordResult(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
  
function handleRecordResult(data) {
    console.log('Attendance record', data);
    document.getElementById('result').innerHTML = `<h2>${data.data}</h2>`
    switch (eventType) {
        case "OneTime":
            loadOneTime()
            break;
        case "AM/PM":
            loadAMPM()
            break;
        case "Series":
            loadSeries()
            break;
        default:
            break;
    }
}
