/* globals define, PunchCardAggregator */
/* jshint unused : vars*/

define(function () {

    var margin = { left: 50, right: 50, top: 10, bottom: 50 };
    var w = 720;
    var h = 350;

    var xScale = d3.scale.linear().domain([0, 23]).range([margin.left, w - margin.right]);
    var yScale = d3.scale.linear().domain([6, 0]).range([margin.top, h - margin.bottom]);
    var minuteScale = d3.scale.linear().domain([0, 60]).range([0, 1]);

    var today = new Date().getDay();


    var RADIUS_DEFAULT = 5;
    var RADIUS_HOVER = 7;

    var STROKE_WIDTH_DEFAULT = 2;
    var STROKE_WIDTH_HOVER = 4;

    return {
        name: "punch-card",
        title: "Code reviews last week",
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
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                            'Thursday', 'Friday', 'Saturday'][(d + today + 1) % 7];
                })
                .scale(yScale.copy());
        },
        xAxisFitFunction: false,
        yAxisFitFunction: false,
        data: [{
            "serviceCall": function () { console.log(new PunchCardAggregator("Travis", 20)); return new PunchCardAggregator("Travis", 20); },
            "required": true
        }],
        body: function (res) {
            var arr = res[0];
            console.log(arr);
            console.log(new Date(res[0][0].start).getTime());
            // given a day gets the amount of days that have passed since then.
            function transformDay(day) {
                return (today + 7 - day) % 7;
            }

            // 604800000 == amount of ms in a week
            function lessThanAWeekAgo(pr) {
                return true;
                //return (today.getTime() - new Date(pr.start).getTime() < 604800000);
            }

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
            console.log(res[0][0]);
            var filtered = [];
            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];
                if (lessThanAWeekAgo(item)) {
                    filtered.push(item);
                }
            }

            var transformedData = filtered.map(function (item) {
                return { start: new Date(item.start), end: new Date(item.end), original: item };
            });
            

            console.log(transformedData);
            var sameDays = getSameDays(transformedData);
            var diffDays = getDifferentDays(transformedData);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function (d) {
                    return d.start.toDateString() + " " + d.start.toTimeString() + "<div class='arrow-down'></div>";
                })
                .offset([-20, 0]);
            
            g.call(tip);

            g.selectAll("g.diff")
            .data(diffDays)
            .enter()
            .append("g")
            .attr("class", "diff");

            g.selectAll("g.same")
            .data(sameDays)
            .enter()
            .append("g")
            .attr("class", "same");

            g.selectAll(".same")
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("cy", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("r", RADIUS_DEFAULT)
            .attr("class", "circle-start");

            g.selectAll(".same")
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("cy", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("r", RADIUS_DEFAULT)
            .attr("class", "circle-end");

            // draw full lines on the same day
            g.selectAll(".same")
            .append("line")
            .attr("x1", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("y1", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("x2", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("y2", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("stroke-width", STROKE_WIDTH_DEFAULT);

            g.selectAll(".diff")
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("cy", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("r", RADIUS_DEFAULT)
            .attr("class", "circle-start");

            g.selectAll(".diff")
            .append("circle")
            .attr("cx", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("cy", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("r", RADIUS_DEFAULT);

            // draw lines for code review up to midnight
            g.selectAll(".diff")
            .append("line")
            .attr("x1", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("y1", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("x2", function (d) { return xScale(24); })
            .attr("y2", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("stroke-width", STROKE_WIDTH_DEFAULT);
            // draw lines for code review after midnight
            g.selectAll(".diff")
            .append("line")
            .attr("x1", function (d) { return xScale(0); })
            .attr("y1", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("x2", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("y2", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("stroke-width", STROKE_WIDTH_DEFAULT);

            g.selectAll("g")
            .style("fill", "black")
            .style("stroke", "black")
            .on("mouseover", function (d) {
                d3.select(this).selectAll("circle").attr("r", RADIUS_HOVER);
                d3.select(this).selectAll("line").attr("stroke-width", STROKE_WIDTH_HOVER);
                var svg = d3.select(this).select(".circle-start");
                tip.show(d, svg.node());
            })
            .on("mouseout", function (d) {
                d3.select(this).selectAll("circle").attr("r", RADIUS_DEFAULT);
                d3.select(this).selectAll("line").attr("stroke-width", STROKE_WIDTH_DEFAULT);
                tip.hide();
            });

            return g;
        }
    };
});
