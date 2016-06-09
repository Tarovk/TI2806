/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function PunchCardAggregator(userName) {
    "use strict";
    var promise;
    
    function getEndEvents(startEvents) {
        console.log(startEvents);
        return octopeerService.getSemanticEventsFromUser(userName, 402, 113)
            .then(function (endEvents) {
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
            if (startEndEvents.endEvents.length >= counter) {
                endDate = se.created_at;
            } else {
                endDate = startEndEvents.endEvents[counter];
            }
            graphObject.push({
                "start": se.created_at,
                "end": endDate
            });
        });
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSemanticEventsFromUser(userName, 401, 113)
            .then(getEndEvents)
            .then(createGraphObject);
    });
        
    return promise;
}