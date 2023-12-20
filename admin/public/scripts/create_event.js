const nextBtn = document.querySelector('.button-next')
const eventNameField = document.querySelector('.form-control#eventName')
const eventTagField = document.querySelector('.form-control#tagline')
const eventDescField = document.querySelector('.form-control#description')
const eventTypeRadios = document.querySelectorAll('input[name="eventType"]');
const oneTimeDateField = document.querySelector('.form-control#startDate')
const oneTimeStartField = document.querySelector('.form-control#startTime')
const oneTimeEndField = document.querySelector('.form-control#endTime')
const amPmDateField = document.querySelector('.form-control#ampmDate')
const startAMField = document.querySelector('.form-control#startAM')
const endAMField = document.querySelector('.form-control#endAM')
const startPMField = document.querySelector('.form-control#startPM')
const endPMField = document.querySelector('.form-control#endPM')
const seriesNumberField = document.querySelector('.form-control#seriesNumber')
const publicRadioButton = document.getElementById('true');
const privateRadioButton = document.getElementById('false');
const registrationLinkField = document.querySelector('.form-control#registrationLink')
const evaluationLinkField = document.querySelector('.form-control#evaluationLink')
const registrationCheckbox = document.getElementById('reg-open')


var selectedEventType = ''
var isPublic = ''
var isOpen = ''
var hasUploaded = ''
document.getElementById('seriesNumber').addEventListener('input', generateSeriesFields);

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

$(document).ready(function () {
    $('input[type="checkbox"]').change(function () {
        if ($('#reg-link').prop('checked')) {
            $('#registrationLinkSection').show();
            console.log('External Registration checkbox is checked');
        } else {
            $('#registrationLinkSection').hide();
            registrationLinkField.value = ''
            console.log('External Registration checkbox is not checked');
        }
    });
});

function generateSeriesFields() {
    var seriesNumber = document.getElementById('seriesNumber').value;
    var seriesContainer = document.getElementById('seriesFieldsContainer');
    seriesContainer.innerHTML = '';

    for (var i = 1; i <= seriesNumber; i++) {
        var seriesContainerDiv = document.createElement('div');
        seriesContainerDiv.style.display = 'flex';
        seriesContainerDiv.style.gap = '10px';

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

        startDateContainerDiv.appendChild(startDateLabel)
        startDateContainerDiv.appendChild(startDateInput)
        startContainerDiv.appendChild(startLabel);
        startContainerDiv.appendChild(startInput);
        endContainerDiv.appendChild(endLabel);
        endContainerDiv.appendChild(endInput);

        seriesContainerDiv.appendChild(startDateContainerDiv);
        seriesContainerDiv.appendChild(startContainerDiv);
        seriesContainerDiv.appendChild(endContainerDiv);

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


nextBtn.addEventListener('click', function(e) {
    let eventStartDate;
    let eventEndDate;
    let eventType;
    let oneTimeStart
    let oneTimeEnd
    let startAM
    let endAM
    let startPM
    let endPM
    let seriesStart = []
    let seriesEnd = []

    switch (selectedEventType) {
        case "oneTime":
            eventStartDate = getValidDate(oneTimeDateField.value);
            eventEndDate = eventStartDate;
            eventType = "OneTime";
            oneTimeStart = oneTimeStartField.value
            oneTimeEnd = oneTimeEndField.value
            console.log(oneTimeStart, oneTimeEnd)
            break;
        case "ampm":
            eventStartDate = getValidDate(amPmDateField.value);
            eventEndDate = eventStartDate;
            eventType = "AM/PM";
            startAM = startAMField.value
            endAM = endAMField.value
            startPM = startPMField.value
            endPM = endPMField.value
            console.log(startAM, endAM, startPM, endPM)
            break;
        case "series":
            eventStartDate = getValidDate(document.getElementById('startDate1').value);
            eventEndDate = getValidDate(document.getElementById(`startDate${seriesNumberField.value.trim()}`).value);
            eventType = "Series";
            for (var i = 1; i <= seriesNumberField.value; i++){
                seriesStart.push(document.getElementById(`startTime${i}`).value)
                seriesEnd.push(document.getElementById(`endTime${i}`).value)
            }
            console.log(seriesStart)
            console.log(seriesEnd)
            break;
        default:
            console.log("No type selected")
            break;
    }

    if (eventStartDate === null || eventEndDate === null) {
        console.error('Invalid date format');
        return;
    }

    if(registrationLinkField.value.trim() !== null) {var regisLink = registrationLinkField.value.trim()}

    const eventBody = {
        name : eventNameField.value.trim(),
        tagline : eventTagField.value.trim(),
        desc : eventDescField.value.trim(),
        start : eventStartDate,
        end : eventEndDate,
        type : eventType,
        open : isOpen,
        public : isPublic,
        regis : regisLink,
        eval: evaluationLinkField.value.trim(),
    }
    console.log(JSON.stringify(eventBody))
    
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
                const oneTimeBody = {
                    startTime: oneTimeStart,
                    endTime: oneTimeEnd
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
                    console.log(data);
                    window.location.href = '/create_event_img'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                break;
            case "ampm":
                const amPmBody = {
                    amStart : startAM,
                    amEnd: endPM,
                    pmStart: startPM,
                    pmEnd: endPM
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
                    console.log(data);
                    window.location.href = '/create_event_img'
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                break;
            case "series":
                for (var i = 1; i <= seriesNumberField.value; i++){
                    const seriesBody = {
                        seriesNum: i,
                        startTime: seriesStart[`${i-1}`],
                        endTime: seriesEnd[`${i-1}`]
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
                        console.log(data);
                        window.location.href = '/create_event_img'
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

   
})