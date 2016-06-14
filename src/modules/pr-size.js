/* globals define, octopeerHelper, TimeSpentSizePrAggregator, globalUserName */
define(function () {
    return {
    	name: "pr-size",
        title: "Size of pr",
        parentSelector: "#project-modules",
        xAxisLabel: "Pull request",
        yAxisLabel: "Number of lines changed",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: false,
        yAxisTicks: true,
        xAxisLabelRotation: 65,
        xAxisFitFunction: function(data) { 
            var axisScale = d3.scale.ordinal()
                .domain(data[0].sizeData.map(function (pr) {
                    return pr.x;
                }))
                .rangePoints([0.35*50, 720-2.3*50]);
            return d3.svg.axis().scale(axisScale);
        },
        yAxisFitFunction: function(data) {
            return d3.svg.axis().scale(
                d3.scale.linear()
                    .domain([0,Math.max.apply(Math,data[0].sizeData.map(function(o){return o.y;}))])
            );
        },
        legend: [
            {
                "type":"line",
                "style":"stroke:rgb(212, 51, 51);stroke-width:3px;",
                "text":"Number of lines changed"
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
                sizeData = data[0].sizeData;

            var xSizeScale = d3.scale.linear()
                .domain([0,sizeData.length])
                .range([pad,w-pad]),
            ySizeScale = d3.scale.linear()
                .domain([Math.max.apply(Math,sizeData.map(function(o){return o.y;})),0])
                .range([padTop, h-padBottom]).nice();

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .direction("e")
                .offset([0, 5])
                .html(function (d) {
                    return "<div>" + d.y + "</div>";
                });
            g.call(tip);

            var DATA_POINT_RADIUS_DEFAULT = 4;
            var DATA_POINT_RADIUS_HOVER = 6;

            var tempSizeData = [{"x":-0.5, "y":0}]
                .concat(sizeData)
                .concat([{"x":sizeData.length-0.5, "y":0}]);

            g.append("path")
                .attr("d",
                    octopeerHelper.line(
                        tempSizeData,"cardinal-open",function(x){return xSizeScale(x+0.5);},ySizeScale
                        )
                    )
                .attr("style","stroke:rgb(212, 51, 51);fill:none;stroke-width: 3px;");

            g.selectAll("circle").data(sizeData).enter()
                .append("circle")
                .attr("cx", function (d) { return xSizeScale(d.x + 0.5); })
                .attr("cy", function (d) { return ySizeScale(d.y); })
                .attr("r", DATA_POINT_RADIUS_DEFAULT)
                .attr("style", "fill:rgb(212, 51, 51);stroke-width: 3px;")
                .style("cursor", "pointer")
                .on("click", function (d) {
                    window.open(d.url);
                })
                .on("mouseover", function (d) {
                    d3.select(this).attr("r", DATA_POINT_RADIUS_HOVER);
                    return tip.show(d);
                })
                .on("mouseout", function () {
                    d3.select(this).attr("r", DATA_POINT_RADIUS_DEFAULT);
                    tip.hide();
                });

            return g;
        }
    };
});