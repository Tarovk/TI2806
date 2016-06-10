/*exported OctopeerCaller, GitHubAPICaller, BitbucketAPICaller, get, getJSON */
/*globals console, cache, $*/
var requestAmount = 0;
function get(url, callback, bypassCash) {
    "use strict";
    requestAmount += 1;
    
    if (cache.hasOwnProperty(url) && !bypassCash) {
        callback(cache[url]);
    }
    
    $.ajax({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            cache[url] = result;
            callback(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getJSON(url, callback, errorCallback, bypassCash) {
    "use strict";
    requestAmount += 1;
    
    if (cache.hasOwnProperty(url) && !bypassCash) {
        callback(cache[url]);
    }
    
    $.getJSON({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            cache[url] = result;
            callback(result);
        },
        error: function (error) {
            errorCallback(error);
        }
    });
}

