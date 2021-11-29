var idsLoaded = false;
var svgIDs = {
    hrHand: null,
    mnHand: null,
    scHand: null,
    cityName: null,
    WeatherIcon: null,
    Temp: null

}

function GetAllIDs() {
    const main = document.getElementById("main").contentDocument;
    svgIDs.hrHand = main.getElementById('#HourPointer')
    idsLoaded = true;
}

function rotateElement(elementID, angle) {
    //    var element = document.querySelector("#" + elementID);
    (document.querySelector("#" + elementID)).style.transform = "rotate(" + angle + "deg)";
}

function updateTime() {
    // var datetime = tizen.time.getCurrentDateTime(),
    var datetime = new Date(),
        hour = datetime.getHours(),
        minute = datetime.getMinutes(),
        second = datetime.getSeconds();

    // Rotate the hour/minute/second hands
    rotateElement("hand-main-hour", (hour + (minute / 60) + (second / 3600)) * 30);
    rotateElement("hand-main-minute", (minute + second / 60) * 6);
    rotateElement("hand-main-second", second * 6);
}

function bindEvents() {
    // Add an event listener to update the screen immediately when the device wakes up
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) {
            updateTime();
        }
    });

    // Add eventListener to update the screen when the time zone is changed
    tizen.time.setTimezoneChangeListener(function () {
        updateTime();
    });
}


function init() {
//	GetAllIDs();
    bindEvents();

    // Update the watch hands every second
    setInterval(function () {
        updateTime();
    }, 1000);
}

window.onload = init();