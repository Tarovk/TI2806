/* exported OctopeerHelper */
/*jshint esnext: true */

//Helper functions for usage within octopeer
function OctopeerHelper() {
    this.defaultModule = null;
        
    this.getSafeModuleValue = function(module,fieldname) {
        if(module[fieldname] === undefined) {
            return this.defaultModule[fieldname];
        } else {
            return module[fieldname];
        }
    };

    this.getScaleType = function(scale) {
        if (typeof scale.rangePoints === "function") {
            return "ordinal";
        } else if (scale.domain()[0] instanceof Date) {
            return "time";
        } else {
            return "linear";
        }
    };

    /**	svg line creator
    * data - The data in JSON with defined x and y fields
    * interpolationType - String describing the path shape, defaults to cardinal. 
    *   See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
    * xFunction - function to be executed on the x data before being added to the element.
    * yFunction - function to be executed on the y data before being added to the element.
    *
    * return - the value for the "d" field of an svg path element
    **/
    this.line = function (data, interpolationType = "cardinal", xFunction = null, yFunction = null) {
        var lineFunction = d3.svg.line()
        .x(function(d) { 
            if(xFunction===null) {
                return d.x;
            } else {
                return xFunction(d.x); 
            }
        })
        .y(function(d) {
            if(yFunction===null) {
                return d.y;
            } else {
                return yFunction(d.y); 
            }
        })
        .interpolate(interpolationType);

        return lineFunction(data);
    };

    /**	svg area creator
    * data - The data in JSON with defined x and y fields
    * height - The bottom border for the drawn area.
    * interpolationType - String describing the path shape, defaults to cardinal. 
    *   See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
    * xFunction - function to be executed on the x data before being added to the element.
    * yFunction - function to be executed on the y data before being added to the element.
    *
    * return : the value for the "d" field of an svg path element
    **/
    this.area = function (data, height, interpolationType = "cardinal", xFunction = null, yFunction = null) {
        var areaFunction = d3.svg.area()
        .x(function(d) { 
            if(xFunction===null) {
                return d.x;
            } else {
                return xFunction(d.x); 
            }
        })
        .y0(height)
        .y1(function(d) {
            if(yFunction===null) {
                return d.y;
            } else {
                return yFunction(d.y); 
            }
        })
        .interpolate(interpolationType);

        return areaFunction(data);
    };


    this.getTimespan = function (days) {
        var end = new Date(),
                start = new Date(end.getTime() - days * 86400000);
        return { 'start': start, 'end': end };
    };

    function setAxisTransition(module, axisname, axis) {
        d3.select(module.svg).select("."+axisname+"Axis")
                .transition()
                .duration(500)
                .ease("sin-in-out")
                .call(axis);
    }

    function setAxisLabelRotation(module,axisname){
        d3.select(module.svg).select("."+axisname+"Axis")
                .selectAll("text")
                .attr("transform", 
                    "rotate("+octopeerHelper.getSafeModuleValue(module,axisname+"AxisLabelRotation")+")");
    }

    function setStandardAxisValues(module,axisname,axis) {
        axis.scale().range([350-50-10,0]).nice();
        if(axisname === "x") {
            axis.orient("bottom");
            axis.scale().range([720-50-50,0]);
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(-350+50+10);
            }
        } else if (axisname === "y") {
            axis.orient("left");
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(-720+50+50);
            }
        } else {
            axis.orient("right");
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(720-50-50);
            }
        }

        setAxisTransition(module,axisname,axis);
        setAxisLabelRotation(module,axisname);            
    }

    function setOrdinalAxisValues(module,axisname,axis) {
        if(axisname === "x") {
            axis.orient("bottom");
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(-350+50+10);
            }
        } else if (axisname === "y") {
            axis.orient("left");
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(-720+50+50);
            }
        } else {
            axis.orient("right");
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                axis.tickSize(720-50-50);
            }
        }
        
        setAxisTransition(module,axisname,axis);
        setAxisLabelRotation(module,axisname); 
    }

    function setAxisValues(module,axisname,scaletype,axis){
        switch(scaletype) {
            case "linear" : case "log" : case "time" : setStandardAxisValues(module,axisname,axis);break;
            case "ordinal" : setOrdinalAxisValues(module,axisname,axis);break;
        }
    }

    function scaleAxis(module, objects, axisname) {
        /*jshint maxcomplexity:7 */
        if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisScale")() === "fit"){
            var axis = octopeerHelper.getSafeModuleValue(module,axisname+"AxisFitFunction")(objects);
            setAxisValues(module,axisname,octopeerHelper.getScaleType(axis.scale()),axis);
        }
    }

    this.scaleAxes = function (module, objects) {
        if(this.getSafeModuleValue(module,"xAxis")){
            scaleAxis(module, objects, "x");
        }
        if(this.getSafeModuleValue(module,"yAxis")){
            scaleAxis(module, objects, "y");
        }
        if(this.getSafeModuleValue(module,"yRightAxis")){
            scaleAxis(module, objects, "yRight");
        }
    };
}