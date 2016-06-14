/* exported TimeHelper */

function TimeHelper() {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var date = new Date();

    function getMSeconds() {
        var hours = date.getHours() * 3600000;
        var minutes = date.getMinutes() * 60000;
        var seconds = date.getSeconds() * 1000;
        var mseconds = date.getMilliseconds();
        return hours + minutes + seconds + mseconds;
    }

    this.getTimespanOfDay = function (dayName) {
        var day = weekday.indexOf(dayName);
        var dif = date.getDay() - day;
        if (dif < 0) {
            dif += 7;
        }
        var start = new Date(date.getTime() - getMSeconds() - dif * 86400000);
        var end = new Date(start.getTime() + 86400000);
        return { 'start': start, 'end': end };
    };

    this.getDayOfTimestamp = function (timestamp) {
        for (var i = 0; i < weekday.length; ++i) {
            var timespan = this.getTimespanOfDay(weekday[i]);
            if (timespan.start.getTime() <= timestamp.getTime() &&
                timestamp.getTime() <= timespan.end.getTime()) {
                return weekday[i];
            }
        }
        return 'Out of scope';
    };

    this.getNameOfDaysAgo = function (dif) {
        var today = date.getDay();
        var day = today - dif;
        if (day < 0) {
            day += 7;
        }
        return weekday[day];
    };

    this.getTimespanOfDaysAgo = function (dif) {
        return this.getTimespanOfDay(this.getNameOfDaysAgo(dif));
    };
}