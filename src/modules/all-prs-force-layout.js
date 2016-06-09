/* globals define */
define(function () {
    var graph = {
        "nodes" : 
            [
                {"name":"user","type":"user","src":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},

                {"name":"repo1","type":"repo","title":"mboom/TI2806"},
                {"name":"repo2","type":"repo","title":"agudek/repo0"},
                {"name":"repo3","type":"repo","title":"agudek/demo"},

                {"id":"2","name":"Grunt init for jquery","type":"pr","size":5,"status":1,"repo":"mboom/TI2806"},
                {"id":"185","name":"Created test file for a module to test if it works",
                    "type":"pr","size":7,"status":2,"repo":"mboom/TI2806"},
                {"id":"26","name":"Architecture design","type":"pr","size":13,"status":1,"repo":"mboom/TI2806"},

                {"id":"pr1","name":"repo0","type":"pr","size":2,"status":11,"repo":"agudek/repo0"},
                {"id":"pr4","name":"repo0","type":"pr","size":5,"status":1,"repo":"agudek/repo0"},
                {"id":"pr7","name":"repo0","type":"pr","size":9,"status":21,"repo":"agudek/repo0"},
                {"id":"pr13","name":"repo0","type":"pr","size":3,"status":0,"repo":"agudek/repo0"},
                {"id":"pr21","name":"repo0","type":"pr","size":15,"status":1,"repo":"agudek/repo0"},
                {"id":"pr26","name":"repo0","type":"pr","size":12,"status":0,"repo":"agudek/repo0"},
                {"id":"pr37","name":"repo0","type":"pr","size":5,"status":1,"repo":"agudek/repo0"},

                {"id":"pr53","name":"demo","type":"pr","size":25,"status":1,"repo":"agudek/demo"},
                {"id":"pr79","name":"demo","type":"pr","size":15,"status":1,"repo":"agudek/demo"}
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
        }
    };

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .direction("e")
        .offset([0, 15])
        .html(function(d) {
            return "<div><a style='color:black;font-size:small'"+
                    " href='http://www.github.com/"+d.repo+"/pull/"+d.id+"'>#" + d.id +
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

    return {
        name: 'all-prs-force-layout',
        title: 'Peer reviews by you',
        size: "l12",
        parentSelector: '#dashboard-modules',
        xAxis: false,
        yAxis: false,
        yRightAxis: false,
        data: [{
            'serviceCall': function () { return new ForceLayoutAggregator('Travis'); },
            'required': true
        }],
        body: function (res) {
            console.log(res[0]);
            force
              .nodes(graph.nodes)
              .links(graph.links)
              .start();
            
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

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
                    .attr("r",function(d) { return d.size; })
                    .style("fill", function(d) { 
                        if(d.status === 1 || d.status === 11) {
                            return "#61B361";
                        } else if(d.status === 2 || d.status === 21) {
                            return "#E44A4A";
                        } else {
                            return "#F5E661";
                        }
                    })
                    .style("cursor", "pointer")
      .on('mouseover', function(d) { return tip.show(d);})
      .on('mouseout', tip.hide);

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
