const eventNameField = document.querySelector('.form-control#eventName')
const eventTagField = document.querySelector('.form-control#tagline')
const eventDescField = document.querySelector('.form-control#description')
const eventTypeRadios = document.querySelectorAll('input[name="eventType"]');
const oneTimeDateField = document.querySelector('.form-control#startDate')
const oneTimeStartField = document.querySelector('.form-control#startTime')
const oneTimeEndField = document.querySelector('.form-control#endTime')
const oneTimeVenueField = document.querySelector('.form-control#eventVenue')
const amPmDateField = document.querySelector('.form-control#ampmDate')
const startAMField = document.querySelector('.form-control#startAM')
const endAMField = document.querySelector('.form-control#endAM')
const venueAMField = document.querySelector('.form-control#AMeventVenue')
const startPMField = document.querySelector('.form-control#startPM')
const endPMField = document.querySelector('.form-control#endPM')
const venuePMField = document.querySelector('.form-control#PMeventVenue')
const seriesNumberField = document.querySelector('.form-control#seriesNumber')
const publicRadioButton = document.getElementById('true');
const privateRadioButton = document.getElementById('false');
const evaluationLinkField = document.querySelector('.form-control#evaluationLink')
const otherLinksCheckbox = document.getElementById('other-link')
const registrationCheckbox = document.getElementById('reg-open')
const draftBtn = document.querySelector('.button-save-draft')
const publishBtn = document.querySelector('.button-save-publish')


var selectedEventType = ''
var isPublic = ''
var isOpen = ''
var hasUploaded = ''
var eventPic = ''

document.getElementById('seriesNumber').addEventListener('input', generateSeriesFields);
document.getElementById('linkNumber').addEventListener('input', generateLinkFields);

$(document).ready(function () {
    $('input[name="eventType"]').change(function () {
        $('#oneTimeSection, #ampmSection, #seriesSection').hide();
        if ($('#oneTime').prop('checked')) {
        $('#oneTimeSection').show();
    } else if ($('#ampm').prop('checked')) {
        $('#ampmSection').show();
        } else if ($('#series').prop('checked')) {
            $('#seriesSection').show();
        }
    });
});

$(document).ready(function() {
    $('#other-link').change(function() {
        if (this.checked) {
            $('#externalLinks').show();
        } else {
            $('#externalLinks').hide();
        }
    });
});


function generateLinkFields(){
    var linkNumber = document.getElementById('linkNumber').value
    var linkContainer = document.getElementById('linkFieldsContainer')
    linkContainer.innerHTML = ''

    for (var j = 1; j <= linkNumber; j++) {
        var linkContainerDiv = document.createElement('div')
        linkContainerDiv.style.display = 'flex'
        linkContainerDiv.style.gap = '10px'

        var linkNameContainerDiv = document.createElement('div')
        linkNameContainerDiv.style.flex = '1'

        var linkNameLabel = document.createElement('label');
        linkNameLabel.innerHTML = 'Link Name ' + j;

        var linkNameInput = document.createElement('input');
        linkNameInput.type = 'text';
        linkNameInput.className = 'form-control';
        linkNameInput.id = `linkName${j}`

        var weblinkContainerDiv = document.createElement('div')
        weblinkContainerDiv.style.flex = '1'

        var weblinkLabel = document.createElement('label');
        weblinkLabel.innerHTML = 'Web Link ' + j;

        var weblinkInput = document.createElement('input');
        weblinkInput.type = 'text';
        weblinkInput.className = 'form-control';
        weblinkInput.id = `weblink${j}`

        linkNameContainerDiv.appendChild(linkNameLabel)
        linkNameContainerDiv.appendChild(linkNameInput)
        weblinkContainerDiv.appendChild(weblinkLabel);
        weblinkContainerDiv.appendChild(weblinkInput);

        linkContainerDiv.appendChild(linkNameContainerDiv);
        linkContainerDiv.appendChild(weblinkContainerDiv);

        linkContainer.appendChild(linkContainerDiv);
    }
}


function generateSeriesFields() {
    var seriesNumber = document.getElementById('seriesNumber').value;
    var seriesContainer = document.getElementById('seriesFieldsContainer');
    seriesContainer.innerHTML = '';

    for (var i = 1; i <= seriesNumber; i++) {
        var seriesContainerDiv = document.createElement('div');
        seriesContainerDiv.style.display = 'flex';
        seriesContainerDiv.style.gap = '10px';

        var nameContainerDiv = document.createElement('div');
        nameContainerDiv.style.flex = '1';

        var nameLabel = document.createElement('label');
        nameLabel.innerHTML = 'Name for Series ' + i;

        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.className = 'form-control';
        nameInput.id = `name${i}`

        var startDateContainerDiv = document.createElement('div');
        startDateContainerDiv.style.flex = '1';

        var startDateLabel = document.createElement('label');
        startDateLabel.innerHTML = 'Date for Series ' + i;

        var startDateInput = document.createElement('input');
        startDateInput.type = 'date';
        startDateInput.className = 'form-control';
        startDateInput.id = `startDate${i}`
        
        var startContainerDiv = document.createElement('div');
        startContainerDiv.style.flex = '1';

        var startLabel = document.createElement('label');
        startLabel.innerHTML = 'Start Time for Series ' + i;

        var startInput = document.createElement('input');
        startInput.type = 'time';
        startInput.className = 'form-control';
        startInput.id = `startTime${i}`

        var endContainerDiv = document.createElement('div');
        endContainerDiv.style.flex = '1';

        var endLabel = document.createElement('label');
        endLabel.innerHTML = 'End Time for Series ' + i;

        var endInput = document.createElement('input');
        endInput.type = 'time';
        endInput.className = 'form-control';
        endInput.id = `endTime${i}`

        var venueContainerDiv = document.createElement('div');
        venueContainerDiv.style.flex = '1';

        var venueLabel = document.createElement('label');
        venueLabel.innerHTML = 'Event Venue for Series ' + i;

        var venueInput = document.createElement('input');
        venueInput.type = 'text';
        venueInput.className = 'form-control';
        venueInput.id = `venue${i}`

        nameContainerDiv.appendChild(nameLabel)
        nameContainerDiv.appendChild(nameInput)
        startDateContainerDiv.appendChild(startDateLabel)
        startDateContainerDiv.appendChild(startDateInput)
        startContainerDiv.appendChild(startLabel);
        startContainerDiv.appendChild(startInput);
        endContainerDiv.appendChild(endLabel);
        endContainerDiv.appendChild(endInput);
        venueContainerDiv.appendChild(venueLabel);
        venueContainerDiv.appendChild(venueInput);

        seriesContainerDiv.appendChild(nameContainerDiv);
        seriesContainerDiv.appendChild(startDateContainerDiv);
        seriesContainerDiv.appendChild(startContainerDiv);
        seriesContainerDiv.appendChild(endContainerDiv);
        seriesContainerDiv.appendChild(venueContainerDiv);

        seriesContainer.appendChild(seriesContainerDiv);
    }

}

eventTypeRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) {
            selectedEventType = this.id
            console.log(`Selected event type: ${selectedEventType}`);
      }
    });
});

publicRadioButton.addEventListener('change', function() {
    if (this.checked) {
      isPublic = true;
      console.log('Is Public:', isPublic);
    }
});

privateRadioButton.addEventListener('change', function() {
    if (this.checked) {
        isPublic = false;
        console.log('Is Public:', isPublic);
    }
});

registrationCheckbox.addEventListener('change', function() {
    if (registrationCheckbox.checked) {
      isOpen = true
      console.log('Checkbox is checked. Open for Registration!');
    } else {
      isOpen = false
      console.log('Checkbox is unchecked. Registration closed.');
    }
})


function getValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(dateString)) {
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; 
        const day = parseInt(dateParts[2]);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        }
    }
    return null;
}

const inputElement = document.getElementById('eventImage');
inputElement.addEventListener('change', (event) => {
    eventPic = event.target.files[0]; // Get the selected file

    if (eventPic && eventPic.type.startsWith('image/')) {
    console.log('Image uploaded:', eventPic);
    } else {
    console.log('Please upload an image file.');
    }
});

function getEventBody(){
    let eventStartDate
    let eventEndDate
    let eventType

    switch (selectedEventType) {
        case "oneTime":
            eventStartDate = getValidDate(oneTimeDateField.value);
            eventEndDate = eventStartDate;
            eventType = "OneTime";
            break;
        case "ampm":
            eventStartDate = getValidDate(amPmDateField.value);
            eventEndDate = eventStartDate;
            eventType = "AM/PM";
            break;
        case "series":
            eventStartDate = getValidDate(document.getElementById('startDate1').value);
            eventEndDate = getValidDate(document.getElementById(`startDate${seriesNumberField.value.trim()}`).value);
            eventType = "Series";
            break;
        default:
            console.log("No type selected")
            break;
    }

    if (eventStartDate === null || eventEndDate === null) {
        console.error('Invalid date format');
        return;
    }

    const eventBody = {
        name : eventNameField.value.trim(),
        tagline : eventTagField.value.trim(),
        desc : eventDescField.value.trim(),
        start : eventStartDate,
        end : eventEndDate,
        type : eventType,
        open : isOpen,
        public : isPublic,
        eval: evaluationLinkField.value.trim(),
    }

    console.log(JSON.stringify(eventBody))
    
    return eventBody
}

draftBtn.addEventListener('click', function(e) {
    const eventBody = getEventBody()
    eventBody.live = false
    console.log(JSON.stringify(eventBody))
    sendToServer(eventBody)
})

publishBtn.addEventListener('click', function(e) {
    const eventBody = getEventBody()
    eventBody.live = true
    console.log(JSON.stringify(eventBody))
    sendToServer(eventBody)
})

function sendToServer(eventBody){
    fetch('/addEvent', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(eventBody)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        switch (selectedEventType) {
            case "oneTime":
                let oneTimeStart = oneTimeStartField.value
                let oneTimeEnd = oneTimeEndField.value
                let oneTimeVenue = oneTimeVenueField.value
                console.log(oneTimeStart, oneTimeEnd, oneTimeVenue)
                const oneTimeBody = {
                    startTime: oneTimeStart,
                    endTime: oneTimeEnd,
                    venue: oneTimeVenue
                }
                fetch('/oneTime', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(oneTimeBody)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('One Time details uploaded', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                break;
            case "ampm":
                let startAM = startAMField.value
                let endAM = endAMField.value
                let venueAM = venueAMField.value
                let startPM = startPMField.value
                let endPM = endPMField.value
                let venuePM = venuePMField.value
                console.log(startAM, endAM, venueAM, startPM, endPM, venuePM)
                const amPmBody = {
                    amStart : startAM,
                    amEnd: endPM,
                    amVenue: venueAM,
                    pmStart: startPM,
                    pmEnd: endPM,
                    pmVenue: venuePM
                }
                fetch('/amPm', {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(amPmBody)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('AM/PM details uploaded', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                break;
            case "series":
                let seriesName = []
                let seriesStart = []
                let seriesEnd = []
                let seriesVenue = []
                for (var i = 1; i <= seriesNumberField.value; i++){
                    seriesName.push(document.getElementById(`name{i}`))
                    seriesStart.push(document.getElementById(`startTime${i}`).value)
                    seriesEnd.push(document.getElementById(`endTime${i}`).value)
                    seriesVenue.push(document.getElementById(`venue${i}`).value)
                }
                console.log(seriesStart)
                console.log(seriesEnd)
                console.log(seriesVenue)

                for (var i = 1; i <= seriesNumberField.value; i++){
                    const seriesBody = {
                        seriesNum: i,
                        seriesName:seriesName[`${i-1}`],
                        startTime: seriesStart[`${i-1}`],
                        endTime: seriesEnd[`${i-1}`],
                        venue: seriesVenue[`${i-1}`]
                    }
                    fetch('/series', {
                        headers: {
                            'Content-type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(seriesBody)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Series details uploaded', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
                break;
            default:
                console.log("No type selected")
                break;
        }
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}