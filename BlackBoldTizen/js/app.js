var idsLoaded = false;
var svgIDs = {
    hrHand: null,
    mnHand: null,
    scHand: null,
    timeText: null,
    dateText: null,
    cityName: null,
    WeatherIcon: null,
    Temp: null
};
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function GetAllIDs() {
    const main = document.getElementById("main").contentDocument;
    console.log(main);
    svgIDs.hrHand = document.getElementById('HourPointer');
    svgIDs.mnHand = document.getElementById('MinutePointer');
    svgIDs.scHand = document.getElementById('SecondPointer');
    svgIDs.timeText = document.getElementById("HourText");
    svgIDs.dateText = document.getElementById("DateText");
    console.log(svgIDs.hrHand);
    idsLoaded = true;
}

function rotateElement(elementID, angle) {
    //    var element = document.querySelector("#" + elementID);
    (document.getElementById(elementID)).style.transform = "rotate(" + angle + "deg)";
}

function addZero(val) {
    return (val < 10) ? "0" + val.toString() : val;
}

function updateTime(firstTime = false) {
    // var datetime = tizen.time.getCurrentDateTime(),
    var datetime = new Date(),
        hour = datetime.getHours(),
        minute = datetime.getMinutes(),
        second = datetime.getSeconds();
    if (!idsLoaded) {
        return;
    }
    // Rotate the hour/minute/second hands
    rotateElement("HourPointer", (hour + (minute / 60) + (second / 3600)) * 30);
    rotateElement("MinutePointer", (minute + second / 60) * 6);
    rotateElement("SecondPointer", second * 6);
    if (minute == 0 || firstTime) {
        (svgIDs.timeText).innerHTML = addZero(hour) + ":" + addZero(minute);
    }
    if (hour == 0 || firstTime) {
        (svgIDs.dateText).children[0].innerHTML = addZero(datetime.getDate()) + "/" + months[datetime.getMonth()] + "/" + datetime.getFullYear().toString().slice(-2);
    }
}

function bindEvents() {
    // Add an event listener to update the screen immediately when the device wakes up
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            updateTime();
        }
    });

    // Add eventListener to update the screen when the time zone is changed
    // tizen.time.setTimezoneChangeListener(function () {
    //     updateTime();
    // });
}


function init() {
    // GetAllIDs();
    bindEvents();
    updateTime(true);

    // Update the watch hands every second
    setInterval(function () {
        updateTime();
    }, 1000);
}

window.onload = init();