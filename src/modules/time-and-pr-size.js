/* globals define, octopeerHelper, TimeSpentSizePrAggregator, globalUserName */
/* jshint unused: vars*/
/* jshint esnext: true */

define(function () {
    return {
        name: "time-and-pr-size",
        title: "Pull request review times and sizes",
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
                .direction("e")
                .offset([0, 5])
                .html(function (d) {
                    return "<div>" + d.y + "</div>";
                });
            g.call(tip);

            g.selectAll("rect").data(timeData).enter()
                .append("rect")
                .attr("class", "time-and-pr-size-time-spent")
                .attr("x", function (d) { return xTimeScale(d.x) + 9; })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (timeData.length - 1)) - 20; })
                .attr("height", function (d) {
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
                .attr("id", "time-and-pr-size-lines-changed")
                .attr("d",
                    octopeerHelper.line(
                        tempSizeData, "cardinal-open", function (x) { return xSizeScale(x + 0.5); }, ySizeScale
                        )
                    )
                .attr("style", "stroke:rgb(212, 51, 51);fill:none;stroke-width: 3px;");

            var DATA_POINT_RADIUS_DEFAULT = 4;
            var DATA_POINT_RADIUS_HOVER = 6;

            g.selectAll("circle").data(sizeData).enter()
                .append("circle")
                .attr("class", "time-and-pr-size-lines-changed-circle")
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
                .on("mouseout", function (d) {
                    d3.select(this).attr("r", DATA_POINT_RADIUS_DEFAULT);
                    tip.hide();
                });

            var optns = [
                { 'val': 'both', 'text': 'show both' },
                { 'val': 'lineschanged', 'text': 'only show lines changed' },
                { 'val': 'timespent', 'text': 'only show time spent' }
            ];

            function showLinesChanged(show = true) {
                var opacity = show ? 1 : 0;
                d3.select("#time-and-pr-size-lines-changed").transition().style("opacity", opacity);
                d3.selectAll(".time-and-pr-size-lines-changed-circle").transition().style("opacity", opacity);
            }

            function showTimeSpent(show = true) {
                var opacity = show ? 1 : 0;
                d3.selectAll(".time-and-pr-size-time-spent").transition().style("opacity", opacity);
            }

            d3.select('#' + this.name).select('.card-content').insert('div', ':first-child')
                .style({ 'display': 'inline-block', 'position': 'relative', 'right': '0px', 'margin-right': '1em',
                    'width': '150px', 'height': '30px', 'float': 'right', 'font-size': '0.8em' })
                .insert('select')
                .style({ 'display': 'inline-block', 'margin-left': '10px', 'right': '0px', 'width': '150px',
                    'height': '30px' })
                .on('change', function () {
                    switch(this.value) {
                        case 'lineschanged':
                            showLinesChanged(true);
                            showTimeSpent(false);

                            break;
                        case 'timespent':
                            showTimeSpent(true);
                            showLinesChanged(false);

                            break;
                        default:
                            showTimeSpent(true);
                            showLinesChanged(true);
                    }
                })
                .selectAll('option').data(optns).enter()
                .append('option')
                .attr('value', function (d) { return d.val; })
                .text(function (d) { return d.text; });

            return g;
        }
    };
});