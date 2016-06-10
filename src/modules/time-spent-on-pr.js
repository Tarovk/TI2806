/* globals define, RSVP, octopeerHelper */
/* jshint unused : vars*/

define(function () {
        var w = 720,
            h = 350,
            pad = 50,
            padTop = 10,
            padBottom = 50,
            timeData = [
                {"x":0, "y":35},
                {"x":1, "y":5},
                {"x":2, "y":17},
                {"x":3, "y":28},
                {"x":4, "y":122},
                {"x":5, "y":2},
                {"x":6, "y":3},
                {"x":7, "y":75},
                {"x":8, "y":40},
                {"x":9, "y":34},
                {"x":10, "y":72},
                {"x":11, "y":24},
                {"x":12, "y":41},
                {"x":13, "y":34},
                {"x":14, "y":72},
                {"x":15, "y":27},
                {"x":16, "y":42},
                {"x":17, "y":137},
                {"x":18, "y":57},
                {"x":19, "y":90}
            ];

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
        xAxisScale: function() { 
            var axisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
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
        body: function () {
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

            var optns = [
                { 'val': 5, 'text': 'last 5 days' },
                { 'val': 28, 'text': 'last 4 weeks' },
                { 'val': 365, 'text': 'last 12 months' }
            ];
            function updateData(dat) {

            }
            d3.select('#' + this.name).select('.card-content').insert('div', ':first-child')
                .style({ 'display': 'inline-block', 'position': 'absolute', 'right': '0px', 'width': '300px' })
                .text('select the time span')
                .insert('select')
                .style({ 'display': 'inline-block', 'margin-left': '10px', 'width': '150px' })
                .on('change', function () {
                    var timespan = octopeerHelper.getTimespan(this.children[this.selectedIndex].value);
                    //alert('start: ' + timespan.start + ', end: ' + timespan.end);
                    RSVP.when(function () { return new Aggregator(); }).then(function (dat) {
                        updateData(dat);
                        redrawGraph();
                    });
                })
                .selectAll('option').data(optns).enter()
                .append('option')
                .attr('value', function (d) { return d.val; })
                .text(function (d) { return d.text; });

            var OWNER = "mboom";
            var REPO_NAME = "TI2806";

            function redrawGraph() {
                g.selectAll('*').remove();
                g.selectAll("rect").data(timeData).enter()
                    .append("rect")
                    .attr("x", function (d) { return xTimeScale(d.x) + 9; })
                    .attr("y", h - padBottom)
                    .attr("width", function () { return (w / (timeData.length - 1)) - 20; })
                    .attr("height", function (d) { return yTimeScale(d.y); })
                    .on("click", function (d) {
                        window.open("https://www.github.com/" + OWNER + "/" + REPO_NAME + "/pull/" + d.x);
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
            }

            redrawGraph();
            return g;
        }
    };
});