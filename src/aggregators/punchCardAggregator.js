/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function PunchCardAggregator(userName) {
    "use strict";
    var promise, pullRequestResolver = new PullRequestResolver();
    
    function getEndEvents(startEvents) {
        return octopeerService.getSemanticEventsFromUser(userName, 402)
            .then(function (endEvents) {
                return {
                    "startEvents": startEvents,
                    "endEvents": endEvents
                };
            });
    }
    
    function orderEvents(startEndEvents) {
        console.log(startEndEvents);
        startEndEvents.startEvents = startEndEvents.startEvents.sort(function (a, b) {
            return new Date(a.created_at) - new Date(b.created_at);
        });
        startEndEvents.endEvents = startEndEvents.endEvents.sort(function (a, b) {
            return new Date(a.created_at) - new Date(b.created_at);
        });
        return startEndEvents;
    }
    
    function createGraphObject(startEndEvents) {
        var graphObject = [],
            counter = 0,
            obj,
            sessionStartId,
            endEvent,
            sessionEndId,
            i;
        graphObject = startEndEvents.startEvents.map(function (se) {
            obj = {
                "start": se.created_at,
                "end": se.created_at,
                "session": se.session
            };
            sessionStartId = se.session.id;
            
            for (i = 0; i < startEndEvents.endEvents.length; i += 1) {
                endEvent = startEndEvents.endEvents[i];
                sessionEndId = endEvent.session.id;
                if (sessionStartId === sessionEndId) {
                    if(new Date(endEvent.created_at) > new Date(se.created_at)) {
                        obj.end = endEvent.created_at;
                    }
                    startEndEvents.endEvents.splice(i, 1);
                    break;
                }
            }
            return obj;
        });
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSemanticEventsFromUser(userName, 401)
            .then(getEndEvents)
            .then(orderEvents)
            .then(createGraphObject)
            .then(fulfill);
    });
        
    return promise;
}