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
    
    function setSemanticEvents(startEndEvents) {
        startEndEvents.startEvents.forEach(function (se) {
            octopeerService.getSemanticEventsOfPullRequest(userName,
                                                          se.session.pull_request.repository.owner,
                                                          se.session.pull_request.repository.name,
                                                          se.session.pull_request.pull_request_number)
                .then(function (events) {
                    se.session.pull_request.semanticEvents = events;
                });
        });
        return startEndEvents;
    }
    
    function createGraphObject(startEndEvents) {
        var graphObject = [],
            counter = 0;
        startEndEvents.startEvents.forEach(function (se) {
            var endDate;
            if (startEndEvents.endEvents.length > counter) {
                endDate = startEndEvents.endEvents[counter].created_at;
                counter += 1;
            } else {
                endDate = se.created_at;
            }
            pullRequestResolver.resolveSinglePullRequest(se.session.pull_request);
            graphObject.push({
                "start": se.created_at,
                "end": endDate,
                "session": se.session
            });
        });
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSemanticEventsFromUser(userName, 401)
            .then(getEndEvents)
            .then(setSemanticEvents)
            .then(createGraphObject)
            .then(fulfill);
    });
        
    return promise;
}