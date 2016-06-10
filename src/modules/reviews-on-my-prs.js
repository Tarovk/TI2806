/* globals define, ForceLayoutAggregator, globalUserName */
define(function () {

    var data = [
        {"pr":"17","repo":"mboom/TI2806","reviews":[
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"pr":"34","repo":"agudek/demo","reviews":[
            {"username":"lvdoorn","session_start":"2016-06-06T13:08:30Z"},
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"},
            {"username":"DaanvanderValk","session_start":"2016-06-06T13:08:30Z"},
            {"username":"agudek","session_start":"2016-06-06T13:08:30Z","picture":"https://avatars2.githubusercontent.com/u/5946456?v=3&s=40"},
            {"username":"breijm","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"pr":"42","repo":"agudek/demo","reviews":[]},
        {"pr":"6","repo":"agudek/demo1","reviews":[]},
        {"pr":"2","repo":"agudek/demo2","reviews":[]},
        {"pr":"13","repo":"agudek/demo3","reviews":[]},
        {"pr":"62","repo":"agudek/demo4","reviews":[]}
    ]

    var width = 720,
        height = 755;

    var container;

    function addText(p, d) {
        p.append('a')
            .attr('href','http://www.github.com/'+d.repo+'/pull/'+d.pr)
            .append('text')
                .attr('x',0)
                .attr('y',80)
                .style('font-size','3em')
                .style('font-weight','500')
                .text(d.pr);

        p.append('a')
            .attr('href','http://www.github.com/'+d.repo)
            .append('text')
                .attr('x',0)
                .attr('y',110)
                .style('font-size','1.6em')
                .style('font-weight','400')
                .text(d.repo);
    }

    function addArrows(p, d, c) {
        // body...
    }

    function addImages(p, d) {
        p.append('rect')
            .attr('x',50)
            .attr('y',50)
            .attr('width',420)
            .attr('height',50)
            .style('stroke','black')
            .style('fill','transparent');
    }

    function addPrs(p, d) {
        for(var i = 0 ; i < d.length ; i++) {
            var row = p.append('g')
                .attr('class','reviews-on-my-prs-row')
                .attr('transform','translate(0,'+i*150+')');

            var imgContainer = row.append('g')
                .attr('class','reviews-on-my-prs-imageContainer')
                .attr('transform','translate(200,0)');

            addText(row,d[i]);
            addArrows(row,d[i],imgContainer);
            addImages(imgContainer,d[i].reviews);

            if(i!==0) {
                row.append('line')
                    .attr('x1',50)
                    .attr('y1',0)
                    .attr('x2',670)
                    .attr('y2',0)
                    .style('stroke','lightgray');
            }
        }
    }

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

            function xZoom() {
                console.log(d3.select(this))
                container.attr("transform", "translate(0," + d3.event.translate[1] + ")");
            }

            var zoom = d3.behavior.zoom()
                .on("zoom", xZoom);

            container = g.append('g')
                .attr('class','reviews-on-my-prs-scrollContainer');

            g.append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width',720)
                .attr('height',750)
                .style('fill','rgba(120,120,120,0.2)')
                .call(zoom);

            addPrs(container,data);

            return g;
        }
    };
});
