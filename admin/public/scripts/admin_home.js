document.addEventListener('DOMContentLoaded', function () {
    fetch('/getEvents')
    .then(response => response.json())
    .then(data => {
        load(data['data'])

        const editBtn = document.querySelector('.btn_edit')
        const announceBtn = document.querySelector('.btn_announce')
        const attendanceBtn = document.querySelector('.btn_attendance')
        
        editBtn.addEventListener('click', function(e) {
            console.log('edit clicked')
            window.location.href = '/edit_event'
        });

        announceBtn.addEventListener('click', function(e) {
            console.log('announce clicked')
            window.location.href = '/post_announce'
        });

        attendanceBtn.addEventListener('click', function(e) {
            console.log('attendance clicked')
            window.location.href = '/event_attendance'
        });
    })
})

const table = document.querySelector('table.events tbody')
const searchBtn = document.querySelector('nav.search a')
const tableTitle = document.querySelector('.table-title')
// const newEventBtn = document.querySelector('.btn crt-btn')
const toHomeBtn = document.querySelector('.toHome')

searchBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('searched clicked')
    const searchValue = document.querySelector('.search-input').value.trim()
    console.log("search val: ", searchValue)
    tableTitle.innerHTML = "Search Results"
    fetch(`/search/${searchValue}`)
    .then(response => response.json())
    .then(data => load(data['data']))
})

// newEventBtn.addEventListener('click', function(e) {
//     console.log('attendance clicked')
//     window.location.href = '/create_event'
        
// })

toHomeBtn.addEventListener('click', function(e) {
    console.log('home clicked')
    window.location.reload();
})

function load(data){
    console.log("Received data:", data);
    if (!data || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }
    let tableHTML = "";
    data.forEach(function ({Event_ID, Event_Name, Event_StartDate, Event_EndDate, Participants, Event_Type}) {
        tableHTML += "<tr>"
        tableHTML += `<td>${Event_Name}</td>`
        tableHTML += `<td>${String(Participants)}</td>` //change in SQL
        tableHTML += `<td>${new Date(Event_StartDate).toLocaleDateString()}</td>`
        tableHTML += `<td>${new Date(Event_EndDate).toLocaleDateString()}</td>`
        tableHTML += `<td>${Event_Type}</td>`
        tableHTML += `<td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" class="btn_edit" data-id=${Event_ID}>Edit</button>
                        <button type="button" class="btn_announce" data-id=${Event_ID}>Announce</button>
                        <button type="button" class="btn_attendance" data-id=${Event_ID}>Attendance</button>
                        </div>
                     </td>`
        tableHTML += "</tr>"
    }) 

    table.innerHTML = tableHTML;
}


