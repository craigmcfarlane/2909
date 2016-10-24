function NYClock() {
    // the today variable contains the current date and time
    var today = new Date();

    // display the current date and time
    document.clockform.dateNow.value = showDate(today);
    document.clockform.timeNow.value = showTime(today);

    // calculate the time left until the New Year's Bash
    var days = calcDays(today);

    // display days rounded to the next lowest integer
    document.clockform.daysLeft.value = Math.floor(days);

    // calculate the hours left in the current day
    var hours = (days - Math.floor(days)) * 24;

    // display hours rounded to the next lowest integer
    document.clockform.hrLeft.value = Math.floor(hours);

    // calculate the minutes left in the current hour
    var minutes = (hours - Math.floor(hours)) * 60;

    // display minutes rounded to the next lowest integer
    document.clockform.minLeft.value = Math.floor(minutes);

    // calculate the seconds left in the current minute
    var seconds = (minutes - Math.floor(minutes)) * 60;

    // display seconds rounded to the next lowest integer
    document.clockform.secLeft.value = Math.floor(seconds);
}


function showDate(dateObj) {
    thisDate = dateObj.getDate();
    thisMonth = dateObj.getMonth() + 1;
    thisYear = dateObj.getFullYear();
    return thisMonth + "/" + thisDate + "/" + thisYear;
}

function showTime(dateObj) {
    thisSecond = dateObj.getSeconds();
    thisMinute = dateObj.getMinutes();
    thisHour = dateObj.getHours();

    // change thisHour from 24-hour time to 12-hour time by:
    // 1) if thisHour < 12 then set ampm to " a.m." otherwise set it to " p.m."
    var ampm = (thisHour < 12) ? " a.m." : " p.m.";

    // 2) subtract 12 from the thisHour variable
    thisHour = (thisHour > 12) ? thisHour - 12 : thisHour;

    // 3) if thisHour equals 0, change it to 12
    thisHour = (thisHour == 0) ? 12 : thisHour;

    // add leading zeros to minutes and seconds less than 10
    thisMinute = thisMinute < 10 ? "0" + thisMinute : thisMinute;
    thisSecond = thisSecond < 10 ? "0" + thisSecond : thisSecond;

    return thisHour + ":" + thisMinute + ":" + thisSecond + ampm;
}

function calcDays(currentDate) {
    // create a date object for January 1 of the next year
    newYear = new Date("January 1, 2011");
    nextYear = currentDate.getFullYear() + 1;
    newYear.setFullYear(nextYear);

    // calculate the difference between currentDate and January 1
    days = (newYear - currentDate) / (1000 * 60 * 60 * 24);

    return days;
}