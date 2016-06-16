/* globals define, PunchCardAggregator, globalUserName, timeHelper */
/* jshint unused : vars*/
/* jshint maxstatements: 50*/

define(function () {

    var punchData = [
        [
            { "start": "2016-06-14T17:03:48.504Z", "end": "2016-06-14T17:31:13.537Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": { "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub" }, "pull_request_number": 7 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
            { "start": "2016-06-14T17:43:59.790Z", "end": "2016-06-14T17:45:26.020Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": { "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub" }, "pull_request_number": 7 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
            { "start": "2016-06-14T18:18:26.680Z", "end": "2016-06-14T18:19:52.754Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/149/", "id": 2, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/149/", "repository": { "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub" }, "pull_request_number": 149 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
        ]
    ];

    var sessions_data = {
        "sem_sessions": [
            {
                "start": "2016-06-14T00:00:00Z",
                "end": "2016-06-14T20:08:30Z",
                "session": {
                    "url":
                    "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/",
                    "id": 1,
                    "pull_request": {
                        "url":
                        "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/",
                        "repository": {
                            "url":
                            "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/",
                            "owner": "thervh70",
                            "name": "ContextProject_RDD",
                            "platform": "GitHub"
                        },
                        "pull_request_number": 7
                    },
                    "user": {
                        "url": "http://146.185.128.124/api/users/Travis/",
                        "id": 1,
                        "username": "Travis"
                    }
                }
            },
            {
                "start": "2016-06-15T12:08:30Z",
                "end": "2016-06-15T23:59:00Z",
                "session": {
                    "url":
                    "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/",
                    "id": 2,
                    "pull_request": {
                        "url":
                        "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/",
                        "repository": {
                            "url":
                            "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/",
                            "owner": "thervh70",
                            "name": "ContextProject_RDD",
                            "platform": "GitHub"
                        },
                        "pull_request_number": 9
                    },
                    "user": {
                        "url": "http://146.185.128.124/api/users/Travis/",
                        "id": 1,
                        "username": "Travis"
                    }
                }
            }
        ]
    };

    // conversation
    // write comment
    // write inline comment
    // look at code
    // look at commits tab

    /*jshint ignore:start*/
    var eventData = [{"viewData":[{"start":"2016-06-15T07:54:47.965Z","end":"2016-06-15T08:41:38.806Z","type":"view_conversation"}],"writeData":[{"start":"2016-06-15T07:34:50.425Z","end":"2016-06-15T07:41:38.806Z","type":"write_comment"}],"session_id":3,"earliest":"2016-06-15T07:34:47.965Z"},{"viewData":[{"start":"2016-06-15T07:42:38.598Z","end":"2016-06-15T07:49:35.681Z","type":"view_conversation"},{"start":"2016-06-15T07:49:48.005Z","end":"2016-06-15T07:53:49.171Z","type":"view_conversation"},{"start":"2016-06-15T07:49:35.681Z","end":"2016-06-15T07:49:43.912Z","type":"view_code"},{"start":"2016-06-15T07:49:43.912Z","end":"2016-06-15T07:49:48.005Z","type":"view_commits"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T07:42:38.598Z"},{"viewData":[{"start":"2016-06-15T07:56:31.609Z","end":"2016-06-15T08:08:43.809Z","type":"view_conversation"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T07:56:31.609Z"},{"viewData":[{"start":"2016-06-15T08:08:48.738Z","end":"2016-06-15T08:09:32.268Z","type":"view_conversation"},{"start":"2016-06-15T08:09:32.268Z","end":"2016-06-15T08:10:27.085Z","type":"view_code"}],"writeData":[{"start":"2016-06-15T08:09:42.373Z","end":"2016-06-15T08:09:48.235Z","type":"write_inline_comment"}],"session_id":1,"earliest":"2016-06-15T08:08:48.738Z"},{"viewData":[{"start":"2016-06-15T08:10:31.155Z","end":"2016-06-15T08:13:36.806Z","type":"view_conversation"}],"writeData":[{"start":"2016-06-15T08:10:34.549Z","end":"2016-06-15T08:10:36.131Z","type":"write_inline_comment"}],"session_id":1,"earliest":"2016-06-15T08:10:31.155Z"},{"viewData":[{"start":"2016-06-15T08:26:39.245Z","end":"2016-06-15T08:26:42.728Z","type":"view_conversation"},{"start":"2016-06-15T08:26:42.728Z","end":"2016-06-15T08:38:18.260Z","type":"view_code"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T08:26:39.245Z"},{"viewData":[{"start":"2016-06-15T08:44:05.849Z","end":"2016-06-15T08:44:10.308Z","type":"view_conversation"}],"writeData":[],"session_id":3,"earliest":"2016-06-15T08:44:05.849Z"},{"viewData":[{"start":"2016-06-15T08:44:10.972Z","end":"2016-06-15T08:44:13.098Z","type":"view_conversation"}],"writeData":[],"session_id":3,"earliest":"2016-06-15T08:44:10.972Z"},{"viewData":[{"start":"2016-06-15T08:45:11.093Z","end":"2016-06-15T08:46:49.985Z","type":"view_conversation"}],"writeData":[],"session_id":2,"earliest":"2016-06-15T08:45:11.093Z"},{"viewData":[{"start":"2016-06-15T08:52:57.915Z","end":"2016-06-15T08:52:59.057Z","type":"view_conversation"},{"start":"2016-06-15T08:52:59.057Z","end":"2016-06-15T08:53:02.619Z","type":"view_code"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T08:52:57.915Z"},{"viewData":[{"start":"2016-06-15T09:44:36.491Z","end":"2016-06-15T09:44:46.299Z","type":"view_conversation"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T09:44:36.491Z"},{"viewData":[{"start":"2016-06-15T09:45:19.009Z","end":"2016-06-15T09:46:07.250Z","type":"view_conversation"}],"writeData":[{"start":"2016-06-15T09:45:23.925Z","end":"2016-06-15T09:46:07.250Z","type":"write_inline_comment"}],"session_id":1,"earliest":"2016-06-15T09:45:19.009Z"},{"viewData":[{"start":"2016-06-15T09:46:35.235Z","end":"2016-06-15T09:47:38.100Z","type":"view_conversation"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T09:46:35.235Z"},{"viewData":[{"start":"2016-06-15T09:47:57.413Z","end":"2016-06-15T10:00:48.340Z","type":"view_conversation"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T09:47:57.413Z"},{"viewData":[{"start":"2016-06-15T10:28:53.760Z","end":"2016-06-15T10:29:46.005Z","type":"view_conversation"}],"writeData":[],"session_id":3,"earliest":"2016-06-15T10:28:53.760Z"},{"viewData":[{"start":"2016-06-15T10:52:12.292Z","end":"2016-06-15T10:54:52.564Z","type":"view_conversation"}],"writeData":[{"start":"2016-06-15T10:52:28.208Z","end":"2016-06-15T10:52:30.564Z","type":"write_inline_comment"},{"start":"2016-06-15T10:52:49.950Z","end":"2016-06-15T10:54:52.564Z","type":"write_inline_comment"}],"session_id":1,"earliest":"2016-06-15T10:52:12.292Z"},{"viewData":[{"start":"2016-06-15T11:00:44.042Z","end":"2016-06-15T11:05:55.269Z","type":"view_conversation"}],"writeData":[],"session_id":1,"earliest":"2016-06-15T11:00:44.042Z"},{"viewData":[{"start":"2016-06-15T11:20:15.267Z","end":"2016-06-15T11:36:33.730Z","type":"view_conversation"}],"writeData":[],"session_id":3,"earliest":"2016-06-15T11:20:15.267Z"}]
    /*jshint ignore:end*/
    var margin = { left: 75, right: 50, top: 10, bottom: 50 };

    function getViewDataFromSessionId(sid, list) {
        var viewOnly = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var session = item.session_id
            var earliest = item.earliest;
            if (item.session_id === sid) {
                for (var j = 0; j < item.viewData.length; j++) {
                    var vd = item.viewData[j]
                    var start = vd.start;
                    var end = vd.end;
                    var type = vd.type;
                    viewOnly.push({ "start": start, "end": end, "type": type, "session_id": session, "earliest": earliest });
                }
            }
        }
        return viewOnly;
    }

    function getWriteDataFromSessionId(sid, list) {
        var writeOnly = [];
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var session = item.session_id
            var earliest = item.earliest;
            if (item.session_id === sid) {
                for (var j = 0; j < item.writeData.length; j++) {
                    var vd = item.writeData[j]
                    var start = vd.start;
                    var end = vd.end;
                    var type = vd.type;
                    writeOnly.push({ "start": start, "end": end, "type": type, "session_id": session, "earliest": earliest });
                }
            }
        }
        return writeOnly;
    }

    function getSessionIdList(list) {
        var res = [];
        for (var i = 0; i < list.length; i++) {
            var session = list[i].session_id;
            if (res.indexOf(session) === -1) {
                res.push(session);
            }
        }
        return res.sort();
    }

    function getAllViewData(list) {
        var res = [];
        var sessions = getSessionIdList(list);
        for (var i = 0; i < sessions.length; i++) {
            var id = 
            res = res.concat(getViewDataFromSessionId(sessions[i], list));
        }
        return res;
    }

    function getAllWriteData(list) {
        var res = [];
        var sessions = getSessionIdList(list);
        for (var i = 0; i < sessions.length; i++) {
            var id =
            res = res.concat(getWriteDataFromSessionId(sessions[i], list));
        }
        return res;
    }

    var w = 1440;
    var h = 350;
    var xScale = d3.scale.linear().domain([0, 24]).range([margin.left, w - margin.right]);
    var yScale = d3.scale.linear().domain([6, 0]).range([margin.top, h - margin.bottom - 20]);
    var minuteScale = d3.scale.linear().domain([0, 60]).range([0, 1]);

    var today = new Date().getDay();

    var RADIUS_DEFAULT = 5;
    var RADIUS_HOVER = 7;

    var STROKE_WIDTH_DEFAULT = 10;
    var STROKE_WIDTH_HOVER = 15;

    var EVENT_TYPES = ['view_conversation', 'view_commits', 'view_code', 'write_inline_comment', 'write_comment'];

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
        margin: margin,
        xAxis: true,
        yAxis: true,
        xAxisLine: false,
        yAxisLine: false,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisScale: function () {
            return d3.svg.axis()
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
                .tickFormat(function (d, i) {
                    if ((d + today + 1) % 7 === today) {
                        return 'Today';
                    }
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
                            'Thursday', 'Friday', 'Saturday'][(d + today + 1) % 7];
                })
                .scale(d3.scale.ordinal()
                    .domain([0, 1, 2, 3, 4, 5, 6])
                    .rangePoints([0, h - margin.bottom - margin.top - 20])
                );
        },
        //data: [{
        //    "serviceCall": function () { return new PunchCardAggregator(globalUserName, 20); },
        //    "required": true
        //}],
        body: function (res) {

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

            function getPrFromSessionId(sid) {
                for (var i = 0; i < transformedData.length; i++) {
                    var item = transformedData[i];
                    console.log(item);
                    if (item.origin.session.id === sid) {
                        return item.origin.session.pull_request.pull_request_number;
                    }

                }
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            //var prNumbers = getPrNumbers(data.sem_sessions); /*jshint ignore:line*/
            var prNumbers = [7, 9];
            var color = d3.scale.category10();

            if (prNumbers.length > 10) {
                color = d3.scale.category20();
            }

            var transformedData = punchData[0].map(function (item) {  /*jshint ignore:line*/
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
                    .style("fill", "rgba(211, 211, 211, 0.5)");
            }

            function setRectUnHoverState(selection) {
                selection.style("fill", "white");
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
            .attr("width", xScale(24)-xScale(0))
            //.attr("rx", 6)
            //.attr("ry", 6)
            .style("fill", "white")
            .style("stroke-width", 3)
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

            g.selectAll("g")
            //.style("fill", "green")
            .style("stroke", "black")
            .on("mouseover", function (d) {
                d3.select(this).selectAll("line").attr("stroke-width", STROKE_WIDTH_HOVER);
                tip.show(d);
            })
            .on("mouseout", function (d) {
                d3.select(this).selectAll("line").attr("stroke-width", STROKE_WIDTH_DEFAULT);
                tip.hide();
            });

            g.selectAll("line")
            .style("stroke", function (d) {
                return getColor(d);
            });

            d3.selectAll(".clickable")
            .on("click", function (d) { drawDay(d); })
            .style("cursor", "pointer");

            g.selectAll(".clickable")
            .on("click", function (d) { drawDay(d); })
            .style("cursor", "pointer");

            function getLatestTimestamp(data) {
                var latest = new Date().setFullYear(2000);
                for (var i = 0; i < data.length; i++) {
                    var item = data[i]
                    for (var j = 0; j < item.viewData.length; j++) {
                        var date = new Date(item.viewData[j].end);
                        if (date > latest) {
                            latest = date;
                        }
                    }
                }
                return latest;
            }


            function getEarliestTimestamp(data) {
                var earliest = new Date();
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    for (var j = 0; j < item.viewData.length; j++) {
                        var date = new Date(item.viewData[j].end);
                        if (date < earliest) {
                            earliest = date;
                        }
                    }
                }
                return earliest;
            }

            function getEarliestTimestampOfSessionId(data, sid) {
                var earliest = new Date();
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    var date = new Date(item.earliest);
                    if (date < earliest && item.session_id === sid) {
                        earliest = date;
                    }
                }
                return earliest;
            }

            function dateDiff(d1, d2) {
                return Math.abs(getHoursAndMinutes(new Date(d1)) - getHoursAndMinutes(new Date(d2)));
            }

            var module = this;
            var dayXScale;

            var a;

            function drawDay(daysAgo) {

                var timespan = timeHelper.getTimespanOfDay(timeHelper.getNameOfDaysAgo(daysAgo));
                g.selectAll('.day').remove();

                a = eventData;
                // REAL DATA
                //var epca = new ExtendedPunchCardAggregator('Travis', 'GitHub', timespan.start, timespan.end).then(function (a) {
                    var latest = getLatestTimestamp(a);
                    var earliest = getEarliestTimestamp(a);

                    dayXScale = d3.scale.linear().domain([0, dateDiff(earliest, latest)]).range([margin.left, w - margin.right]);
                    var dayXAxis = d3.svg.axis()
                        .orient("bottom")
                        .scale(dayXScale);
                    g.append("g")
                        .attr("transform", "translate(0, 450)")
                        .call(dayXAxis);
                    drawViewEvents(getAllViewData(a));
                    drawWriteEvents(getAllWriteData(a));
                //});


                var y = h;
                var day = timeHelper.getNameOfDaysAgo(daysAgo);
                var dummy = {"viewData":[{"start":"2016-06-15T07:34:47.965Z","end":"2016-06-15T07:41:38.806Z","type":"view_conversation"}],
                             "writeData":[{"start":"2016-06-15T07:34:50.425Z","end":"2016-06-15T07:41:38.806Z","type":"write_comment"}],"session_id":3,"earliest":"2016-06-15T07:34:47.965Z"}
                
                //var tip2 = d3.tip()
                //    .attr('class', 'd3-tip')
                //    .html(function (d) {
                //        return "<div><a style='color:black;font-size:small'" +
                //        " href='http://www.github.com/" + d.session.pull_request.repository.owner + "/" +
                //            d.session.pull_request.repository.name + "/pull/" +
                //            d.session.pull_request.pull_request_number + "'>#" +
                //            d.session.pull_request.pull_request_number +
                //            //" <span style='color:gray'>" + getPrInfo(d.origin).title + "</span></a> +
                //            "</div>" +
                //            //"<div><a style='color:black;font-size:small''>Author: <span style='color:gray'>" +
                //            //getPrInfo(d.origin).author + "</span></a></div>" +
                //            "<div><a style='color:black;font-size:small''>Started watching: <span style='color:gray'>" +
                //            formatDate(d.start) + "</span></a></div>" +
                //            "<div><a style='color:black;font-size:small''>Stopped watching: <span style='color:gray'>" +
                //            formatDate(d.end) + "</span></a></div>" +
                //            "<div class='arrow-down'></div></div>";
                //    })
                //    .offset([-20, 0]);
                //g.call(tip2);

                
            }

            function drawViewEvents(vdata) {
                var sessionNumbers = getSessionIdList(vdata);
                var y = h;

                //g.selectAll('#pr-bar').remove();
                g.selectAll('#pr-bar-view')
                .data(vdata)
                .enter()
                .append('line')
                .attr('class', 'day')
                .attr('x1', xScale(0))
                .attr('x2', function (d, i) {
                    return dayXScale(dateDiff(d.end, d.start) + dateDiff(d.start, d.earliest));
                })
                .attr('y1', function (d, i) { return h + sessionNumbers.indexOf(d.session_id) * 30; })
                .attr('y2', function (d, i) { return h + sessionNumbers.indexOf(d.session_id) * 30; })
                .style("stroke", function (d) {
                    return color(EVENT_TYPES.indexOf(d.type));
                })
                .attr('stroke-width', 20)
                .attr('stroke', 'black');

                var tip2 = d3.tip()
                    .attr('class', 'd3-tip')
                    .html(function (d) {
                        return "<div><a style='color:black;font-size:small'" +
                        " href='http://www.github.com/" + d.session.pull_request.repository.owner + "/" +
                            d.session.pull_request.repository.name + "/pull/" +
                            d.session.pull_request.pull_request_number + "'>#" +
                            d.session.pull_request.pull_request_number +
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
                g.call(tip2);

                d3.select('#' + module.name).select('svg').attr('viewBox', '0 0 1440 ' + (y + 400 * sessionNumbers.length));
            }

            function drawWriteEvents(wdata) {

                var sessionNumbers = getSessionIdList(wdata);
                var y = h;

                //g.selectAll('#pr-bar').remove();
                g.selectAll('#pr-bar-write')
                .data(wdata)
                .enter()
                .append('line')
                .attr('class', 'day')
                .attr('x1', xScale(0))
                .attr('x2', function (d, i) {
                    return dayXScale(dateDiff(d.end, d.start) + dateDiff(d.start, d.earliest));
                })
                .attr('y1', function (d, i) { return h + 5 + sessionNumbers.indexOf(d.session_id) * 30; })
                .attr('y2', function (d, i) { return h + 5 + sessionNumbers.indexOf(d.session_id) * 30; })
                .style("stroke", function (d) {
                    return color(EVENT_TYPES.indexOf(d.type));
                })
                .attr('stroke-width', 10);
            }
            return g;
        }
    };
});
