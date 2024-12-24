window.onload = () => {
    document.querySelector('#calculate').onclick = startCountdown;
    document.querySelector('#reset').onclick = resetCountdown;
}

let endTime = null; // Global variable to store end time
let interval = null; // Global variable to store interval reference

function startCountdown() {
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
    endTime = new Date(date + " " + time);

    updateCountdown(); // Initial update

    interval = setInterval(updateCountdown, 1000); // Update every second

    // Stop button event listener
    document.querySelector('#stop').addEventListener('click', () => {
        clearInterval(interval);
    });
}

function updateCountdown() {
    const currentTime = new Date();
    const daysElement = document.querySelector('#countdown-days');
    const hoursElement = document.querySelector('#countdown-hours');
    const minutesElement = document.querySelector('#countdown-minutes');
    const secondsElement = document.querySelector('#countdown-seconds');

    if (endTime > currentTime) {
        let timeLeft = (endTime - currentTime) / 1000;

        daysElement.innerText = Math.floor(timeLeft / (24 * 60 * 60));
        hoursElement.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
        minutesElement.innerText = Math.floor((timeLeft / 60) % 60);
        secondsElement.innerText = Math.floor(timeLeft % 60);
    } else {
        daysElement.innerText = 0;
        hoursElement.innerText = 0;
        minutesElement.innerText = 0;
        secondsElement.innerText = 0;

        clearInterval(interval); // Stop the countdown when endTime is reached
    }
}

function resetCountdown() {
    clearInterval(interval); // Clear any existing interval
    endTime = null; // Reset endTime
    // Reset countdown display
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}





































































