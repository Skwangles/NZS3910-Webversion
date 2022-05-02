var holidaysFromInternet = {};


/**
 * Calculates the 4 dates needed by engineers
 * @param {*} publicHolidays API object from google calendar
 * @param {*} workingDays 17 + 7 as laid out in NZS3910
 */
function calculateKeyDates(workingDays, region) {


    // const publicHolidays = //API Call to google
    var impactingHolidays = [];
    var importantDates = [];
    while (workingDays >= 0) {
        if (isPublicHoliday(startDate, publicHolidays, region))

    }

}

function startCount() {
    const date = document.getElementById('startDate').value;
    const region = document.getElementById('region').value;
    let dateObject = new Date(date);
    if (Object.keys(holidaysFromInternet).length === 0) { //Don't need to requery if already populated
        getHolidaysFromInternet().then(calculateKeyDates(dateObject, region)); //must wait for function to finish
    } else {
        calculateKeyDates(dateObject, region);
    }
}

function getHolidaysFromInternet() {

    fetch('https://www.googleapis.com/calendar/v3/calendars/en.new_zealand%23holiday%40group.v.calendar.google.com/events?key=AIzaSyD2Xy5SVR22tomUkKkxKEGMIboLbAO0ATE')
        .then(res => holidaysFromInternet = res.json())
        .catch(error => console.error('Error:', error));
}

function isPublicHoliday(startDate, publicHolidays, region) {
    for (const item in publicHolidays.items) {
        if (publicHolidays.items[item].description.includes("Public holiday") && publicHolidays.items[item].description.includes(region))
    }
}