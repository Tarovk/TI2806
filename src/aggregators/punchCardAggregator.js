/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function PunchCardAggregator(userName) {
    "use strict";
    var promise;
    
    function getEndEvents(startEvents) {
        return octopeerService.getSemanticEventsFromUser(userName, 402)
            .then(function (endEvents) {
            console.log(endEvents);
                return {
                    "startEvents": startEvents,
                    "endEvents": endEvents
                };
            });
    }
    
    function createGraphObject(startEndEvents) {
        var graphObject = [],
            counter = 0;
        startEndEvents.startEvents.forEach(function (se) {
            var endDate;
            console.log(startEndEvents.endEvents.length);
            if (startEndEvents.endEvents.length > counter) {
                endDate = startEndEvents.endEvents[counter].created_at;
                console.log(endDate);
                counter++;
            } else {
                endDate = se.created_at;
            }
            graphObject.push({
                "start": se.created_at,
                "end": endDate
            });
        });
        console.log(graphObject);
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSemanticEventsFromUser(userName, 401)
            .then(getEndEvents)
            .then(createGraphObject)
            .then(fulfill);
    });
        
    return promise;
}