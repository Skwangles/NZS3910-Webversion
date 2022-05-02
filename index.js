var holidaysFromInternet = {};
var impactingHolidays = [];
const numOfWorkDays = 17 + 6;
const keyDays = [17, 14, 12, 0];

/**
 * Starts the counting mechanism
 */
function startCount() {
    impactingHolidays = [];
    const date = document.getElementById('startDate').value;
    const region = document.getElementById('region').value;
    let dateObject = new Date(date);
    if (Object.keys(holidaysFromInternet).length === 0) { //Don't need to requery if already populated
        getHolidaysFromInternet().then(calculateKeyDates(dateObject, numOfWorkDays, region, keyDays)); //must wait for function to finish
    } else {
        calculateKeyDates(dateObject, region);
    }
}


/**
 * Calculates the 4 dates needed by engineers
 * @param {*} publicHolidays API object from google calendar
 * @param {*} workingDays 17 + 7 as laid out in NZS3910
 */
function calculateKeyDates(calcDate, workingDays, region, importantDates) {

    var dateValues = [];
    while (workingDays >= 0) {
        if (isWorkingDay(calcDate, publicHolidays, region)) {
            for (let num in importantDates) {
                if (importantDates[num] == workingDays) {
                    dateValues.push(calcDate);
                    break; //Should be a max of 1 importantDate per day   
                }
            }
            workingDays--;
        }
        workingDays.setDate(workingDays.getDate() + 1); //may have issue with 29th feb & 31sts
    }

}


/**
 * Returns boolean whether the nominated date should be counted as a 'working' date
 * @param {Date} startDate Date to check
 * @param {*}} publicHolidays list of all the publicHolidays
 * @param {String} region region selected
 * @returns 
 */
function isWorkingDay(startDate, publicHolidays, region) {
    if (startDate.getDay() % 6 === 0) { //Weekend
        return false;
    }
    if (startDate.prototype.getMonth() == 11 && startDate.prototype.getDate() >= 23) { //Zero indexed values - 24th Dec onwards 
        return false;
    } else if (startDate.prototype.getMonth() == 0 && startDate.prototype.getDate() <= 4) //Zero indexed - before & = to jan 5th
    {
        return false;
    }
    for (const item in publicHolidays) {
        if ((publicHolidays[item].description.includes(region) || publicHolidays[item].description === "Public holiday") && new Date(publicHolidays[item].date) == startDate) {
            //Match is found
            impactingHolidays.push(publicHolidays[item]);
            return false;
        }
    }
    return true;
}





/**
 * Uses api key to fetch the current public holidays
 */
function getHolidaysFromInternet() {

    fetch('https://www.googleapis.com/calendar/v3/calendars/en.new_zealand%23holiday%40group.v.calendar.google.com/events?key=AIzaSyD2Xy5SVR22tomUkKkxKEGMIboLbAO0ATE')
        .then(res => holidaysFromInternet = res.json())
        .catch(error => console.error('Error:', error));
}



/**
 * Turn the API JSON into relevant info
 * @param {*} holidaysJSON From the google calendar API
 */
function parseHolidays(holidaysJSON) {
    Holidays = []
    for (const item in publicHolidays.items) {
        if (publicHolidays.items[item].description.includes("Public holiday")) {
            let dateValue = new Date(holidaysJSON.items[item].start.date);
            if (dateValue.getDay() % 6 === 0) { //Long weekend case
                date.setDate(date.getDate() + (dateValue.getDay() == 0 ? 1 : 2)); //Apparently this may have issues with 29th feb & 31sts
                holidaysJSON.items[item].start.date = date.toDateString();
            }
            Holidays.push({ "summary": holidaysJSON.items[item].summary, "date": holidaysJSON.items[item].start.date, "description": holidaysJSON.items[item].description })
        }
    }
}