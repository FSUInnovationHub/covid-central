export function IsoToLocalFormatted(isoTime) {
    var d = new Date(isoTime);

    var sMonth = padValue(d.getMonth() + 1);
    var sDay = padValue(d.getDate());
    var sYear = d.getFullYear();
    var sHour = d.getHours();
    var sMinute = padValue(d.getMinutes());
    var sAMPM = "AM";

    var iHourCheck = parseInt(sHour);

    if (iHourCheck > 12) {
        sAMPM = "PM";
        sHour = iHourCheck - 12;
    }
    else if (iHourCheck === 0) {
        sHour = "12";
    }

    sHour = padValue(sHour);

    return sMonth + "-" + sDay + "-" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
    return (value < 10) ? "0" + value : value;
}



