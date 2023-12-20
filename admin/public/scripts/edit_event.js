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

