/* globals define, ForceLayoutAggregator, globalUserName, globalPlatform */
define(function () {

    var width = 720,
        height = 350;

    var force = d3.layout.force()
        .charge(-400)
        .linkDistance(40)
        .size([width, height]);

    var statusHTML = function(status) {
        switch (status) {
            case 0 : return "<span style='color:rgb(245, 230, 97)'>open</span>"; 
            case 1 : return "<span style='color:rgb(97, 179, 97)'>merged</span>";
            case 11 : return "<span style='color:rgb(97, 179, 97)'>merged</span>"+
                "<span style='color:lightgray;font-size:small;font-weight:bold;'> by you</span>"+
                "<i style='color: #61B361;margin-left: 5px;' class='material-icons'>&#xE52D;</i>";  
            case 2 : return "<span style='color:rgb(228, 74, 74)'>closed</span>";
            case 21 : return "<span style='color:rgb(228, 74, 74)'>closed</span>"+
                "<span style='color:lightgray;font-size:small;font-weight:bold;'> by you</span>"+
                "<i style='color: #E44A4A;margin-left: 5px;transform:rotate(-90deg);'"+
                " class='material-icons'>&#xE14A;</i>";
            default : return "<span style='color:rgb(77, 136, 255)'>unknown</span>";
        }
    };

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction("e")
        .offset([0, 15])
        .html(function(d) {
            return "<div><a style='color:black;font-size:small'"+
                    " href='"+d.prurl+"'>#" + d.id +
                    " <span style='color:gray'>"+d.name+"</span></a></div>"+
                "<div style='margin-top:-5px;'><a style='color:lightgray;font-size:smaller;'"+
                    " href='http://www.github.com/"+d.repo+"'>" + d.repo + "</a></div>"+
                "<div style='margin-top:5px;''><strong>Review duration : </strong> " + d.size+ 
                    " minutes</span></div>"+
                "<div style='margin-top:5px;''><strong>Status : </strong> " + statusHTML(d.status) +
                    "</span></div>"+
                "<div class='arrow-left'></div>";
        }
    );

    function maxDuration(data) {
        return d3.max($.map(data.nodes, function(el) { return el.size; }));
    }

    return {
        name: 'all-prs-force-layout',
        title: 'Peer reviews by you',
        size: "m8",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        data: [{
            'serviceCall': function () { return new ForceLayoutAggregator(globalUserName, globalPlatform); },
            'required': true
        }],
        body: function (res) {
            var graph = res[0];
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            if(graph === []) {
                return g;
            }

            force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();

            var prScale = d3.scale.linear().domain([0,maxDuration(graph)]).range([3,25]);
            

            g.call(tip);

            var links = g.selectAll(".link")
                .data(graph.links)
                .enter()
                    .append("line")
                    .attr("class", "link")
                    .style("stroke","black")
                    .style("stroke-width", function(d) { return d.value; });

            var nodes = g.selectAll(".node")
                .data(graph.nodes)
                .enter().append("g")
                    .attr("class", function(d) { return "node "+d.type; })
                    .call(force.drag);

            g.selectAll(".pr")
                .append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r",function(d) { return prScale(d.size); })
                    .style("fill", function(d) { 
                        if(d.status === 1 || d.status === 11) {
                            return "#61B361";
                        } else if(d.status === 2 || d.status === 21) {
                            return "#E44A4A";
                        } else if(d.status === 0){
                            return "#F5E661";
                        } else {
                            return "rgb(77, 136, 255)";
                        }
                    })
                    .on('mouseover', function(d) { return tip.show(d);})
                    .on('mouseout', tip.hide);

            g.selectAll(".pr")
                    .append("text")
                        .attr("x", 0)
                        .attr("y", 4)
                        .attr("text-anchor", "middle")
                        .style("font-size", "10px")
                        .style("-webkit-user-select", "none")
                        .style("pointer-events", "none")
                        .style("font-weight","300")
                        .text(function(d) { return "#"+d.id; });

            g.selectAll(".repo")
                .append("a")
                    .attr("xlink:href", function(d) { return "http://www.github.com/"+d.title; })
                .append("rect")
                    .attr("x", -40)
                    .attr("y", -14)
                    .attr("width", 80)
                    .attr("height", 28)
                    .attr("rx","8")
                    .style("fill", "rgba(116, 77, 162, 0.85)")
                    .style("cursor","pointer");

            g.selectAll(".repo")
                    .append("text")
                        .attr("x", 0)
                        .attr("y", 4)
                        .attr("text-anchor", "middle")
                        .style("font-size", "10px")
                        .style("fill", "white")
                        .style("-webkit-user-select", "none")
                        .style("cursor", "pointer")
                        .style("pointer-events", "none")
                        .text(function(d) { return d.title; });

            var def = g.append("defs"); 
                    
            def.append("rect")
                .attr("id","all-prs-force-layout-user-rect")
                .attr("x",-16)
                .attr("y",-16)
                .attr("width",32)
                .attr("height",32)
                .attr("rx",16);

            def.append("clipPath")
                .attr("id","all-prs-force-layout-user-clip")
                    .append("use")
                        .attr("xlink:href","#all-prs-force-layout-user-rect");
            
            g.selectAll(".user")
                .append("use")
                    .attr("xlink:href","#all-prs-force-layout-user-rect")
                    .style("stroke-width","4")
                    .style("stroke","#A2A2A2");

            g.selectAll(".user")
                .append("a")
                    .attr("xlink:href", function(d) {return d.url;} )
                .append("image")
                    .attr("xlink:href", function(d) { 
                        if(d.src !== undefined) {
                            return d.src; 
                        } else {
                            return "../resources/anonymous.png";
                        }
                    })
                    .attr("x", -16)
                    .attr("y", -16)
                    .attr("width", 32)
                    .attr("height", 32)
                    .attr("clip-path","url(#all-prs-force-layout-user-clip")
                    .style("cursor", "pointer");

            g.selectAll(".user")
                .append("text")
                .attr("y",25)
                .style("font-size","0.6em")
                .style("text-anchor","middle")
                .text(function(d) {return d.name;});

            force.on("tick", function() {
                links.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                nodes.attr("transform", function(d) { return "translate("+d.x+","+d.y+")"; });
            });

            return g;
        }
    };
});
