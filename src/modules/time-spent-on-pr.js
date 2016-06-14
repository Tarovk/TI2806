/* globals define, TimeSpentSizePrAggregator, globalUserName */
/* jshint unused : vars*/

define(function () {
        var w = 720,
            h = 350,
            pad = 50,
            padTop = 10,
            padBottom = 50,
            timeData;
    return {
    	name: "time-spent-on-pr",
        title: "Time spent on pr",
        parentSelector: "#personal-modules",
        xAxisLabel: "Pull request",
        yAxisLabel: "Time spent on pr",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: false,
        yAxisTicks: true,
        xAxisLabelRotation: 65,
        xAxisFitFunction: function() { 
            var axisScale = d3.scale.ordinal()
                .domain(timeData.map(function (pr) {
                    return pr.x;
                }))
                .rangePoints([0.35*50, 720-2.3*50]);
            return d3.svg.axis().scale(axisScale);
        },
        yAxisFitFunction: function() {
            return d3.svg.axis().scale(
                d3.scale.linear()
                    .domain([0,Math.max.apply(Math,timeData.map(function(o){return o.y;}))])
            );
        },
        legend: [
            {
                "type":"rect",
                "style":"fill:rgb(77, 136, 255);", 
                "text":"Time spent on pull request"
            }
        ],
        data: [{
            "serviceCall": function () { return new TimeSpentSizePrAggregator(globalUserName); },
            "required": true
        }],
        body: function (data) {
            timeData = data[0].timeSpent;
            var xTimeScale = d3.scale.linear()
                .domain([0,timeData.length])
                .range([pad,w-pad]),
                yTimeScale = d3.scale.linear()
                    .domain([0,Math.max.apply(Math,timeData.map(function(o){return o.y;}))])
                    .range([0, h-padBottom-padTop])
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
                .attr("height", function (d) { return yTimeScale(d.y); })
                .on("click", function (d) {
                    window.open(d.url);
                })
                .attr("style", "fill:rgb(77, 136, 255);")
                .on("mouseover", function (d) {
                    d3.select(this).style("fill", "rgb(77, 70, 255)");
                    return tip.show(d);
                })
                .on("mouseout", function (d) { d3.select(this).style("fill", "rgb(77, 136, 255)"); tip.hide(); })
                .style("cursor", "pointer")
                .transition()
                .attr("y", function (d) { return h - padBottom - yTimeScale(d.y); });
            return g;
        }
    };
});