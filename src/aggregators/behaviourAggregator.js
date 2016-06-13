/*exported BehaviourAggregator*/
/*globals octopeerService, RSVP, OctopeerAPI*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function BehaviourAggregator(userName) {
    "use strict";
    var promise;
    
    function countRawData() {
        var promises = [], api = new OctopeerAPI();
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.keyStrokeEvents + '/' +
                                userName, {}));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "event_type": 201
            }));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "element_type": 101
            }));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "element_type": 102
            }));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.mouseScrollEvents + '/' +
                                                        userName, {}));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "element_type": 113
            }));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "element_type": 105
            }));
        promises.push(octopeerService.getCountOfEndpoint(api.endpoints.semanticEvents + '/' +
                                                        userName, {
                "element_type": 109
            }));
        return RSVP.all(promises);
    }
    
    function convertToGraphObject(promiseResult) {
        var graphObject = {};
        graphObject.keystrokes = promiseResult[0];
        graphObject.clicks = {
            "total": promiseResult[1],
            "merge": promiseResult[2],
            "close": promiseResult[3]
        };
        graphObject.scrolls = promiseResult[4];
        graphObject.comments = {
            "pr": promiseResult[5],
            "inline": promiseResult[6],
            "edits": promiseResult[7]
        };
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        countRawData()
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
