/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function Graph1Aggregator(userName, bucketMax) {
    "use strict";
    var promise;
    
    function setSemanticEvents(sessions, callback) {
        /* jshint ignore:start */
        var objectResolver = new ObjectResolver(), promises = [];
        sessions.forEach(function (session) {
            promises.push(new RSVP.Promise(function (fulfill) {
                objectResolver.resolveArrayOfUrls(session.semantic_events).then(function (events) {
                    session.semantic_events = events;
                    fulfill(session);
                });
            }));
        });
        return RSVP.all(promises);
        /* jshint ignore:end */
    }
    
    function filterSessionsForComments(sessions) {
        sessions.forEach(function (session) {
            session.semantic_events = session.semantic_events.filter(function (event) {
                return event.element_type === 113 && event.event_type === 201; //Should be checked
            });
        });
        return sessions;
    }
    
    function prEquals(pullRequest, pullRequest2) {
        var prNr = pullRequest.pull_request_number,
            repo = pullRequest.repository.name,
            owner = pullRequest.repository.owner,
            prNr2 = pullRequest2.pull_request_number,
            repo2 = pullRequest2.repository.name,
            owner2 = pullRequest2.repository.owner;
        
        return prNr === prNr2 &&
            repo === repo2 &&
            owner === owner2;
    }
    
    function pullRequestCommentObject(semanticEvents) {
        var i, pullRequests = [], pr;
        semanticEvents.forEach(function (se) {
            var found = false, semanticEventsPr;
            for (i = 0; i < pullRequests.length; i += 1) {
                pr = pullRequests[i];
                if (prEquals(pr, se.session.pull_request)) {
                    pullRequests[i].commentCount += 1;
                    found = true;
                }
            }
            if (!found) {
                se.session.pull_request.commentCount = 1;
                pullRequests.push(se.session.pull_request);
            }
        });
        return pullRequests;
    }
    
    function graphObject(pullRequests) {
        var xy = [], i, j;
        
        for (i = 0; i < bucketMax; i += 1) {
            xy.push({
                "x": i,
                "y": 0
            });
            for (j = 0; j < pullRequests.length; j += 1) {
                if (pullRequests[j].commentCount === i) {
                    xy[i].y += 1;
                }
            }
        }
        return xy;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getCommentEventsFromUser(userName)
            .then(pullRequestCommentObject) //count comments
            .then(graphObject) //Convert to wanted format for graph
            .then(fulfill);
    });
        
    return promise;
}