const oneTimeVenueField = document.getElementById('eventVenue')
const venueAMField = document.getElementById('AMeventVenue')
const venuePMField = document.getElementById('PMeventVenue')

function getValues() {
    let eventStartDate
    let eventEndDate
    let eventType
    let oneTimeStart
    let oneTimeEnd
    let oneTimeVenue
    let startAM
    let endAM
    let venueAM
    let startPM
    let endPM
    let venuePM
    let seriesStart = []
    let seriesEnd = []
    let seriesVenue = []

    switch (selectedEventType) {
        case "oneTime":
            eventStartDate = getValidDate(oneTimeDateField.value);
            eventEndDate = eventStartDate;
            eventType = "OneTime";
            oneTimeStart = oneTimeStartField.value
            oneTimeEnd = oneTimeEndField.value
            oneTimeVenue = 
            console.log(oneTimeStart, oneTimeEnd, oneTimeVenue)
            break;
        case "ampm":
            eventStartDate = getValidDate(amPmDateField.value);
            eventEndDate = eventStartDate;
            eventType = "AM/PM";
            startAM = startAMField.value
            endAM = endAMField.value
            venueAM = venueAMField.value
            startPM = startPMField.value
            endPM = endPMField.value
            venuePM = venuePMField.value
            console.log(startAM, endAM, venueAM, startPM, endPM, venuePM)
            break;
        case "series":
            eventStartDate = getValidDate(document.getElementById('startDate1').value);
            eventEndDate = getValidDate(document.getElementById(`startDate${seriesNumberField.value.trim()}`).value);
            eventType = "Series";
            for (var i = 1; i <= seriesNumberField.value; i++){
                seriesStart.push(document.getElementById(`startTime${i}`).value)
                seriesEnd.push(document.getElementById(`endTime${i}`).value)
                seriesVenue.push(document.getElementById(`venue${i}`).value)
            }
            console.log(seriesStart)
            console.log(seriesEnd)
            console.log(seriesVenue)
            break;
        default:
            console.log("No type selected")
            break;
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
        regis : regisLink,
        pic: getImage(),
        eval: evaluationLinkField.value.trim(),
    }

    console.log(JSON.stringify(eventBody))
}

function getImage(){
    const fileInput = document.getElementById('eventImage');

    fileInput.addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        const base64 = await convertToBase64(file);
    }
    });

    return base64
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}