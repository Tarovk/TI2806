/* globals define, octopeerHelper */
/* jshint unused : vars*/

define(function () {

    var margin = { left: 50, right: 50, top: 10, bottom: 50 };
    var w = 720;
    var h = 350;

    var xScale = d3.scale.linear().domain([0, 23]).range([margin.left, w - margin.right]);
    var yScale = d3.scale.linear().domain([6, 0]).range([h - margin.bottom, margin.top]);
    var minuteScale = d3.scale.linear().domain([0, 60]).range([0, 1]);

    var today = new Date().getDay();

    console.log(today);
    for (var i = 0; i < 7; i++) {
        console.log((i + today) % 7);
    }

    return {
        name: "punch-card",
        title: "Code review last week",
        parentSelector: "#personal-modules",
        size: "m6",
        xAxis: true,
        yAxis: true,
        xAxisLine: false,
        yAxisLine: false,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisScale: function () {
            return d3.svg.axis()
                .ticks(24)
                .scale(xScale.copy());
        },
        yAxisScale: function () {
            return d3.svg.axis()
                .ticks(7)
                .tickFormat(function (d, i) {
                    if ((d + today + 1) % 7 === today) {
                        return 'Today';
                    }
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][(d + today + 1) % 7];
                })
                .scale(yScale.copy());
        },
        xAxisFitFunction: false,
        yAxisFitFunction: false,
        body: function () {

            function getSameDays(sessions) {
                var res = [];
                for (var i = 0; i < sessions.length; i++) {
                    var item = sessions[i];
                    if (item.start.getDay() === item.end.getDay()) {
                        res.push(item);
                    }
                }
                return res;
            }

            function getDifferentDays(sessions) {
                var res = [];
                for (var i = 0; i < sessions.length; i++) {
                    var item = sessions[i];
                    if (item.start.getDay() !== item.end.getDay()) {
                        res.push(item);
                    }
                }
                return res;
            }

            function getHoursAndMinutes(date) {
                var hour = date.getHours();
                var minutes = date.getMinutes();
                return hour + minuteScale(minutes);
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            var dummyData = [
                { start: "2016-06-06T10:59:19.529Z", end: "2016-06-06T13:02:19.529Z" },
                { start: "2016-06-07T11:02:19.529Z", end: "2016-06-07T14:02:19.529Z" },
                { start: "2016-06-08T12:02:19.529Z", end: "2016-06-08T15:02:19.529Z" },
                { start: "2016-06-09T13:02:19.529Z", end: "2016-06-09T16:02:19.529Z" },
                { start: "2016-06-10T14:02:19.529Z", end: "2016-06-10T17:02:19.529Z" },
                { start: "2016-06-11T15:02:19.529Z", end: "2016-06-11T18:02:19.529Z" },
                { start: "2016-06-12T16:02:19.529Z", end: "2016-06-12T19:02:19.529Z" },
                { start: "2016-06-13T17:02:19.529Z", end: "2016-06-13T20:02:19.529Z" },
                { start: "2016-06-14T18:02:19.529Z", end: "2016-06-14T21:02:19.529Z" },
                { start: "2016-06-15T19:02:19.529Z", end: "2016-06-15T22:02:19.529Z" },
                { start: "2016-06-16T20:02:19.529Z", end: "2016-06-16T23:02:19.529Z" }
            ];
            var transformedData = dummyData.map(function (item) { return { start: new Date(item.start), end: new Date(item.end) } });
            var sameDays = getSameDays(transformedData);
            var diffDays = getDifferentDays(transformedData);

            g.selectAll("circle-start")
            .data(transformedData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("cy", function (d) { return yScale(d.start.getDay()); })
            .attr("r", 5);

            g.selectAll("circle-end")
            .data(transformedData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("cy", function (d) { return yScale(d.end.getDay()); })
            .attr("r", 5);

            // draw full lines on the same day
            g.selectAll("line-full")
            .data(sameDays)
            .enter()
            .append("line")
            .attr("x1", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("y1", function (d) { return yScale(d.start.getDay()); })
            .attr("x2", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("y2", function (d) { return yScale(d.end.getDay()); })
            .style("stroke", "black");

            console.log(diffDays);

            // draw lines for code review up to midnight
            g.selectAll("line-first-half")
            .data(diffDays)
            .enter()
            .append("line")
            .attr("x1", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("y1", function (d) { return yScale(d.start.getDay()); })
            .attr("x2", function (d) { return xScale(23); })
            .attr("y2", function (d) { return yScale(d.start.getDay()); })
            .style("stroke", "black");

            // draw lines for code review after midnight
            g.selectAll("line-second-half")
            .data(diffDays)
            .enter()
            .append("line")
            .attr("x1", function (d) { return xScale(0); })
            .attr("y1", function (d) { return yScale(d.end.getDay()); })
            .attr("x2", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("y2", function (d) { return yScale(d.end.getDay()); })
            .style("stroke", "black");

            return g;
        }
    }
});