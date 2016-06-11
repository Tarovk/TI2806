/*exported OctopeerCaller, GitHubAPICaller, BitbucketAPICaller, get, getJSON */
/*globals console, cache, $*/
function get(url, callback, bypassCash) {
    "use strict";
    
    if (cache.hasOwnProperty(url) && !bypassCash) {
        callback(cache[url]);
    } else {
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
}

function getJSON(url, callback, errorCallback, bypassCash) {
    "use strict";
    
    if (cache.hasOwnProperty(url) && !bypassCash) {
        callback(cache[url]);
    } else {
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
}
