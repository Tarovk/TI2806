/*exported OctopeerAPI*/
/**
* This will try to easily create an url to call
*
* @constructor
* @this {OctopeerAPI}
*/
function OctopeerAPI() {
    "use strict";

    //this.apiUrl = "http://10.0.22.6/api";
    this.apiUrl = "http://146.185.128.124/api";
    this.endpoints = {
        'repositories' : "/repositories",
        'users' : "/users/",
        'pullRequests' : "/pull-requests",
        'sessions' : "/sessions",
        'eventTypes' : "/event-types",
        'elementTypes' : "/element-types",
        'semanticEvents' : "/semantic-events",
        'eventPositions' : "/event-positions",
        'keyStrokeEvents' : "/keystroke-events",
        'mousePositionEvents' : "/mouse-position-events",
        'mouseClickEvents' : "/mouse-click-events",
        'mouseScrollEvents' : "/mouse-scroll-events",
        'windowResolutionEvents' : "/window-resolution-events"
    };

    /**
    * This is a function which will create the url for you. First you give an 
    * endpoint (which is defined above in OctopeerAPI.endpoints),
    * and parameters is an object with url parameters
    *
    * @param {String} endpoint the endpoint on which to call, preferable one 
    *                 from the endpoints above
    * @param {Object} parameters an object with parameters, attribute name 
    *                 is the parameter name, the value is the parameter value
    */
    this.urlBuilder = function (endpoint, parameters) {
        var url, firstParameter, attribute;
        if (endpoint.charAt(0) === '/') {
            url = this.apiUrl + endpoint;
        } else {
            throw "endpoints must start with a slash (\'/\')";
        }
        
        firstParameter = true;
        for (attribute in parameters) {
            if (parameters[attribute] !== undefined) {
                if (firstParameter) {
                    firstParameter = false;
                    url += "?" + attribute + "=" + encodeURIComponent(parameters[attribute]);
                } else {
                    url += "&" + attribute + "=" + encodeURIComponent(parameters[attribute]);
                }
            }
        }

        return url;
    };
}
