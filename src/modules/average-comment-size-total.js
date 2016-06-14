/* globals define, octopeerHelper */
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
        yAxisFitFunction: function() {
            var sizeData = [
                    {"x":0, "y":4.61},
                    {"x":1, "y":3},
                    {"x":2, "y":4.3},
                    {"x":3, "y":3.42},
                    {"x":4, "y":64.52},
                    {"x":5, "y":5},
                    {"x":6, "y":6.4},
                    {"x":7, "y":41.2},
                    {"x":8, "y":7.62},
                    {"x":9, "y":34.2},
                    {"x":10, "y":15.21},
                    {"x":11, "y":3.12},
                    {"x":12, "y":45.4},
                    {"x":13, "y":6.42},
                    {"x":14, "y":15.42},
                    {"x":15, "y":17.52},
                    {"x":16, "y":24.2},
                    {"x":17, "y":14.2},
                    {"x":18, "y":7.17},
                    {"x":19, "y":47.72}
                ];
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
        body: function () {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                sizeData2 = [
                    {"x":0, "y":4.61},
                    {"x":1, "y":3},
                    {"x":2, "y":4.3},
                    {"x":3, "y":3.42},
                    {"x":4, "y":64.52},
                    {"x":5, "y":5},
                    {"x":6, "y":6.4},
                    {"x":7, "y":41.2},
                    {"x":8, "y":7.62},
                    {"x":9, "y":34.2},
                    {"x":10, "y":15.21},
                    {"x":11, "y":3.12},
                    {"x":12, "y":45.4},
                    {"x":13, "y":6.42},
                    {"x":14, "y":15.42},
                    {"x":15, "y":17.52},
                    {"x":16, "y":24.2},
                    {"x":17, "y":14.2},
                    {"x":18, "y":7.17},
                    {"x":19, "y":47.72}
                ];

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