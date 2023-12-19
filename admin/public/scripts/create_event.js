const publishBtn = document.querySelector('.button-save-publish')
const saveDraftBtn = document.querySelector('.button-save-draft')
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
const eventImgForm = document.getElementById('uploadForm')
const uploadBtn = document.querySelector('.button-upload')
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
            isOpen = true
        console.log('Open for Registration checkbox is checked');
        } else {
            $('#registrationLinkSection').hide();
            isOpen = false
            registrationLinkField.value = ''
            console.log('Open for Registration checkbox is not checked');
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
        startInput.id = `endTime${i}`

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


function getValidDate(dateString) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(dateString)) {
        const dateParts = dateString.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // Months are zero-based in JS Date
        const day = parseInt(dateParts[2]);

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            const date = new Date(year, month, day);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split('T')[0];
            }
        }
    }
    return null; // Invalid date
}

eventImgForm.addEventListener('submit', async function(e) {
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = "File uploaded"
})

saveDraftBtn.addEventListener('click', function(e) {
    let eventStartDate;
    let eventEndDate;
    let eventType;

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
        live : false,
        regis : regisLink,
        eval: evaluationLinkField.value.trim(),
    }

    const oneTimeBody = {}
    const amPmBody = {}
    const seriesBody = {}


    console.log(JSON.stringify(eventBody))
    // fetch('/addEvent', {
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(requestBody)
    // })
})