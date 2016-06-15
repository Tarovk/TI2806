/*exported PunchCardAggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function PunchCardAggregator(userName) {
    "use strict";
    var promise, pullRequestResolver = new PullRequestResolver(), prInfos = {};
    
    function getPullRequest(pullRequest) {
        if (prInfos.hasOwnProperty(pullRequest.url)) {
            pullRequest.prInfo = prInfos[pullRequest.url];
        } else {
            pullRequestResolver.resolveSinglePullRequest(pullRequest).then(function (pr) {
                prInfos[pullRequest.url] = pr;
            });
        }
    }
    
    function getEndEvents(startEvents) {
        return octopeerService.getSemanticEventsFromUser(userName, 402)
            .then(function (endEvents) {
                return startEvents.concat(endEvents);
            });
    }
    
    function orderEvents(events) {
        return events.sort(function (a, b) {
            return new Date(a.created_at) - new Date(b.created_at);
        });
    }
    
    function createGraphObject(events) {
        var semanticEvents = [],
            filling = false,
            sessionEvent;
        events.forEach(function (event) {
            /*jshint maxcomplexity:1000 */
            if (event.event_type === 401 && !filling) {
                filling = true;
                getPullRequest(event.session.pull_request);
                semanticEvents.push({
                    "start": event.created_at,
                    "end": event.created_at,
                    "session": event.session
                });
            } else if (event.event_type === 402) {
                filling = false;
                sessionEvent = semanticEvents[semanticEvents.length - 1];
                if (semanticEvents.length > 0) {
                    semanticEvents[semanticEvents.length - 1].end = new Date(event.created_at);
                }
            }
        });
        return semanticEvents;
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