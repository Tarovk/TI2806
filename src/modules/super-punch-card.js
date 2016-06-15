/* globals define, PunchCardAggregator, globalUserName*/
/* jshint unused : vars*/
/* jshint maxstatements: 50*/

define(function () {
    /*jshint ignore:start*/
    var data = {
        "sem_sessions": [
            {
                "start": "2016-06-13T12:08:30Z", "end": "2016-06-13T18:08:30Z", "session": {
                    "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": {
                        "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": {
                            "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub"
                        }, "pull_request_number": 7
                    }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" }
                }
            },
            {
                "start": "2016-06-13T20:08:30Z", "end": "2016-06-13T21:08:30Z", "session": {
                    "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": {
                        "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": {
                            "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub"
                        }, "pull_request_number": 7
                    }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" }
                }
            },
            {
                "start": "2016-06-14T12:08:30Z", "end": "2016-06-14T20:08:30Z", "session": {
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
    /*jshint ignore:end*/
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

            function getSessionsOfDay(nrDaysAgo) {
                var res = [];
                var name = timeHelper.getNameOfDaysAgo(nrDaysAgo);
                for (var i = 0; i < data.sem_sessions.length; i++) {
                    var item = data.sem_sessions[i];
                    var startDate = item.start;
                    if (timeHelper.getDayOfTimestamp(new Date(startDate)) === name) {
                        res.push(item);
                    }
                }
                return res;
            }

            function getDetailedSessionsOfDay(nrDaysAgo) {
                var res = [];
                var name = timeHelper.getNameOfDaysAgo(nrDaysAgo);
                for (var i = 0; i < semdata.length; i++) {
                    var item = semdata[i];
                    
                    
                }
                return res;
            }

            function getPrFromSessionNumber(snr) {
                for (var i = 0; i < sem_sessions.length; i++) {
                    var item = sem_sessions[i];
                    if (item.id == snr) {
                        return item.pull_request;
                    }
                }
            }

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
                console.log("pr: ")
                console.log(pr)
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

            var prNumbers = getPrNumbers(data.sem_sessions); /*jshint ignore:line*/

            var color = d3.scale.category10();

            if (prNumbers.length > 10) {
                color = d3.scale.category20();
            }

            var transformedData = data.sem_sessions.map(function (item) {  /*jshint ignore:line*/
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
                .attr("class", "clickable")
                .on("mouseover", function (d, i) {
                    var selection = d3.select('#super-punch-card')
                    .select('.yAxis')
                    .selectAll('text')[0][i];
                    setTextHoverState(d3.select(selection));
                    selection = d3.select('#super-punch-card').selectAll("rect")[0][i];
                    setRectHoverState(d3.select(selection));
                })
                .on("mouseout", function (d, i) {
                    var selection = d3.select('#super-punch-card')
                    .select('.yAxis')
                    .selectAll('text')[0][i];
                    setTextUnHoverState(d3.select(selection));
                    selection = d3.select('#super-punch-card').selectAll("rect")[0][i];
                    setRectUnHoverState(d3.select(selection));
                });

            function setTextUnHoverState(selection) {
                selection.style("font-weight", "initial");
            }
            function setTextHoverState(selection) {
                selection.style("font-weight", "bold")
                    .style("cursor", "pointer");
            }

            function setRectHoverState(selection) {
                selection.style("cursor", "pointer")
                    .attr("stroke", "gray");
            }

            function setRectUnHoverState(selection) {
                selection.attr("stroke", "white");
            }

            var rectData = [6, 5, 4, 3, 2, 1, 0];

            var rectHeight = 30;

            g.selectAll('rect')
            .data(rectData)
            .enter()
            .append("rect")
            .attr("class", "clickable")
            .attr("y", function (d) { return yScale(d) - rectHeight / 2; })
            .attr("x", xScale(0))
            .attr("height", rectHeight)
            .attr("width", xScale(24))
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("fill", "white")
            .attr("stroke-width", 3)
            .on("mouseover", function (d, i) {
                var selection = d3.select('#super-punch-card')
                .select('.yAxis')
                .selectAll('text')[0][i];
                setTextHoverState(d3.select(selection));
                setRectHoverState(d3.select(this));
                
            })
            .on("mouseout", function (d, i) {
                var selection = d3.select('#super-punch-card')
                .select('.yAxis')
                .selectAll('text')[0][i];
                setTextUnHoverState(d3.select(selection));
                setRectUnHoverState(d3.select(this));
            });

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

            // draw full lines on the same day
            g.selectAll(".same")
            .append("line")
            .attr("class", "clickable")
            .attr("x1", function (d) { return xScale(getHoursAndMinutes(d.start)); })
            .attr("y1", function (d) { return yScale(transformDay(d.start.getDay())); })
            .attr("x2", function (d) { return xScale(getHoursAndMinutes(d.end)); })
            .attr("y2", function (d) { return yScale(transformDay(d.end.getDay())); })
            .attr("stroke-width", STROKE_WIDTH_DEFAULT);

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

            g.selectAll("line")
            .style("stroke", function (d) {
                return getColor(d);
            });

            console.log(d3.selectAll(".clickable"));

            d3.selectAll(".clickable")
            .on("click", function (d) { drawDay(d); })
            .style("cursor", "pointer");

            g.selectAll(".clickable")
            .on("click", function (d) { drawDay(d); })
            .style("cursor", "pointer");

            var module = this;
            function drawDay(daysAgo) {
                console.log("check");
                var sessions = getSessionsOfDay(daysAgo);
                console.log(sessions);
                var y = h;
                g.selectAll('#pr-bar').remove();
                g.selectAll('#pr-bar')
                .data(sessions)
                .enter()
                .append('line')
                .attr('id', 'pr-bar')
                .attr('x1', xScale(0))
                .attr('x2', function (d) {
                    return xScale(getHoursAndMinutes(new Date(d.end)) - getHoursAndMinutes(new Date(d.start)));
                })
                .attr('y1', function (d, i) { return y + i * 30; })
                .attr('y2', function (d, i) { return y + i * 30; })
                .style("stroke", function (d) {
                    var id = d.session.pull_request.pull_request_number;
                    return color(prNumbers.indexOf(id));
                })
                .attr('stroke-width', 20)
                .attr('stroke', 'black');
                console.log("drawn")
                getDetailedSessionsOfDay(2);

                var vbHeight = y + 20 * sessions.length + margin.top;
                d3.select('#' + module.name).select('svg').attr('viewBox', '0 0 1440 ' + vbHeight);
            }

            return g;
        }
    };
});
