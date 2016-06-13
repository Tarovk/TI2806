/* globals define, globalUserName, ReviewOnYourPrsAggregator */
define(function () {
    var width = 720,
        height = 755;

    var yTransform = 0;

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

    function showFive(row) {
        var c = parseInt(row.attr('scrollCount'));
        row.selectAll('g.userblock')
            .style('display',function(d,i) {
                if(i >= c*5 && i < (c+1)*5){
                        return 'initial';
                    } else {
                        return 'none';
                    }
                });
        row.attr('transform','translate('+(-c*470+200)+',0)');
    }

    function addArrows(p, d, c) {
        var l,r;
        l = p.append('polygon')
            .attr('points',"190 90,190 60,175 75")
            .style('fill','transparent')
            .style('transition','fill 0.1s ease')
            .on('click', function() {
                var count = parseInt(c.attr('scrollCount'));
                if(count !== 0) {
                    c.attr('scrollCount', count-1);
                    showFive(c);
                    r.style('fill','gray')
                        .style('cursor','pointer');
                }
                if(count-1 === 0){
                    l.style('fill','transparent')
                        .style('cursor','initial');
                } 
            });


        r = p.append('polygon')
            .attr('points',"695 90,695 60,710 75")
            .style('fill','transparent')
            .style('transition','fill 0.1s ease')
            .on('click', function() {
                var count = parseInt(c.attr('scrollCount'));
                var ceil = Math.ceil(d.reviews.length/5)-1;
                if(count !== ceil) {
                    c.attr('scrollCount', count+1);
                    showFive(c);
                    l.style('fill','gray')
                        .style('cursor','pointer');
                }
                if(count+1 === ceil){
                    r.style('fill','transparent')
                        .style('cursor','initial');
                } 
            });

            if(d.reviews.length > 5) {
                r.style('fill','gray')
                        .style('cursor','pointer');
            }
    }

    function addImages(p, d) {
        var users = p.selectAll('g.userblock')
            .data(d)
            .enter()
            .append("g")
            .attr('class', 'userblock');

        users.append("use")
            .attr("xlink:href","#reviews-on-my-prs-clip-rect")
            .style("stroke-width","4")
            .style("stroke","#A2A2A2");  

        var a = users.append("a")
            .attr("xlink:href", function(d) { 
                return "http://www.github.com/"+d.username;
            });

        a.append("image")
                .attr("xlink:href", function(d) { if(d.picture) {
                        return d.picture;
                    } else {
                        return "https://www.gravatar.com/avatar/a9db2cbc6d4e589aec2d25f67771b85e?s=64&d=identicon&r=PG";
                    } })
                .attr("x", function(d,i) {return i*94+9.5;})
                .attr("y", 30)
                .attr("width", 75)
                .attr("height", 75)
                .attr("clip-path","url(#reviews-on-my-prs-clip")
                .style("cursor", "pointer");

        a.append("text")
                .attr("x",function(d,i) {return i*94+47;})
                .attr("y",125)
                .style("text-anchor","middle")
                .text(function(d) { return d.username;});

        p.attr('scrollCount', 0);
        showFive(p);

        if(d.length === 0) {
            p.append('text')
                .attr('x',235)
                .attr('y',85)
                .style('font-size','1.6em')
                .style('text-anchor','middle')
                .text("No known peer reviews");
        }
    }

    function addPrs(p, d) {
        for(var i = 0 ; i < d.length ; i++) {
            var row = p.append('g')
                .attr('class','reviews-on-my-prs-row')
                .attr('transform','translate(0,'+i*150+')');

            var imgContainer = row.append('g')
                .attr('class','reviews-on-my-prs-imageContainer');

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
        title: 'Reviews on your PRs',
        size: "m4",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        customSVGSize:{w:width,h:height},
        SVGoverflow:'hidden',
        data: [{
            "serviceCall": function () { return new ReviewOnYourPrsAggregator(globalUserName, "GitHub"); },
            "required": true
        }],
        body: function (result) {
            var data = result[0];
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width',720)
                .attr('height',750)
                .style('fill','transparent');

            container = g.append('g')
                .attr('class','reviews-on-my-prs-scrollContainer')
                .attr('transform','translate(0,0)');


            function scroll(event) {
                var delta = -event.originalEvent.wheelDelta;
                if(delta < 0 && yTransform === 0 || delta > 0 && yTransform <= -100*data.length) {
                    return;
                }
                if(delta < 0 && yTransform-delta > 0) {
                    yTransform = 0;
                } else if(delta > 0 && yTransform-delta > 100*data.length){
                    yTransform = -100*data.length;
                } else {
                    yTransform -= delta;
                }
                container.transition()
                    .duration(300)
                    .attr('transform','translate(0,'+yTransform+')');
                event.preventDefault();
            }

            $(g.node()).bind('mousewheel', scroll);


            addPrs(container,data);

            return g;
        }
    };
});
