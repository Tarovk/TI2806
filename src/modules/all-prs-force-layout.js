/* globals define */
define(function () {
    var graph = {
        "nodes" : 
            [
                {"name":"user","type":"user","src":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},

                {"name":"repo1","type":"repo","title":"mboom/TI2806"},
                {"name":"repo2","type":"repo","title":"agudek/repo0"},
                {"name":"repo3","type":"repo","title":"agudek/demo"},

                {"name":"pr2","type":"pr","size":5,"status":0},
                {"name":"pr14","type":"pr","size":7,"status":2},
                {"name":"pr26","type":"pr","size":13,"status":0},

                {"name":"pr1","type":"pr","size":2,"status":1},
                {"name":"pr4","type":"pr","size":5,"status":1},
                {"name":"pr7","type":"pr","size":9,"status":2},
                {"name":"pr13","type":"pr","size":3,"status":0},
                {"name":"pr21","type":"pr","size":15,"status":1},
                {"name":"pr26","type":"pr","size":12,"status":0},
                {"name":"pr37","type":"pr","size":5,"status":1},

                {"name":"pr53","type":"pr","size":25,"status":1},
                {"name":"pr79","type":"pr","size":15,"status":1}
            ],
        "links" :
            [
                {"source":1,"target":0,"value":1},
                {"source":2,"target":0,"value":1},
                {"source":3,"target":0,"value":1},

                {"source":4,"target":1,"value":1},
                {"source":5,"target":1,"value":1},
                {"source":6,"target":1,"value":1},

                {"source":7,"target":2,"value":1},
                {"source":8,"target":2,"value":1},
                {"source":9,"target":2,"value":1},
                {"source":10,"target":2,"value":1},
                {"source":11,"target":2,"value":1},
                {"source":12,"target":2,"value":1},
                {"source":13,"target":2,"value":1},

                {"source":14,"target":3,"value":1},
                {"source":15,"target":3,"value":1},
            ]
    };

    var width = 720,
        height = 350;

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(50)
        .size([width, height]);



    return {
        name: 'all-prs-force-layout',
        title: 'Peer reviews by you',
        size: "l12",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        body: function () {

            force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
            
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

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
                    .attr("r",function(d) { return d.size; })
                    .style("fill", function(d) { 
                        if(d.status === 0) {
                            return "#F5E661";
                        } else if(d.status === 1) {
                            return "#61B361";
                        } else {
                            return "#E44A4A";
                        }
                    })
                    .style("cursor", "pointer");


            g.selectAll(".pr")
                    .append("text")
                        .attr("x", 0)
                        .attr("y", 4)
                        .attr("text-anchor", "middle")
                        .style("font-size", "10px")
                        .style("-webkit-user-select", "none")
                        .style("cursor", "pointer")
                        .style("pointer-events", "none")
                        .style("font-weight","300")
                        .text(function(d) { return d.size; });

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
                    .attr("xlink:href", "http://www.github.com/agudek" )
                .append("image")
                    .attr("xlink:href", function(d) { return d.src; })
                    .attr("x", -16)
                    .attr("y", -16)
                    .attr("width", 32)
                    .attr("height", 32)
                    .attr("clip-path","url(#all-prs-force-layout-user-clip")
                    .style("cursor", "pointer");

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
