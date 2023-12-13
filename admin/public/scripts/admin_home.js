document.addEventListener('DOMContentLoaded', function () {
    fetch('/getEvents')
    .then(response => response.json())
    .then(data => load(data['data']));
})

const table = document.querySelector('table.events tbody')

function load(data){
    console.log("Received data:", data);
    if (!data || data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }
    let tableHTML = "";
    data.forEach(function ({Event_ID, Event_Name, Event_StartDate, Event_EndDate, Participants, Event_Type}) {
        const displayedParticipants = Participants !== undefined ? Participants : 0
        tableHTML += "<tr>"
        tableHTML += `<td>${Event_Name}</td>`
        tableHTML += `<td>${displayedParticipants}</td>`
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
