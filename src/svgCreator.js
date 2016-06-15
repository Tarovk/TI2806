/* exported SvgCreator */
/*globals octopeerHelper*/
/*jshint esnext: true */
/* jshint unused : vars */
function SvgCreator() {

    function createSvgContainer(w = 720, h = 350) {
        var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
            	.attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 "+w+" "+h);
        return svg;
    }

        //https://groups.google.com/forum/#!topic/d3-js/AsbOTQskipU
        function d3append(parent, child) {
            parent.select(function() {
                return this.appendChild(child.node());
            });
        }

        function createLeftYAxis(module) {
            var svgSize = octopeerHelper.getSafeModuleValue(module, "customSVGSize");
            var margin = octopeerHelper.getSafeModuleValue(module, "margin");
            var axis;
            if ((axis = octopeerHelper.getSafeModuleValue(module,"yAxisScale")()) === "fit") {
                axis = d3.svg.axis().scale(d3.scale.linear().domain([0,100]).nice());
            }
            axis.orient("left");
            if (octopeerHelper.getScaleType(axis.scale()) === "linear") {
                axis.scale().range([svgSize.h- margin.bottom - margin.top, 0]);
            }
            if(octopeerHelper.getSafeModuleValue(module,"yAxisTicks")) {
                axis.tickSize(-svgSize.w + margin.left + margin.right);
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            var axisContainer = g.append("g")
                .attr("transform", "translate("+ margin.bottom +"," + margin.top + ")")
                .attr("class","yAxis noAxis visibleTicks").call(axis);

            var degrees;
            if((degrees = octopeerHelper.getSafeModuleValue(module,"yAxisLabelRotation")) > 0) {
                axisContainer.selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate("+octopeerHelper.getSafeModuleValue(module,"yAxisLabelRotation")+")")
                    .style("text-anchor", "start");
            }

            if(octopeerHelper.getSafeModuleValue(module,"yAxisLine")) {
                axisContainer.append("line")
                    .attr("y1", svgSize.h - margin.bottom - margin.top)
                    .attr("y2",0)
                    .attr("style","stroke-width:1px;stroke:black");
            }
            return g;
        }

        function createRightYAxis(module) {
            var axis;
            var svgSize = octopeerHelper.getSafeModuleValue(module, "customSVGSize");
            var margin = octopeerHelper.getSafeModuleValue(module, "margin");
            if ((axis = octopeerHelper.getSafeModuleValue(module,"yRightAxisScale")()) === "fit") {
                axis = d3.svg.axis().scale(d3.scale.linear().domain([0,100]).nice());
            }
            
            axis.orient("right");
            if (octopeerHelper.getScaleType(axis.scale()) === "linear") {
                axis.scale().range([svgSize.h- margin.bottom - margin.top, 0]);
            }

            if(octopeerHelper.getSafeModuleValue(module,"yRightAxisTicks")) {
                axis.tickSize(svgSize.w - margin.bottom - margin.top);
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            var axisContainer = g.append("g")
                .attr("transform", "translate("+(720-50)+"," + 10 + ")")
                .attr("class","yRightAxis noAxis visibleTicks").call(axis);

            var degrees;
            if((degrees = octopeerHelper.getSafeModuleValue(module,"yRightAxisLabelRotation")) > 0) {
                axisContainer.selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate("+degrees+")")
                    .style("text-anchor", "start");
            }

            if(octopeerHelper.getSafeModuleValue(module,"yRightAxisLine")) {
                axisContainer.append("line")
                    .attr("y1",350-50-10)
                    .attr("y2",0)
                    .attr("style","stroke-width:1px;stroke:black");
            }
            return g;
        }

        function xAxisOrientAndFit(module, axis) {

            var svgSize = octopeerHelper.getSafeModuleValue(module, "customSVGSize");
            var margin = octopeerHelper.getSafeModuleValue(module, "margin");

            axis.orient("bottom");
            if(typeof axis.scale().rangePoints === "undefined") {
                axis.scale().range([0,svgSize.w - margin.left - margin.bottom]);
            }
        }

        function createXAxis(module) {
            var axis;
            if ((axis = octopeerHelper.getSafeModuleValue(module,"xAxisScale")()) === "fit") {
                axis = d3.svg.axis().scale(d3.scale.linear().domain([0,100]).nice());
            }
            xAxisOrientAndFit(module, axis);

            if(octopeerHelper.getSafeModuleValue(module,"xAxisTicks")) {
                axis.tickSize(-350+50+10);
            }

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            var axisContainer = g.append("g")
                .attr("transform", "translate("+50+"," + 300 + ")")
                .attr("class","xAxis noAxis visibleTicks").call(axis);

            var degrees;
            if((degrees = octopeerHelper.getSafeModuleValue(module,"xAxisLabelRotation")) > 0) {
                axisContainer.selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate("+degrees+")")
                    .style("text-anchor", "start");
            }

            if(octopeerHelper.getSafeModuleValue(module,"xAxisLine")) {
                axisContainer.append("line")
                    .attr("x1",0)
                    .attr("x2",720-50-50)
                    .attr("style","stroke-width:1px;stroke:black");
            }
            return g;
        }

        function createXAxisLabel(svg, module) {
            var label = "";
            if((label = octopeerHelper.getSafeModuleValue(module,"xAxisLabel")) !== "") {
                var g = svg.append("g");
                g.append("text")
                    .attr("x",720/2)
                    .attr("y",360)
                    .attr("text-anchor", "middle")
                    .text(label);
            }

        }
        

        function createLeftYAxisLabel(svg, module) {
            var svgSize = octopeerHelper.getSafeModuleValue(module, "customSVGSize");
            var margin = octopeerHelper.getSafeModuleValue(module, "margin");
            var label = "";
            if((label = octopeerHelper.getSafeModuleValue(module,"yAxisLabel")) !== "") {
                var g = svg.append("g");
                g.append("text")
                    .attr("y",0)
                    .attr("x",-(svgSize.h - margin.bottom)/2)
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)")
                    .text(label);

            }
        }

        function createRightYAxisLabel(svg, module) {
            var label = "";
            if((label = octopeerHelper.getSafeModuleValue(module,"yRightAxisLabel")) !== "") {
                var g = svg.append("g");

                g.append("text")
                    .attr("y",-720)
                    .attr("x",(350-50)/2)
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(90)")
                    .text(label);
            }
        }

        this.createAxisLabels = function(svg, module){
            if(octopeerHelper.getSafeModuleValue(module,"xAxis")) {
                createXAxisLabel(svg, module);
            }
            if(octopeerHelper.getSafeModuleValue(module,"yAxis")) {
                createLeftYAxisLabel(svg, module);
            }
            if(octopeerHelper.getSafeModuleValue(module,"yRightAxis")) {
                createRightYAxisLabel(svg, module);
            }
        };

        this.createAxes = function(svg, module) {
            if(octopeerHelper.getSafeModuleValue(module,"xAxis")) {
                d3append(svg,createXAxis(module));
            }
            if(octopeerHelper.getSafeModuleValue(module,"yAxis")) {
                d3append(svg, createLeftYAxis(module));
            }
            if(octopeerHelper.getSafeModuleValue(module,"yRightAxis")) {
                d3append(svg, createRightYAxis(module));
            }
        };

        this.createSVG = function(module, w = 720, h = 350) {
            var svg = createSvgContainer(w,h);
            this.createAxes(svg, module);
            this.createAxisLabels(svg, module);
            return svg;
        };

        }