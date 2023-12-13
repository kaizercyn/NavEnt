document.addEventListener('DOMContentLoaded', function () {
    // fetch('/getAll')
    // .then(response => response.json)
    // .then(data => console.log(data));
    load([])
})

const ptest = document.querySelector('.contenttest')

function load(data){
    if(data.length === 0){
        ptest.innerHTML = "No data"
    }
}