/* globals define, gitHubService */
/* exported xAxisGroup, yAxisGroup */
/* jshint unused : vars */

define(function () {
    return {
        name: "pull-requests",
        title: "Pull requests",
        size: 1,
        parentSelector: "#project-modules",
        xAxisLabel: "Date",
        yAxisLabel: "",
        yAxis: false,
        xAxisTicks: false,
        xAxisLine: true,
        xAxisScale: function() { 
            var data2 = [];
            var today = new Date();
            var month = today.getMonth();
            var format = d3.time.format("%d/%m");
            // Because months are 0-11 this will get the previous month.
            data2.push(new Date().setMonth((month + 11) % 12));
            data2.push(today);

            var xScale = d3.time.scale().domain(data2).range([0, 720 - 50 - 50]).nice();
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
        body: function () {

            function processPRs(prs) {
                for (var i = 0; i < prs.length; i++) {
                    arr.push(prs[i]);
                }
                g.selectAll("circle")
                .data(arr)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return xScale(parser.parse(d.created_at));
                })
                .attr("cy", function (d) {
                    return yScale(Math.random() * 300);
                })
                .style("fill", function (d) {
                    return d.merged ? "green" : (d.state === "closed" ? "red" : "orange");
                })
                .style("cursor", "pointer")
                .attr("r", 5)
                .on("click", function (d) {
                    window.open("https://www.github.com/" + OWNER + "/" + REPO_NAME + "/pull/" + d.number);
                });
            }

            var REPO_NAME = "TI2806";
            var OWNER = "mboom";
            var leftPad = 50;
            var w = 720;
            var h = 350;
            var data2 = [];
            var today = new Date();
            var month = today.getMonth();
            // Because months are 0-11 this will get the previous month.
            data2.push(new Date().setMonth((month + 11) % 12));
            data2.push(today);

            var xScale = d3.time.scale().domain(data2).range([0, w - leftPad]);
            var yScale = d3.scale.linear().domain([300, 0]).range([15, h - 50]);
            var parser = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
            var arr = [];
            gitHubService.getPullRequests("mboom", "TI2806", processPRs);

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            return g;
        }
    };
});