/* globals define, octopeerHelper */
/* jshint unused : vars*/

define(function () {
    return {
        name: "time-and-pr-size",
        title: "Time spent + size pr",
        parentSelector: "#personal-modules",
        yRightAxis: true,
        xAxisLabel: "Pull request",
        yAxisLabel: "Time spent on pr",
        yRightAxisLabel: "Number of lines changed",
        xAxisTicks: false,
        xAxisLabelRotation: 65,
        xAxisFitFunction: function () {
            var axisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
                .rangePoints([0.35 * 50, 720 - 2.3 * 50]);
            return d3.svg.axis().scale(axisScale);
        },
        yAxisFitFunction: function () {
            var timeData = [
                    { "x": 0, "y": 35 },
                    { "x": 1, "y": 5 },
                    { "x": 2, "y": 17 },
                    { "x": 3, "y": 28 },
                    { "x": 4, "y": 122 },
                    { "x": 5, "y": 2 },
                    { "x": 6, "y": 3 },
                    { "x": 7, "y": 75 },
                    { "x": 8, "y": 40 },
                    { "x": 9, "y": 34 },
                    { "x": 10, "y": 72 },
                    { "x": 11, "y": 24 },
                    { "x": 12, "y": 41 },
                    { "x": 13, "y": 34 },
                    { "x": 14, "y": 72 },
                    { "x": 15, "y": 27 },
                    { "x": 16, "y": 42 },
                    { "x": 17, "y": 137 },
                    { "x": 18, "y": 57 },
                    { "x": 19, "y": 90 }
            ];
            return d3.svg.axis()
                .scale(d3.scale.linear()
                    .domain([0, Math.max.apply(Math, timeData.map(function (o) { return o.y; }))])
            );
        },
        yRightAxisFitFunction: function () {
            var sizeData = [
                    { "x": 0, "y": 461 },
                    { "x": 1, "y": 3 },
                    { "x": 2, "y": 43 },
                    { "x": 3, "y": 342 },
                    { "x": 4, "y": 6452 },
                    { "x": 5, "y": 5 },
                    { "x": 6, "y": 64 },
                    { "x": 7, "y": 412 },
                    { "x": 8, "y": 762 },
                    { "x": 9, "y": 342 },
                    { "x": 10, "y": 1521 },
                    { "x": 11, "y": 312 },
                    { "x": 12, "y": 454 },
                    { "x": 13, "y": 642 },
                    { "x": 14, "y": 1542 },
                    { "x": 15, "y": 1752 },
                    { "x": 16, "y": 242 },
                    { "x": 17, "y": 142 },
                    { "x": 18, "y": 717 },
                    { "x": 19, "y": 4772 }
            ];
            return d3.svg.axis().scale(
                d3.scale.linear()
                .domain([0, Math.max.apply(Math, sizeData.map(function (o) { return o.y; }))])
            );
        },
        legend: [
            {
                "type": "rect",
                "style": "fill:rgb(77, 136, 255);",
                "text": "Time spent on pull request"
            },
            {
                "type": "line",
                "style": "stroke:rgb(212, 51, 51);stroke-width:3px;",
                "text": "Number of lines changed"
            }
        ],
        body: function () {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                timeData = [
                    { "x": 0, "y": 35 },
                    { "x": 1, "y": 5 },
                    { "x": 2, "y": 17 },
                    { "x": 3, "y": 28 },
                    { "x": 4, "y": 122 },
                    { "x": 5, "y": 2 },
                    { "x": 6, "y": 3 },
                    { "x": 7, "y": 75 },
                    { "x": 8, "y": 40 },
                    { "x": 9, "y": 34 },
                    { "x": 10, "y": 72 },
                    { "x": 11, "y": 24 },
                    { "x": 12, "y": 41 },
                    { "x": 13, "y": 34 },
                    { "x": 14, "y": 72 },
                    { "x": 15, "y": 27 },
                    { "x": 16, "y": 42 },
                    { "x": 17, "y": 137 },
                    { "x": 18, "y": 57 },
                    { "x": 19, "y": 90 }
                ],
                sizeData = [
                    { "x": 0, "y": 461 },
                    { "x": 1, "y": 3 },
                    { "x": 2, "y": 43 },
                    { "x": 3, "y": 342 },
                    { "x": 4, "y": 6452 },
                    { "x": 5, "y": 5 },
                    { "x": 6, "y": 64 },
                    { "x": 7, "y": 412 },
                    { "x": 8, "y": 762 },
                    { "x": 9, "y": 342 },
                    { "x": 10, "y": 1521 },
                    { "x": 11, "y": 312 },
                    { "x": 12, "y": 454 },
                    { "x": 13, "y": 642 },
                    { "x": 14, "y": 1542 },
                    { "x": 15, "y": 1752 },
                    { "x": 16, "y": 242 },
                    { "x": 17, "y": 142 },
                    { "x": 18, "y": 717 },
                    { "x": 19, "y": 4772 }
                ];

            var xTimeScale = d3.scale.linear()
                .domain([0, timeData.length])
                .range([pad, w - pad]),
            xSizeScale = d3.scale.linear()
                .domain([0, sizeData.length])
                .range([pad, w - pad]),
            yTimeScale = d3.scale.linear()
                .domain([0, Math.max.apply(Math, timeData.map(function (o) { return o.y; }))])
                .range([0, h - padBottom - padTop])
                .nice(),
            ySizeScale = d3.scale.linear()
                .domain([Math.max.apply(Math, sizeData.map(function (o) { return o.y; })), 0])
                .range([padTop, h - padBottom])
                .nice();

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.selectAll("rect").data(timeData).enter()
                .append("rect")
                .attr("x", function (d) { return xTimeScale(d.x) + 9; })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (timeData.length - 1)) - 20; })
                .attr("height", function (d) { return yTimeScale(d.y); })
                .attr("style", "fill:rgb(77, 136, 255);")
                    .transition()
                    .attr("y", function (d) { return h - padBottom - yTimeScale(d.y); });

            var tempSizeData = [{ "x": -0.5, "y": 0 }]
                .concat(sizeData)
                .concat([{ "x": sizeData.length - 0.5, "y": 0 }]);

            g.append("path")
                .attr("d",
                    octopeerHelper.line(
                        tempSizeData, "cardinal-open", function (x) { return xSizeScale(x + 0.5); }, ySizeScale
                        )
                    )
                .attr("style", "stroke:rgb(212, 51, 51);fill:none;stroke-width: 3px;");

            var OWNER = "mboom";
            var REPO_NAME = "TI2806";
            var DATA_POINT_RADIUS_DEFAULT = 4;
            var DATA_POINT_RADIUS_HOVER = 6;

            g.selectAll("circle").data(sizeData).enter()
                .append("circle")
                .attr("cx", function (d) { return xSizeScale(d.x + 0.5); })
                .attr("cy", function (d) { return ySizeScale(d.y); })
                .attr("r", DATA_POINT_RADIUS_DEFAULT)
                .attr("style", "fill:rgb(212, 51, 51);stroke-width: 3px;")
                .style("cursor", "pointer")
                .on("click", function (d) {
                    window.open("https://www.github.com/" + OWNER + "/" + REPO_NAME + "/pull/" + d.x);
                })
                .on("mouseover", function (d) { d3.select(this).attr("r", DATA_POINT_RADIUS_HOVER); })
                .on("mouseout", function (d) { d3.select(this).attr("r", DATA_POINT_RADIUS_DEFAULT); });
            return g;
        }
    };
});