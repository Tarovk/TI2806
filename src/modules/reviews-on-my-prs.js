/* globals define, ForceLayoutAggregator, globalUserName */
define(function () {

    var width = 720,
        height = 700;

    return {
        name: 'reviews-on-my-prs',
        title: 'Your reviewed prs',
        size: "m4",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        data: [],
        customSVGSize:[width,height],
        body: function (res) {

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            return g;
        }
    };
});
