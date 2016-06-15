/* globals define, BehaviourAggregator, globalUserName */
define(function () {
    var w = 600,
        h = 360;

    var generalActions,
        definitiveClicks,
        comments;

    var pieLayout = d3.layout.pie()
        .value(function(d) { return d; });

    var pieArc = d3.svg.arc()
        .outerRadius(170 - 10)
        .innerRadius(95)
        .startAngle( function ( d ) { return isNaN( d.startAngle ) ? 0 : d.startAngle; })
        .endAngle( function ( d ) { return isNaN( d.endAngle ) ? 0 : d.endAngle; });

    function createCard(parent, id) {
        return parent.append('div')
                .attr('id',id)
                .attr("class","behaviour-m4-module-module col s12 m4")
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

    function drawTotals(p, d) {
        p.append('text')
            .attr('x',40)
            .attr('y',80)
            .style('font-size','6em')
            .style('font-weight',500)
            .text(d.keystrokes);

        p.append('text')
            .attr('x',40)
            .attr('y',110)
            .style('font-size','1.6em')
            .style('font-weight',300)
            .text('keystrokes');

        p.append('text')
            .attr('x',560)
            .attr('y',195)
            .style('text-anchor','end')
            .style('font-size','6em')
            .style('font-weight',500)
            .text(d.clicks.total);

        p.append('text')
            .attr('x',560)
            .attr('y',225)
            .style('text-anchor','end')
            .style('font-size','1.6em')
            .style('font-weight',300)
            .text('clicks');

        p.append('text')
            .attr('x',40)
            .attr('y',310)
            .style('font-size','6em')
            .style('font-weight',500)
            .text(d.scrolls);

        p.append('text')
            .attr('x',40)
            .attr('y',340)
            .style('font-size','1.6em')
            .style('font-weight',300)
            .text('scrolls');
    }

    function createPieData(data) { 
        if(!data.clicks || data.clicks.merge+data.clicks.close===0) {
            return [0,0,1];
        } else {
            return [data.clicks.merge, data.clicks.close];
        }
    }

    function addPieChartText(g, data, piedata) {
        g.append('text')
            .attr('y','10')
            .style('text-anchor','middle')
            .style('font-size','5em')
            .style('font-weight','700')
            .style('fill','#484848')
            .text(piedata[0]+piedata[1]);

        g.append('text')
            .attr('y','35')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("Decisive clicks");

        g.append('text')
            .attr('x','-220')
            .attr('y','-130')
            .style('text-anchor','middle')
            .style('font-size','4em')
            .style('fill','#484848')
            .text(piedata[1]);

        g.append('text')
            .attr('x','-220')
            .attr('y','-105')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("On merge button");

        g.append('text')
            .attr('x','220')
            .attr('y','120')
            .style('text-anchor','middle')
            .style('font-size','4em')
            .style('fill','#484848')
            .text(piedata[0]);

        g.append('text')
            .attr('x','220')
            .attr('y','145')
            .style('text-anchor','middle')
            .style('font-size','1.6em')
            .style('fill','#484848')
            .text("On close button");
    }

    function drawClicksPie(svg, data){
        var g = svg.append('g').attr("class","piecontent");

        var piedata = createPieData(data);
        var piearcdata = pieLayout(piedata);

        var arcs = g.selectAll(".arc")
            .data(piearcdata)
            .enter().append("g")
            .attr("class", "arc")
            .style("transition","transform 0.2s ease")
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
                } else if (i === 1) {
                    return "#61B361";
                } else {
                    return 'lightgray';
                }
            });

        addPieChartText(g, data, piedata);
        return g;
    }

    function drawCommentsBar(p, d) {
        var pr = d.comments.pr,
            inline = d.comments.inline,
            edits = d.comments.edits,
            total = pr+inline+edits,
            yscale = d3.scale.linear().domain([0,total]).range([0,260]);
        
        p.append("rect")
            .attr("x","50")
            .attr("y",310-yscale(pr))
            .attr("width","100")
            .attr("height",yscale(pr))
            .style("fill","rgb(77, 136, 255)");

        p.append("rect")
            .attr("x","50")
            .attr("y",50)
            .attr("width","100")
            .attr("height",yscale(edits))
            .style("fill","rgb(214, 133, 243)");

        p.append("rect")
            .attr("x","50")
            .attr("y",50+yscale(edits))
            .attr("width","100")
            .attr("height",yscale(inline))
            .style("fill","#61B361");

        p.append("text")
            .attr("x","200")
            .attr("y","80")
            .style("font-size","5em")
            .style("font-weight","500")
            .text(edits);

        p.append("text")
            .attr("x","200")
            .attr("y","200")
            .style("font-size","5em")
            .style("font-weight","500")
            .text(inline);


        p.append("text")
            .attr("x","200")
            .attr("y","320")
            .style("font-size","5em")
            .style("font-weight","500")
            .text(pr); 

        p.append('text')
            .attr('x','200')
            .attr('y','345')            
            .style('font-size','1.6em')
            .text("Comments on PR");

        p.append('text')
            .attr('x','200')
            .attr('y','225')            
            .style('font-size','1.6em')
            .text("Comments on code");

        p.append('text')
            .attr('x','200')
            .attr('y','105')            
            .style('font-size','1.6em')
            .text("Edited comments");
    }

    return {
        name: 'behaviour-m4-modules',
        size: "m12 l12",
        parentSelector: '#behaviour-modules',
        customContainer: true,
        data: [{
            "serviceCall": function () { return new BehaviourAggregator(globalUserName); },
            "required": true
        }],
        prebody: function() {
            var ret = d3.select(document.createElement('div'))
                .attr("class","row")
                .style("margin-left","-0.75em")
                .style("margin-right", "-0.75em")
                .style("margin-bottom","0px");

                generalActions = createCard(ret, 'behaviour-m4-module-sessions-generalActions');
                definitiveClicks = createCard(ret, 'behaviour-m4-module-sessions-definitiveClicks');
                comments = createCard(ret, 'behaviour-m4-module-sessions-comments');

                generalActions.svg = createSVG(generalActions);
                definitiveClicks.svg = createSVG(definitiveClicks);
                comments.svg = createSVG(comments);

                $(generalActions.node()).append($('#spinner-template').html());
                $(definitiveClicks.node()).append($('#spinner-template').html());
                $(comments.node()).append($('#spinner-template').html());

            return ret;
        },
        body: function (res) {
            var data = res[0];
            drawTotals(generalActions.svg,data);
            drawClicksPie(definitiveClicks.svg,data)
                .style("transform","translate("+300+"px,"+180+"px)");
            drawCommentsBar(comments.svg,data);


            $(generalActions.node()).find(".spinner").addClass("hidden");
            $(definitiveClicks.node()).find(".spinner").addClass("hidden");
            $(comments.node()).find(".spinner").addClass("hidden");

        }
    };
});
