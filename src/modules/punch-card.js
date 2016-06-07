/* globals define, octopeerHelper */
/* jshint unused : vars*/

define(function () {
    return {
        name: "punch-card",
        title: "Code review punch card",
        parentSelector: "#personal-modules",
        xAxis: false,
        yAxis: false,
        body: function () {
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            



            return g;
        }
    }
});