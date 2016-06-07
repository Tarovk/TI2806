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
            var axisScale = d3.scale.linear().domain([0, 6]);
            return d3.svg.axis()
                .ticks(7)
                .tickFormat(function (d, i) {
                    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
                })
                .scale(axisScale);
        },
        body: function () {
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            

            return g;
        }
    }
});