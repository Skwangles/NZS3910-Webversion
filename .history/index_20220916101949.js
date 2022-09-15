let holidaysFromInternet = {};
let impactingHolidays = [];
let dateValues = [];
const numOfWorkDays = 17 + 8; //Day 0 included
let cal = ics();
const keyDays = [{ "days": 7, "desc": "Engineer issue Progress Payment Schedule" },
    { "days": 10, "desc": "Principal advise amendments/deductions" },
    { "days": 12, "desc": "Engineer issue replacement Schedule (if applicable)" },
    { "days": 24, "desc": "Principal makes payment" }
];
const calcLog = document.getElementById('calculations');
const startDateItems = document.getElementById('startDate');
const regionSelect = document.getElementById('region')
const regionStorage = "";



$(document).ready(function() {
    startDateItems.valueAsDate = new Date();
    $("#submitForm").click(function() {
        let datastring = JSON.parse(JSON.stringify(jQuery('#dateSelect').serializeArray()));
        startCount(datastring[1].value, datastring[0].value); //0-region, 1-date
    });
});

function downloadICS() {
    cal.download("NZS3910-Contractor-Claims");
}


/**
 * Starts calculating the working days from the selected date
 * @param {DateString} startDate 
 * @param {string} region 
 */
function startCount(date, region) {
    if (date == "" || typeof date == undefined || region == "" || typeof region == undefined) //Input checking
        return; //Doesn't have all info

    cursor_wait();
    calcLog.innerHTML = "<h3>Calculation Breakdown:</h3>";
    impactingHolidays = []; //must clear otherwise will have overlapping
    let dateObject = new Date(date);
    if (Object.keys(holidaysFromInternet).length === 0) { //Don't need to requery if already populated
        new Promise((resolve, reject) => {
                try{    
                $.getJSON('https://www.googleapis.com/calendar/v3/calendars/en.new_zealand%23holiday%40group.v.calendar.google.com/events?key=AIzaSyD2Xy5SVR22tomUkKkxKEGMIboLbAO0ATE', (data) => {
                    console.log(data)
                    resolve(data);
                });
            }
            catch(err){
                reject(err);
            }

            }).then(value => {
                holidaysFromInternet = parseHolidays(value)
                calculateKeyDates(dateObject, region, keyDays)
            })
            .catch(error => {
                console.log(error);
                remove_cursor_wait();
            }); //must wait for function to finish
    } else {
        calculateKeyDates(dateObject, region, keyDays);
    }
}


/**
 * Calculates the 4 dates needed by engineers
 * @param {*} publicHolidays API object from google calendar
 * @param {*} workingDays 17 + 7 as laid out in NZS3910
 */
function calculateKeyDates(calcDate, region, importantDates) {
    let increment = 0;

    dateValues = [];
    while (increment < numOfWorkDays) {
        calcLog.innerHTML += "<br>";

        if (isWorkingDay(calcDate, region)) {
            calcLog.innerHTML += "Day #: <b>" + (increment) + "</b>";
            calcLog.innerHTML += " " + calcDate.toDateString();

            for (let num in importantDates) {
                if (importantDates[num].days === increment) {
                    console.log(num + " Trigger:" + importantDates[num].days + " " + calcDate)
                    dateValues.push({
                        "date": calcDate.toDateString(),
                        "desc": importantDates[num].desc,
                        "dateObject": calcDate.toString()
                    });
                    calcLog.innerHTML += " <b>" + importantDates[num].desc + "</b>";
                    break; //Should be a max of 1 importantDate per day   
                }
            }

            increment++;
        } else {
            calcLog.innerHTML += calcDate.toDateString();
        }
        calcDate.setDate(calcDate.getDate() + 1); //may have issue with 29th feb & 31sts
    }



    //Set view for users
    const dateOut = document.getElementById("dateOut");
    dateOut.innerHTML = "<button class=\"btn btn-primary\" onclick=\"downloadICS()\">Download Events</button>";
    dateValues.forEach(element => {
        console.log(element);
        var parentDiv = document.createElement('div');
        parentDiv.className = 'card card-body';
        var newElement = document.createElement("h4");
        newElement.innerHTML = element.desc;
        var newP = document.createElement("p");
        newP.innerHTML = element.date;

        parentDiv.appendChild(newElement);
        parentDiv.appendChild(newP);
        dateOut.appendChild(parentDiv);
    });
    console.log(impactingHolidays);
    remove_cursor_wait();

    //Set events in ICS file
    cal = ics();
    for (num in dateValues) {
        let dateItem = dateValues[num];
        cal.addEvent(dateItem.desc, "NZS3910 - Contractor Claims Date", "-", Date.parse(dateItem.dateObject), Date.parse(dateItem.dateObject) + 1000);
    }
}



/**
 * Returns boolean whether the nominated date should be counted as a 'working' date
 * @param {Date} startDate Date to check
 * @param {*}} publicHolidays list of all the publicHolidays
 * @param {String} region region selected
 * @returns is a working date Bool
 */
function isWorkingDay(startDate, region) {
    if (startDate.getDay() % 6 == 0) { //Weekend
        calcLog.innerHTML += "<b>Non-working day</b> - "
        return false;
    }
    if (startDate.getMonth() == 11 && startDate.getDate() >= 23) { //Zero indexed values - 24th Dec onwards
        calcLog.innerHTML += "<b>Non-working day</b> - "
        return false;
    } else if (startDate.getMonth() == 0 && startDate.getDate() <= 4) //Zero indexed - before & = to jan 5th
    {
        calcLog.innerHTML += "<b>Non-working day</b> - "
        return false;
    }

    //Check if in holidc

    for (const item in holidaysFromInternet) {
        if ((holidaysFromInternet[item].description.includes(region) || holidaysFromInternet[item].description === "Public holiday") && new Date(holidaysFromInternet[item].date).toDateString() == startDate.toDateString()) {
            //Match is found
            impactingHolidays.push(holidaysFromInternet[item]);
            calcLog.innerHTML += "<b>Non-working day</b> - " + holidaysFromInternet[item].summary + " - "; //Print to calculations log div
            return false;
        }

    }
    return true;
}




/**
 * Turn the API JSON into relevant info
 * @param {*} holidaysJSON From the google calendar API
 */
function parseHolidays(holidaysJSON) {
    console.log("Holidays Parsed");
    Holidays = []
    for (const item in holidaysJSON.items) {
        if (holidaysJSON.items[item].description.includes("Public holiday")) {
            let dateValue = new Date(holidaysJSON.items[item].start.date);
            if (dateValue.getDay() % 6 == 0) { //Long weekend case
                dateValue.setDate(dateValue.getDate() + (dateValue.getDay() == 0 ? 1 : 2)); //Apparently this may have issues with 29th feb & 31sts
                holidaysJSON.items[item].start.date = dateValue.toDateString();
            }
            Holidays.push({ "summary": holidaysJSON.items[item].summary, "date": holidaysJSON.items[item].start.date, "description": holidaysJSON.items[item].description })
        }
    }
    return Holidays;
}


function cursor_wait() {
    // switch to cursor wait for the current element over
    let elements = $(':hover');
    if (elements.length) {
        // get the last element which is the one on top
        elements.last().addClass('cursor-wait');
    }
    // use .off() and a unique event name to avoid duplicates
    $('html').
    off('mouseover.cursorwait').
    on('mouseover.cursorwait', function(e) {
        // switch to cursor wait for all elements you'll be over
        $(e.target).addClass('cursor-wait');
    });
}

function remove_cursor_wait() {
    $('html').off('mouseover.cursorwait'); // remove event handler
    $('.cursor-wait').removeClass('cursor-wait'); // get back to default
}