/* globals define, PullRequestsAggregator */
/* exported xAxisGroup, yAxisGroup */
/* jshint unused : vars */

define(function () {
    var data2 = [];
    var today = new Date();
            var month = today.getMonth();
            var format = d3.time.format("%d/%m");
            // Because months are 0-11 this will get the previous month.
            data2.push(new Date().setMonth((month + 11) % 12));
            data2.push(today);
    var xScale = d3.time.scale().domain(data2).range([0, 720 - 50 - 50]).nice();
    
    var yScale = d3.scale.linear().domain([0,300]).range([50, 300]).nice();
    
    return {
        name: "pull-requests",
        title: "Pull requests",
        parentSelector: "#project-modules",
        yAxis: false,
        xAxis: true,
        xAxisTicks: false,
        xAxisLine: true,
        xAxisScale: function() { 
            var axis = d3.svg.axis().scale(xScale);
            axis.tickFormat(format).ticks(30);
            return axis;
        },
        xAxisLabelRotation: 65,
        legend: [
            {
                "type":"dot",
                "style":"fill:green;",
                "text":"Merged pull request"
            },
            {
                "type":"dot",
                "style":"fill:orange;",
                "text":"Open pull requests"
            },
            {
                "type":"dot",
                "style":"fill:red;",
                "text":"Closed pull requests"
            }
        ],
        data: [{
            "serviceCall": function () { return new PullRequestsAggregator(globalUserName); }
        }],
        body: function (res) {
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            console.log(res[0]);
            g.selectAll('circle')
                .data(res[0])
                .enter()
                .append('circle')
                .attr("cx", function (d) {
                    var parser = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
                    return xScale(parser.parse(d.prInfo.created_at));
                })
                .attr("cy", function (d) {
                    return yScale(Math.random() * 300);
                })
                .style("fill", function (d) {
                    return d.prInfo.merged ? "green" : (d.prInfo.state === "closed" ? "red" : "orange");
                })
                .style("cursor", "pointer")
                .attr("r", 5)
                .on("click", function (d) {
                    window.open(d.prInfo.url);
                });
            console.log(g);
            return g;
        }
    };
});