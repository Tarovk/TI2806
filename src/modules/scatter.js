/* globals define */

define(function () {
    return {
        name: "scatter",
        title: "Time spent on pr",
        parentSelector: "#bodyrow",
        body: function () {
            var w = 720,
                h = 350,
                pad = 30,
                left_pad = 40,
                data1 = [10, 20, 30, 40, 50, 60, 70, 80],
                data2 = [30, 60, 90, 120, 150, 180, 210, 240];

            var data = [];

            for (var i = 0; i < data1.length; i++) {
                data[i] = [data1[i], data2[i]];
            }

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                    .attr("width", '100%')
                    .attr("height", '100%')
                    .attr("viewBox", "0 0 " + w + " " + h);

            var x = d3.scale.linear().domain([0, 100]).range([left_pad, w - pad]),
                y = d3.scale.linear().domain([300, 0]).range([pad, h - pad * 2]);

            var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");

            svg.append("g")
                .attr("transform", "translate(0," + (h - pad) + ")")
                .call(xAxis);
            svg.append("g")
                .attr("transform", "translate(" + left_pad + ",0)")
                .call(yAxis);
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", w).attr("y", h - 30).text("Amount of lines changed");
            svg.append("text")
                .attr("text-anchor", "begin")
                .attr("x", 0).attr("y", 15)
                .text("Time spent looking at pull request");

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function () { return 0 + left_pad; })
                .attr("cy", function () { return h - pad; })
                .attr("r", 5).on("mouseover", function () { return tooltip.style("visibility", "visible"); })
            .on("mousemove", function () {
                return tooltip.style("top",
                    (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () { return tooltip.style("visibility", "hidden"); })
                    .transition()
                        .attr("cx", function (d) { return x(d[0]); })
                        .attr("cy", function (d) { return y(d[1]); });


            // from http://stackoverflow.com/questions/10805184/d3-show-data-on-mouseover-of-circle
            var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .text("Pull request information");
            return svg[0];
        }
    };
});
