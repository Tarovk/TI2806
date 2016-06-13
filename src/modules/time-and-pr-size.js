/* globals define, octopeerHelper, TimeSpentSizePrAggregator, globalUserName */
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
        xAxisFitFunction: function (data) {
            var axisScale = d3.scale.ordinal()
                .domain(data[0].timeSpent.map(function (pr) {
                    return pr.x;
                }))
                .rangePoints([0.35 * 50, 720 - 2.3 * 50]);
            return d3.svg.axis().scale(axisScale);
        },
        yAxisFitFunction: function (data) {
            var timeData = data[0].timeSpent;
            return d3.svg.axis()
                .scale(d3.scale.linear()
                    .domain([0, Math.max.apply(Math, timeData.map(function (o) { return o.y; }))])
            );
        },
        yRightAxisFitFunction: function (data) {
            var sizeData = data[0].sizeData;
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
        data: [{
            "serviceCall": function () { return new TimeSpentSizePrAggregator(globalUserName); },
            "required": true
        }],
        body: function (data) {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                timeData = data[0].timeSpent,
                sizeData = data[0].sizeData;

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
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .direction("e")
                .offset([0, 5])
                .html(function (d) {
                    return "<div>" + d.y + "</div>";
                });
            g.call(tip);

            g.selectAll("rect").data(timeData).enter()
                .append("rect")
                .attr("x", function (d) { return xTimeScale(d.x) + 9; })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (timeData.length - 1)) - 20; })
                .attr("height", function (d) { 
                console.log(d);
                return yTimeScale(d.y); })
                .attr("style", "fill:rgb(77, 136, 255);")
                .on("click", function (d) {
                    window.open(d.url);
                })
                .on("mouseover", function (d) {
                    d3.select(this).style("fill", "rgb(77, 70, 255)");
                    return tip.show(d);
                })
                .on("mouseout", function (d) { d3.select(this).style("fill", "rgb(77, 136, 255)"); tip.hide(); })
                .style("cursor", "pointer")
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
                .on("mouseover", function (d) {
                    d3.select(this).attr("r", DATA_POINT_RADIUS_HOVER);
                    return tip.show(d);
                })
                .on("mouseout", function (d) {
                    d3.select(this).attr("r", DATA_POINT_RADIUS_DEFAULT);
                    tip.hide();
                });
            return g;
        }
    };
});