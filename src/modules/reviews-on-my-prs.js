/* globals define, ForceLayoutAggregator, globalUserName */
define(function () {

    var data = [
        {"repo":"mboom/TI2806","reviews":[
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"repo":"agudek/demo","reviews":[
            {"username":"lvdoorn","session_start":"2016-06-06T13:08:30Z"}
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"},
            {"username":"DaanvanderValk","session_start":"2016-06-06T13:08:30Z"},
            {"username":"agudek","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/5946456?v=3&s=40"},
            {"username":"breijm","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"repo":"agudek/demo","reviews":[]}
    ]

    var width = 720,
        height = 755;

    return {
        name: 'reviews-on-my-prs',
        title: 'Your reviewed prs',
        size: "m4",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        data: [],
        customSVGSize:[width,height],
        body: function (res) {

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            return g;
        }
    };
});
