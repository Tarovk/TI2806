/*exported OctopeerCaller, GitHubAPICaller, BitbucketAPICaller, get, getJSON */
/*globals console, $*/
function get(url, callback) {
    "use strict";
    
    $.ajax({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            callback(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getJSON(url, callback, errorCallback) {
    "use strict";
    
    $.getJSON({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            callback(result); 
        },
        error: function (error) {
            errorCallback(error);
        }
    });
}
