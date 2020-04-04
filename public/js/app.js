function GetLocation(address) {
    message1.textContent = 'Loading weather...';
    message2.textContent = '';

    fetch(`/weather?address=${address}`).then((res) => {
    res.json().then((responseBody) => {
        if(responseBody.error)
        {
            debugger;
            message1.textContent = responseBody.error;
        }
        else
        {
            message1.textContent = responseBody.location
            message2.textContent = responseBody.forecast
        }
    });
});
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (event)=> {
    event.preventDefault(); //prevent refresh the browser
    var location = search.value;
    GetLocation(location);
});