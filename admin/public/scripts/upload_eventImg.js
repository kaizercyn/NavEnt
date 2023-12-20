const eventImgForm = document.getElementById('uploadForm')
const uploadBtn = document.querySelector('.button-upload')
const draftBtn = document.querySelector('.button-save-draft')
const publishBtn = document.querySelector('.button-save-publish')
eventImgForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    
    var formData = new FormData(this); // Capture form data
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // If successful, parse response as JSON
        }
        throw new Error('Network response was not ok.');
    })
    .then(data => {
        console.log('Upload successful:', data);
        // You can perform any UI updates or additional logic here
    })
    .catch(error => {
        console.error('There was an error with the upload:', error);
        // Handle errors or display an error message to the user
    });
    uploadBtn.disabled = true;
    uploadBtn.innerHTML = "File uploaded"
})

draftBtn.addEventListener('click', function(e) {
    const req = {
        isLive: false
    }
    fetch('/changeLive', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(req)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = '/admin_home'
    })
    .catch(error => {
        console.error('Error:', error);
    });
})

publishBtn.addEventListener('click', function(e) {
    const req = {
        isLive: true
    }
    fetch('/changeLive', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(req)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = '/admin_home'
    })
    .catch(error => {
        console.error('Error:', error);
    });
})