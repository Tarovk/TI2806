/* globals define, Graph2Aggregator, globalUserName */
define(function () {
    var w = 720,
    h = 350,
    pad = 50,
    padTop = 10,
    padBottom = 50,
    maxNumberOfSessions = 0,

    matrix = [],
    maxY = 0,
    remapped = [[]].map(function (dat, i) {
        return matrix.map(function (d, ii) {
            return { x: ii, y: d[i + 1] };
        });
    }),
    stacked = d3.layout.stack()(remapped),
    x = d3.scale.ordinal()
        .domain(stacked[0].map(function (d) { return d.x; }))
        .rangeRoundBands([pad, w - pad]),
    y = d3.scale.linear()
        .domain([0, d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; })])
        .range([0, h - padBottom - padTop]),
    yAxisRange = d3.scale.linear()
        .domain([d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; }), 0])
        .range([0, h - padBottom - padTop]),
    z = d3.scale.ordinal().range([
        'rgba(51, 125, 212, 0.50)',
        'rgba(212, 51, 51, 0.50)'
    ]);

    function updateData(data) {
        var mapping = [];
        for (var i = 0; i < data.length; ++i) {
            if (data[i].length - 1 > maxNumberOfSessions - 1) {
                maxNumberOfSessions = data[i].length - 1;
            }
        }
        for (i = 1; i <= maxNumberOfSessions; ++i) {
            mapping.push('c' + i);
        }
        for (i = 0; i < data.length; ++i) {
            var sum = 0;
            for (var j = 1; j < data[i].length; ++j) {
                sum += data[i][j];
            }
            maxY = Math.max(maxY, sum);
        }
        remapped = mapping.map(function (dat, i) {
            return data.map(function (d, ii) {
                var yval = d[i + 1];
                if(yval === undefined){
                    yval = 0;
                }
                return { x: ii, y: yval };
            });
        });
        stacked = d3.layout.stack()(remapped);
        x.domain(stacked[0].map(function (d) { return d.x; }));
        y.domain([0, maxY]);
        yAxisRange.domain([0, d3.max(stacked[stacked.length - 1],
            function (d) { return d.y0 + d.y; })]);
    }

    return {
        name: 'session-duration-per-pr',
        title: 'Session durations per pull-request',
        xAxisLabel: 'Pull-requests',
        yAxisLabel: 'Sessions and session duration',
        parentSelector: '#project-modules',
        data: [{
            'serviceCall': function () { return new Graph2Aggregator(globalUserName, 10); },
            'required': true
        }],
        xAxisFitFunction: function (res) {
            return d3.svg.axis().scale(x).tickValues(res[0].map(function (d) { return d[0]; }));
        },
        yAxisFitFunction: function () {
            return d3.svg.axis().scale(y);
        },
        body: function (res) {
            updateData(res[0]);

            // create canvas
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'));

            // Add a group for each column.
            var valgroup = g.selectAll('.valgroup')
            .data(stacked)
            .enter().append('svg:g')
            .attr('class', 'valgroup')
            .style('fill', function (d, i) { return z(i); });

            // Add a rect for each date.
            valgroup.selectAll('rect')
            .data(function (d) { return d; })
            .enter().append('svg:rect')
            .attr('x', function (d) { return x(d.x); })
            .attr('y', function (d) { 
                return h - padBottom - y(d.y0) - y(d.y); 
            })
            .attr('height', function (d) { 
                return y(d.y); 
            })
            .attr('width', 50);

            return g;
        }
    };
});