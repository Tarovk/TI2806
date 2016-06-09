/* globals define */
define(function () {
    var w = 600,
        h = 360,
        data = { "sessions":
            [
                {"id":"1","status":"11","duration":35,"repo":"mboom/TI2806"},
                {"id":"12","status":"2","duration":38,"repo":"mboom/TI2806"},
                {"id":"15","status":"21","duration":15,"repo":"mboom/TI2806"},
                {"id":"21","status":"2","duration":57,"repo":"mboom/TI2806"},
                {"id":"25","status":"2","duration":45,"repo":"mboom/TI2806"},
                {"id":"71","status":"0","duration":4,"repo":"agudek/repo"},
                {"id":"31","status":"2","duration":24,"repo":"mboom/TI2806"},
                {"id":"41","status":"1","duration":44,"repo":"mboom/TI2806"},
                {"id":"52","status":"2","duration":7,"repo":"mboom/TI2806"},
                {"id":"63","status":"1","duration":25,"repo":"mboom/TI2806"},
                {"id":"71","status":"11","duration":4,"repo":"mboom/TI2806"},
                {"id":"1","status":"11","duration":35,"repo":"agudek/demo0"},
                {"id":"12","status":"21","duration":38,"repo":"agudek/demo0"},
                {"id":"15","status":"1","duration":15,"repo":"agudek/demo0"},
                {"id":"21","status":"2","duration":57,"repo":"agudek/demo0"},
                {"id":"25","status":"1","duration":45,"repo":"agudek/demo0"},
                {"id":"31","status":"2","duration":24,"repo":"agudek/demo0"},
                {"id":"41","status":"2","duration":44,"repo":"agudek/demo0"},
                {"id":"52","status":"0","duration":7,"repo":"agudek/demo0"},
                {"id":"63","status":"0","duration":25,"repo":"agudek/demo0"}
            ]
        };

    var pieLayout = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d; });

    var pieArc = d3.svg.arc()
        .outerRadius(170 - 10)
        .innerRadius(0);

    function createCard(parent, id) {
        return parent.append('div')
                .attr('id',id)
                .attr("class","dashboard-m4-module-module col s12 m4")
                    .append('div')
                    .attr('class','card hoverable')
                    .style("padding", "20px 30px");
    }

    function createSVG(parent) {
        var svg = parent.append('svg')
            .attr('w','100%')
            .attr('h','100%')
            .attr('viewBox','0 0 '+w+' '+h);
            return svg;
    }

    function createPieData(data) { 
        var d = [];
        var m = data.sessions.filter(function (n) {
            return n.status === "1" || n.status === "11";
        }).length;
        var c = data.sessions.filter(function (n) {
            return n.status === "2" || n.status === "21";
        }).length;
        var a = data.sessions.length-m-c;
        d.push(c);
        d.push(a);
        d.push(m);
        return d;
    }
    function addPieChartText(g, piedata) {
        g.append('text')
            .attr('y','10')
            .style('text-anchor','middle')
            .style('font-size','5em')
            .style('font-weight','700')
            .style('fill','#484848')
            .text(data.sessions.length);

        g.append('text')
            .attr('y','35')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("Peer reviews");

        g.append('text')
            .attr('x','-220')
            .attr('y','-30')
            .style('text-anchor','middle')
            .style('font-size','4em')
            .style('fill','#484848')
            .text(piedata[2]);

        g.append('text')
            .attr('x','-220')
            .attr('y','-5')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("Merged");

        g.append('text')
            .attr('x','220')
            .attr('y','-30')
            .style('text-anchor','middle')
            .style('font-size','4em')
            .style('fill','#484848')
            .text(piedata[0]);

        g.append('text')
            .attr('x','220')
            .attr('y','-5')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("Closed");
    }

    function addPieChartLines(g,piearcdata) {
        g.append('line')
            .attr('x1',"-190")
            .attr('y1',"-40")
            .attr('x2',"-170")
            .attr('y2',"-40")
            .style("stroke-width","3px")
            .style("stroke","gray");

        g.append('line')
            .attr('x1',"190")
            .attr('y1',"-40")
            .attr('x2',"140")
            .attr('y2',"-40")
            .style("stroke-width","3px")
            .style("stroke","gray");

        var mcentery = -130*Math.sin((2*Math.PI-piearcdata[2].endAngle)),
        ccenterx = 130*Math.sin(piearcdata[0].endAngle/2),
        ccentery = -130*Math.cos(piearcdata[0].endAngle/2); 

        g.append('line')
            .attr('x1',"-170")
            .attr('y1',"-40")
            .attr('x2',"-150")
            .attr('y2',mcentery)
            .style("stroke-width","3px")
            .style("stroke","gray");

        g.append('line')
            .attr('x1',"-150")
            .attr('y1',mcentery)
            .attr('x2',"-100")
            .attr('y2',mcentery)
            .style("stroke-width","3px")
            .style("stroke","gray");


        g.append('line')
            .attr('x1',"140")
            .attr('y1',"-40")
            .attr('x2',ccenterx)
            .attr('y2',ccentery)
            .style("stroke-width","3px")
            .style("stroke","gray");
    }

    function drawPieChart(svg,arr){
        var g = svg.append('g').attr("class","piecontent");

        var piedata = createPieData(arr);
        var piearcdata = pieLayout(piedata);

        var arcs = g.selectAll(".arc")
            .data(piearcdata)
            .enter().append("g")
            .attr("class", "arc")
            .on("mouseover",function(){
                d3.select(this)
                    .style("transform","scale(1.05)");
            })
            .on("mouseout",function() {
                d3.select(this)
                    .style("transform","scale(1)");
            });

        arcs.append("path")
            .attr("d", pieArc)
            .style("fill", function(d,i) { 
                if(i === 0) {
                    return "rgb(228, 74, 74)"; 
                } else if(i === 1) {
                    return "#E8DD79";
                } else {
                    return "#61B361";
                }
            });

        g.append('circle')
            .attr('cx','0')
            .attr('cy','0')
            .attr('r','90')
            .style('fill','white');

        addPieChartText(g, piedata);
        addPieChartLines(g, piearcdata);
        return g;
    }

    function drawMergedByYouBar(svg, data) {
        var m = data.sessions.filter(function (n) {
            return n.status === "1" || n.status === "11";
        }).length;
        var mby = data.sessions.filter(function (n) {
            return n.status === "11";
        }).length;

        var yscale = d3.scale.linear().domain([0,m]).range([0,260]);
        svg.append("rect")
            .attr("x","50")
            .attr("y","50")
            .attr("width","100")
            .attr("height","260")
            .style("fill","rgb(210, 210, 210)");

        svg.append("rect")
            .attr("x","50")
            .attr("y",310-yscale(mby))
            .attr("width","100")
            .attr("height",yscale(mby))
            .style("fill","rgb(97, 179, 97)");

        svg.append("text")
            .attr("x","300")
            .attr("y","180")
            .style("text-anchor","end")
            .style("font-size","6em")
            .style("font-weight","700")
            .text(mby);

        svg.append("text")
            .attr("x","305")
            .attr("y","210")
            .style("font-size","8em")
            .style("font-weight","200")
            .text("/");


        svg.append("text")
            .attr("x","355")
            .attr("y","220")
            .style("text-anchor","start")
            .style("font-size","4em")
            .style("font-weight","300")
            .text(m); 

        svg.append('text')
            .attr('x','250')
            .attr('y','300')            
            .style('font-size','1.6em')
            .style('fill','#484848')
            .style("font-size","2em")
            .text("Merged by you");
    }

    function drawClosedByYouBar(svg, data) {
        var c = data.sessions.filter(function (n) {
            return n.status === "2" || n.status === "21";
        }).length;
        var cby = data.sessions.filter(function (n) {
            return n.status === "21";
        }).length;

        var yscale = d3.scale.linear().domain([0,c]).range([0,260]);
        svg.append("rect")
            .attr("x","50")
            .attr("y","50")
            .attr("width","100")
            .attr("height","260")
            .style("fill","rgb(210, 210, 210)");

        svg.append("rect")
            .attr("x","50")
            .attr("y",310-yscale(cby))
            .attr("width","100")
            .attr("height",yscale(cby))
            .style("fill","rgb(228, 74, 74)");

        svg.append("text")
            .attr("x","300")
            .attr("y","180")
            .style("text-anchor","end")
            .style("font-size","6em")
            .style("font-weight","700")
            .text(cby);

        svg.append("text")
            .attr("x","305")
            .attr("y","210")
            .style("font-size","8em")
            .style("font-weight","200")
            .text("/");

        svg.append("text")
            .attr("x","355")
            .attr("y","220")
            .style("text-anchor","start")
            .style("font-size","4em")
            .style("font-weight","300")
            .text(c); 

        svg.append('text')
            .attr('x','250')
            .attr('y','300')            
            .style('font-size','1.6em')
            .style('fill','#484848')
            .style("font-size","2em")
            .text("Closed by you");
    }

    function drawDuration(svg,data) {
        svg.append('line')
            .attr('x1',"80")
            .attr('y1',"50")
            .attr('x2',"80")
            .attr('y2',"300")
            .style("stroke-width","3px")
            .style("stroke","gray"); 

        svg.append('line')
            .attr('x1',"60")
            .attr('y1',"50")
            .attr('x2',"100")
            .attr('y2',"50")
            .style("stroke-width","3px")
            .style("stroke","gray"); 

        svg.append('line')
            .attr('x1',"60")
            .attr('y1',"300")
            .attr('x2',"100")
            .attr('y2',"300")
            .style("stroke-width","3px")
            .style("stroke","gray");   

        var avgtime = 0;
        $.each(data.sessions, function () {
            avgtime += this.duration;
        });
        avgtime /= data.sessions.length;
        var maxtime = Math.max.apply(Math,data.sessions.map(function(o){return o.duration;}));
        var mintime = Math.min.apply(Math,data.sessions.map(function(o){return o.duration;}));

        var yscale = d3.scale.linear().domain([mintime,maxtime]).range([300,50]);

        svg.append('line')
            .attr('x1',"60")
            .attr('y1',yscale(avgtime))
            .attr('x2',"100")
            .attr('y2',yscale(avgtime))
            .style("stroke-width","3px")
            .style("stroke","red");   

        svg.append("text")
            .attr("x","120")
            .attr("y","60")
            .style("font-size","2em")
            .style("font-weight","300")
            .text(maxtime+" Minutes"); 

        svg.append("text")
            .attr("x","120")
            .attr("y","310")
            .style("font-size","2em")
            .style("font-weight","300")
            .text(mintime+" Minutes"); 

        svg.append("text")
            .attr("x","140")
            .attr("y","200")
            .style("font-size","8em")
            .style("font-weight","500")
            .text(avgtime); 

        svg.append("text")
            .attr("x","140")
            .attr("y","240")
            .style("font-size","2em")
            .style("font-weight","300")
            .text("Average peer review duration"); 
    }

    function drawReviewRepos(svg,data) {
        var orderedbyrepos = [];
        $.each(data.sessions, function () {
            if(orderedbyrepos[this.repo] === undefined) {
                orderedbyrepos[this.repo] = [this];
            } else {
                orderedbyrepos[this.repo].push(this);
            }
        });
        var numeric_array = [];
        for (var items in orderedbyrepos){
            numeric_array.push( orderedbyrepos[items] );
        }
        numeric_array.sort(function(a, b){return b.length-a.length;});

        var yscale = d3.scale.linear().domain([0,numeric_array[0].length]).range([0,260]);
        
        if(numeric_array[2]) {
            svg.append('rect')
                .attr('x',"60")
                .attr('y',310-yscale(numeric_array[2].length))
                .attr('width',"60")
                .attr('height',yscale(numeric_array[2].length))
                .style('fill',"rgb(77, 136, 255)");
        }

        if(numeric_array[1]) {
            svg.append('rect')
                .attr('x',"140")
                .attr('y',310-yscale(numeric_array[1].length))
                .attr('width',"60")
                .attr('height',yscale(numeric_array[1].length))
                .style('fill',"rgb(77, 136, 255)");
        }
        
        var max = 0;
        if(numeric_array[0]) {   
            max = numeric_array[0].length;     
            svg.append('rect')
                .attr('x',"220")
                .attr('y',310-yscale(numeric_array[0].length))
                .attr('width',"60")
                .attr('height',yscale(numeric_array[0].length))
                .style('fill',"rgb(77, 136, 255)");
        }
        
        svg.append('line')
            .attr('x1',"50")
            .attr('y1',"310")
            .attr('x2',"290")
            .attr('y2',"310")
            .style("stroke-width","3px")
            .style("stroke","lightgray");

        svg.append("text")
            .attr("x","320")
            .attr("y","200")
            .style("font-size","8em")
            .style("font-weight","500")
            .text(max);   

        svg.append("text")
            .attr("x","320")
            .attr("y","240")
            .style("font-size","2em")
            .style("font-weight","300")
            .text("peer reviews on");   

        svg.append("text")
            .attr("x","320")
            .attr("y","270")
            .style("font-size","2em")
            .style("font-weight","300")
            .text("repository"); 

        svg.append("text")
            .attr("x","320")
            .attr("y","310")
            .style("font-size","2.25em")
            .style("font-weight","400")
            .text(numeric_array[0][0].repo);         
    }

    function drawActionRepos(svg,data) {
        var orderedbyrepos = [];
        $.each(data.sessions, function () {
            if(this.status === "11" || this.status === "21") {
                if(orderedbyrepos[this.repo] === undefined) {
                    orderedbyrepos[this.repo] = [this];
                } else {
                    orderedbyrepos[this.repo].push(this);
                }
            }
        });
        var numeric_array = [];
        for (var items in orderedbyrepos){
            numeric_array.push( orderedbyrepos[items] );
        }
        numeric_array.sort(function(a, b){return b.length-a.length;});
        var yscale = d3.scale.linear().domain([0,numeric_array[0].length]).range([0,260]);

        var m,c;
        if(numeric_array[2]){
            m = numeric_array[2].filter(function (n) {
                return n.status === "11";
            }).length;
            c = numeric_array[2].filter(function (n) {
                return n.status === "21";
            }).length;
            svg.append('rect')
                .attr('x',"60")
                .attr('y',310-yscale(m+c))
                .attr('width',"60")
                .attr('height',yscale(m))
                .style('fill',"rgb(97, 179, 97)");
            svg.append('rect')
                .attr('x',"60")
                .attr('y',310-yscale(c))
                .attr('width',"60")
                .attr('height',yscale(c))
                .style('fill',"rgb(228, 74, 74)");
        }

        if(numeric_array[1]){
            m = numeric_array[1].filter(function (n) {
                return n.status === "11";
            }).length;
            c = numeric_array[1].filter(function (n) {
                return n.status === "21";
            }).length;
            svg.append('rect')
                .attr('x',"140")
                .attr('y',310-yscale(m+c))
                .attr('width',"60")
                .attr('height',yscale(m))
                .style('fill',"rgb(97, 179, 97)");
            svg.append('rect')
                .attr('x',"140")
                .attr('y',310-yscale(c))
                .attr('width',"60")
                .attr('height',yscale(c))
                .style('fill',"rgb(228, 74, 74)");
        }

        var max = 0;
        if(numeric_array[0]){
            m = numeric_array[0].filter(function (n) {
                return n.status === "11";
            }).length;
            c = numeric_array[0].filter(function (n) {
                return n.status === "21";
            }).length;
            max = m+c;
            svg.append('rect')
                .attr('x',"220")
                .attr('y',310-yscale(m+c))
                .attr('width',"60")
                .attr('height',yscale(m))
                .style('fill',"rgb(97, 179, 97)");
            svg.append('rect')
                .attr('x',"220")
                .attr('y',310-yscale(c))
                .attr('width',"60")
                .attr('height',yscale(c))
                .style('fill',"rgb(228, 74, 74)");
        }

        svg.append('line')
            .attr('x1',"50")
            .attr('y1',"310")
            .attr('x2',"290")
            .attr('y2',"310")
            .style("stroke-width","3px")
            .style("stroke","lightgray");


        svg.append("text")
            .attr("x","320")
            .attr("y","200")
            .style("font-size","8em")
            .style("font-weight","500")
            .text(max);   

        svg.append("text")
            .attr("x","320")
            .attr("y","240")
            .style("font-size","2em")
            .style("font-weight","300")
            .text("actions taken on");   

        svg.append("text")
            .attr("x","320")
            .attr("y","270")
            .style("font-size","2em")
            .style("font-weight","300")
            .text("repository"); 

        svg.append("text")
            .attr("x","320")
            .attr("y","310")
            .style("font-size","2.25em")
            .style("font-weight","400")
            .text(numeric_array[0][0].repo);  
    }

    return {
        name: 'dashboard-m4-modules',
        size: "m12 l12",
        parentSelector: '#dashboard-modules',
        customContainer: true,
        body: function () {
            var ret = d3.select(document.createElement('div'))
                .attr("class","row")
                .style("margin-left","-0.75em")
                .style("margin-right", "-0.75em");

                var allsessionspie = createCard(ret, 'dashboard-m4-module-sessions-allsessionspie'),
                mergedbyyoubar = createCard(ret, 'dashboard-m4-module-sessions-mergedbyyoubar'),
                closedbyyoubar = createCard(ret, 'dashboard-m4-module-sessions-closedbyyoubar'),
                averagetime = createCard(ret, 'dashboard-m4-module-sessions-averagetime'),
                reviewrepos = createCard(ret, 'dashboard-m4-module-sessions-reviewrepos'),
                actionrepos = createCard(ret, 'dashboard-m4-module-sessions-actionrepos');

                allsessionspie.svg = createSVG(allsessionspie);
                mergedbyyoubar.svg = createSVG(mergedbyyoubar);
                closedbyyoubar.svg = createSVG(closedbyyoubar);
                averagetime.svg = createSVG(averagetime);
                reviewrepos.svg = createSVG(reviewrepos);
                actionrepos.svg = createSVG(actionrepos);

                drawPieChart(allsessionspie.svg,data)
                    .style("transform","translate("+300+"px,"+180+"px)");
                drawMergedByYouBar(mergedbyyoubar.svg,data);
                drawClosedByYouBar(closedbyyoubar.svg,data);
                drawDuration(averagetime.svg,data);
                drawReviewRepos(reviewrepos.svg,data);
                drawActionRepos(actionrepos.svg,data);

            return ret;
        }
    };
});
