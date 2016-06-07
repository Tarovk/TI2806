/* globals define, octopeerHelper */
/* jshint unused : vars*/

define(function () {
    return {
        name: "punch-card",
        title: "Code review punch card",
        parentSelector: "#personal-modules",
        size: "m6",
        xAxis: true,
        yAxis: true,
        xAxisLine: false,
        yAxisLine: false,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisScale: function () {
            var axisScale = d3.scale.linear().domain([0, 23]);
            return d3.svg.axis().ticks(24).scale(axisScale);
        },
        yAxisScale: function () {
            var axisScale = d3.scale.linear().domain([6, 0]);
            return d3.svg.axis()
                .ticks(7)
                .tickFormat(function (d, i) {
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
                })
                .scale(axisScale);
        },
        body: function () {
            function getDay(date) {

            }
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            //"2016-06-06T12:02:19.529Z"
            var dummyData = [
                { start: "2016-06-06T10:02:19.529Z", end: "2016-06-06T13:02:19.529Z" },
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
            console.log(transformedData);
            console.log(dummyData[0].start);
            console.log(new Date(dummyData[0].start));

            var margin = { left: 50, right: 50, top: 50, down: 50 };


            var w = 720;
            var h = 350;
            var xScale = d3.scale.linear().domain([0, 23]).range([0 + margin.left, w - margin.right]);
            var yScale = d3.scale.linear().domain([0, 6]).range([0 + margin.top, h - margin.down]);
            for (var i = 0; i < 7; i++) {
                console.log(yScale(i));
            }
            g.selectAll("circle-start")
            .data(transformedData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.start.getHours()); })
            .attr("cy", function (d) { return yScale(d.start.getDay()); })
            .attr("r", 5);

            g.selectAll("circle-end")
            .data(transformedData)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return xScale(d.end.getHours()); })
            .attr("cy", function (d) { return yScale(d.end.getDay()); })
            .attr("r", 5);

            g.selectAll("line")
            .data(transformedData)
            .enter()
            .append("line")
            .attr("x1", function (d) { return xScale(d.start.getHours()); })
            .attr("y1", function (d) { return yScale(d.start.getDay()); })
            .attr("x2", function (d) { return xScale(d.end.getHours()); })
            .attr("y2", function (d) { return yScale(d.end.getDay()); })
            .style("stroke", "black");

            return g;
        }
    }
});