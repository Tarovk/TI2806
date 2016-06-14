/* globals define, PunchCardAggregator, globalUserName */
/* jshint unused : vars*/
/* jshint maxstatements: 35*/

define(function () {

    var data = {
        "sem_sessions": [
            {
                "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z", "session": {
                    "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": {
                        "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": {
                            "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub"
                        }, "pull_request_number": 7
                    }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" }
                }
            },
            {
                "start": "2016-06-05T12:08:30Z", "end": "2016-06-05T20:08:30Z", "session": {
                    "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 2, "pull_request": {
                        "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": {
                            "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub"
                        }, "pull_request_number": 9
                    }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" }
                }
            },
        ]
    };

    // conversation
    // write comment
    // write inline comment
    // look at code
    // look at commits tab

    var semdata = [
                        {
            "view_conversation": [{ "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z" }],
            "write_comment": [{ "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z" }],
            "write_inline_comment": [{ "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z" }],
            "view_code": [{ "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z" }],
            "view_commits": [{ "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z" }],
            "session_id": 1
                        }
                  ];

    var margin = { left: 50, right: 50, top: 10, bottom: 50 };
    var w = 1440;
    var h = 350;

    var xScale = d3.scale.linear().domain([0, 24]).range([margin.left, w - margin.right]);
    var yScale = d3.scale.linear().domain([6, 0]).range([margin.top, h - margin.bottom]);
    var minuteScale = d3.scale.linear().domain([0, 60]).range([0, 1]);

    var today = new Date().getDay();

    var RADIUS_DEFAULT = 5;
    var RADIUS_HOVER = 7;

    var STROKE_WIDTH_DEFAULT = 10;
    var STROKE_WIDTH_HOVER = 15;

    function isInt(num) {
        return num % 1 === 0;
    }

    function generateTickValues() {
        var res = [];
        for (var i = 0; i <= 24; i += 0.25) {
            res.push(i);
        }
        return res;
    }

    return {
        name: "super-punch-card",
        title: "Code reviews last week",
        parentSelector: "#behaviour-modules",
        size: "m12",
        customSVGSize: { h: h, w: w },
        xAxis: true,
        yAxis: true,
        xAxisLine: false,
        yAxisLine: false,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisScale: function () {
            return d3.svg.axis()
                .ticks(24 * 2)
                .tickValues(generateTickValues())
                .tickFormat(function (d, i) {
                    if (isInt(d)) {
                        return d;
                    } else {
                        return "";
                    }
                })
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
            "serviceCall": function () { return new PunchCardAggregator(globalUserName, 20); },
            "required": true
        }],
        body: function (res) {

            console.log(data);

            function getPrNumbers(array) {
                var numbers = [];
                for (var i = 0; i < array.length; i++) {
                    var pr = array[i];
                    numbers.push(getPrNumber(pr));
                }
                return Array.from(new Set(numbers));
            }

            // given a day gets the amount of days that have passed since then.
            function transformDay(day) {
                return (today + 7 - day) % 7;
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

            function getPr(pr) {
                return pr.session.pull_request;
            }

            function getPrNumber(pr) {
                return pr.session.pull_request.pull_request_number;
            }

            function getPrInfo(pr) {
                return pr.session.pull_request.prInfo;
            }

            function padZero(int) {
                if (int < 10) {
                    return "0" + int;
                }
                return int;
            }

            function formatDate(date) {
                return padZero(date.getDate()) + "/" +
                    padZero((date.getMonth() + 1)) + "/" +
                    (date.getYear() + 1900) + " " +
                    padZero(date.getHours()) + ":" +
                    padZero(date.getMinutes());
            }

            function getColor(session) {
                var id = getPrNumber(session.origin);
                return color(prNumbers.indexOf(id));
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            var prNumbers = getPrNumbers(data.sem_sessions)

            var color = d3.scale.category10();

            if (prNumbers.length > 10) {
                color = d3.scale.category20();
            }

            var transformedData = data.sem_sessions.map(function (item) {
                return { start: new Date(item.start), end: new Date(item.end), origin: item };
            });

            var prs = [];
            for (var ii = 0; ii < transformedData.length; ii++) {
                var item = transformedData[ii];
                prs.push(getPrNumber(item.origin));
            }
            var sameDays = getSameDays(transformedData);
            var diffDays = getDifferentDays(transformedData);

            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .html(function (d) {
                    return "<div><a style='color:black;font-size:small'" +
                    " href='http://www.github.com/" + getPr(d.origin).repository.owner + "/" +
                        getPr(d.origin).repository.name + "/pull/" +
                        getPrNumber(d.origin) + "'>#" + getPrNumber(d.origin) +
                        //" <span style='color:gray'>" + getPrInfo(d.origin).title + "</span></a> +
                        "</div>" +
                        //"<div><a style='color:black;font-size:small''>Author: <span style='color:gray'>" +
                        //getPrInfo(d.origin).author + "</span></a></div>" +
                        "<div><a style='color:black;font-size:small''>Started watching: <span style='color:gray'>" +
                        formatDate(d.start) + "</span></a></div>" +
                        "<div><a style='color:black;font-size:small''>Stopped watching: <span style='color:gray'>" +
                        formatDate(d.end) + "</span></a></div>" +
                        "<div class='arrow-down'></div></div>";
                })
                .offset([-20, 0]);

            g.call(tip);

            d3.select('#super-punch-card')
                .select('.yAxis')
                .selectAll('text')
                .style("cursor", "pointer")
                .on("click", function (d) { console.log(d); });

            var rectData = [6, 5, 4, 3, 2, 1, 0];

            var rectHeight = 30;

            g.selectAll('rect')
            .data(rectData)
            .enter()
            .append("rect")
            .attr("y", function (d) { return yScale(d) - rectHeight / 2; })
            .attr("x", xScale(0))
            .attr("height", rectHeight)
            .attr("width", xScale(24))
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("fill", "white")
            .attr("stroke-width", 3)
            .on("click", function (d) { console.log(d); })
            .on("mouseover", function () { d3.select(this).style("cursor", "pointer").attr("stroke", "gray");})
            .on("mouseout", function () { d3.select(this).style("cursor", "default").attr("stroke", "white"); });

            g.selectAll("g.diff")
            .data(diffDays)
            .enter()
            .append("g")
            .attr("class", "diff")
            .style("cursor", "pointer")
            .on("click", function (d) {
                window.open(getPrInfo(d.origin).url);
            });

            g.selectAll("g.same")
            .data(sameDays)
            .enter()
            .append("g")
            .attr("class", "same")
            .style("cursor", "pointer")
            .on("click", function (d) {
                window.open(getPrInfo(d.origin).url);
            })
            .style("fill", function (d) { return color(getColor(d)); });
            //.style("fill", function (d) { return c10(getPrNumber(d)); });


            //g.selectAll(".same")
            //.append("circle")
            //.attr("cx", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            //.attr("cy", function (d) { return yScale(transformDay(d.start.getDay())); })
            //.attr("r", RADIUS_DEFAULT)
            //.attr("class", "circle-start")
            //.style("fill", function (d, i) { return c10(i); });

            //g.selectAll(".same")
            //.append("circle")
            //.attr("cx", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            //.attr("cy", function (d) { return yScale(transformDay(d.end.getDay())); })
            //.attr("r", RADIUS_DEFAULT)
            //.attr("class", "circle-end");

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

            //g.selectAll(".diff")
            //.append("circle")
            //.attr("cx", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            //.attr("cy", function (d) { return yScale(transformDay(d.end.getDay())); })
            //.attr("r", RADIUS_DEFAULT);

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
            //.style("fill", "green")
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

            g.selectAll("line")
            .style("stroke", function (d) {
                return getColor(d);
            });

            var module = this;
            function drawDay(nrpr) {
                var y = h;
                for (var i = 0; i < nrpr; ++i) {
                    y += 20;
                    g.insert('rect')
                        .attr("style", "display: block; fill: rgb(77, 136, 255);")
                        .attr('height', 10)
                        .attr('width', 500)
                        .attr('x', margin.left)
                        .attr('y', y);
                    y += 20;
                }
                var vbHeight = y + margin.top;
                d3.select('#' + module.name).select('svg').attr('viewBox', '0 0 1440 ' + vbHeight);
            }

            drawDay(3);
            return g;
        }
    };
});
