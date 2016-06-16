/* globals define, octopeerHelper, CommentSizeAggregator, globalUserName, globalPlatform */
define(function () {
    return {
    	name: "average-comment-size-total",
        title: "Total average comment size",
        parentSelector: "#project-modules",
        xAxisLabel: "Pull request",
        yAxisLabel: "Average comment size (size/count)",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: true,
        yAxisTicks: true,
        xAxisLabelRotation: 65,
        xAxisScale: function() { 
            var axisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
                .rangePoints([0, 720-2*50]);
            return d3.svg.axis().scale(axisScale);
        },
        yAxisFitFunction: function(data) {
            var sizeData = data[0].map(function (pr) {
                    return {
                        "x": pr.total.x,
                        "y": pr.total.y
                    };
                });
            return d3.svg.axis().scale(
                d3.scale.linear()
                .domain([0,Math.max.apply(Math,sizeData.map(function(o){return o.y;}))])
            );
        },
        legend: [
            {
                "type":"rect",
                "style":"stroke:rgb(51, 125, 212);stroke-width:2px;fill:rgba(51, 125, 212,0.5);",
                "text":"Total average comment sizes"
            }
        ],
        data: [{
            "serviceCall": function () { return new CommentSizeAggregator(globalUserName, globalPlatform); },
            "required": true
        }],
        body: function (res) {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                sizeData2 = res[0].map(function (pr) {
                    return {
                        "x": pr.total.x,
                        "y": pr.total.y,
                        "prInfo": pr.pr
                    };
                });

            var maxValue = Math.max.apply(Math,sizeData2.map(function(o){return o.y;}));

            var xSizeScale = d3.scale.linear().domain([0,sizeData2.length]).range([pad,w-17]),
            ySizeScale = d3.scale.linear().domain([maxValue,0]).range([padTop, h-padBottom]).nice();

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.append("path")
                .attr("d",
                    octopeerHelper.area(
                        sizeData2,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale
                        )
                    )
                .attr("style","stroke: rgb(51, 125, 212);fill: rgba(51, 125, 212,0.5);stroke-width: 2px;"); 

            return g;
        }
    };
});