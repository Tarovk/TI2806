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
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
            left_pad = 20;
            var x = d3.scale.linear().domain([0, 23]).range([left_pad, w - pad]),
    y = d3.scale.linear().domain([0, 6]).range([pad, h - pad * 2]);
            var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");
            
            g.data([1, 2, 3]).attr("class", "axis")
    .attr("transform", "translate(0, " + (h - pad) + ")").call(xAxis);
            
            var circle = g.append("circle")
            .attr("cx", 30)
            .attr("cy", 30)
            .attr("r", 20);

            return g;
        }
    }
});