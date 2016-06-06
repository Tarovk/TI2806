/* globals define, Graph1Aggregator */
define(function () {
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction("n")
        .offset([-25, 0])
        .html(function(d) {
            return "<div>"+d.y+"</div>"+
                "<div class='arrow-down'></div>";
        }
    );
    return {
        name: 'graph1',
        title: 'Number of pull-request per number of comments',
        parentSelector: '#project-modules',
        xAxisLabel: "Number of comments",
        yAxisLabel: "Number of pull-requests",
        yRightAxisLabel: "",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisLabelRotation: 65,
        yAxisScale: function() { return "fit"; },
        xAxisScale: function() { 
            var domain = ['0-2', '3-5', '5-10', '<10'],
            scale = d3.scale.ordinal()
                .domain(domain)
                .rangePoints(
                    [0.5 * (720 / domain.length - 40), 720 - 2 * 50 - 0.5 * (720 / domain.length - 40)]
                );
            return d3.svg.axis().scale(scale);
        },
        yAxisFitFunction: function (res) {
            var sizeData = res[0],
            domain = ['0-2', '3-5', '5-10', '<10'],
            buckets = [];
            for (var i = 0; i < domain.length; ++i) {
                buckets.push(0);
            }

            function devide(x) {
                switch (true) {
                    case (x > 10): return 3; // > 10
                    case (x >= 6 && x <= 10): return 2; // 6 - 10
                    case (x >= 3 && x <= 5): return 1; // 3 - 5
                    case (x >= 0 && x <= 2): return 0; //0 - 2
                    default: return 0;
                }
            }
            for (i = 0; i < sizeData.length; ++i) {
                var item = sizeData[i];
                buckets[devide(item.x)] += item.y;
            }
            sizeData = [];
            for (i = 0; i < buckets.length; ++i) {
                sizeData.push({ 'x': i, 'y': buckets[i] });
            }
            var maxValue = Math.max.apply(Math, sizeData.map(function (o) { return o.y; }));

            return d3.svg.axis().scale(d3.scale.linear().domain([0,maxValue]));           
         },
        xAxis: true,
        yAxis: true,
        yRightAxis: false,
        legend: [
            {
                "type":"rect",
                "style":"fill:rgb(77, 136, 255);",
                "text":"Number of pull requests with x number of comments"
            }
        ],
        data: [{
            "serviceCall": function () { return new Graph1Aggregator("borek2"); },
            "required": true
        }],
        body: function (res) {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                sizeData = res[0],
                domain = ['0-2', '3-5', '5-10', '<10'],
                buckets = [];
            for (var i = 0; i < domain.length; ++i) {
                buckets.push(0);
            }
            function devide(x) {
                switch (true) {
                    case (x > 10): return 3; // > 10
                    case (x >= 6 && x <= 10): return 2; // 6 - 10
                    case (x >= 3 && x <= 5): return 1; // 3 - 5
                    case (x >= 0 && x <= 2): return 0; //0 - 2
                    default: return 0;
                }
            }
            for (i = 0; i < sizeData.length; ++i) {
                var item = sizeData[i];
                buckets[devide(item.x)] += item.y;
            }
            sizeData = [];
            for (i = 0; i < buckets.length; ++i) {
                sizeData.push({ 'x': i, 'y': buckets[i] });
            }
            var maxValue = Math.max.apply(Math, sizeData.map(function (o) { return o.y; }));

            var xSizeScale = d3.scale.linear()
                    .domain([0, domain.length])
                    .range([pad, w - 30]),
            ySizeScale = d3.scale.linear()
                    .domain([0, maxValue])
                    .range([padTop, h - padBottom]).nice();
            
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.call(tip);

            g.selectAll("rect").data(sizeData).enter()
                .append("rect")
                .attr("x", function (d) { return xSizeScale(d.x); })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (domain.length)) - 40; })
                .attr("height", function (d) { return ySizeScale(d.y); })
                .attr("style", "fill:rgb(77, 136, 255);")
                .on('mouseover', function(d) { return tip.show(d);})
                .on('mouseout', tip.hide)
                .transition()
                .attr("y", function (d) { return h - padBottom - ySizeScale(d.y); });

            return g;
        }
    };
});