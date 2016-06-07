/* exported OctopeerHelper */
/*jshint esnext: true */

//Helper functions for usage within octopeer
function OctopeerHelper() {
	this.defaultModule = null;
	
	console.log("Entered octopeerHelper");

	this.getSafeModuleValue = function(module,fieldname) {
		var moduleValue = module[fieldname];
		if(moduleValue === undefined) {
			return this.defaultModule[fieldname];
		} else {
			return moduleValue;
		}
	};

	/**	svg line creator
	* data - The data in JSON with defined x and y fields
	* interpolationType - String describing the path shape, defaults to cardinal. 
	* 	See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
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
			.y(function(d) { if(yFunction===null) {
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
	*	See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
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
			.y1(function(d) { if(yFunction===null) {
					return d.y;
				} else {
					return yFunction(d.y); 
				}
			})
			.interpolate(interpolationType);

		return areaFunction(data);
	};

}