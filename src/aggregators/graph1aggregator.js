/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function Graph1Aggregator(userName) {
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
    
    function pullRequestCommentObject(sessions) {
        var i, pullRequests = [], pr;
        sessions.forEach(function (session) {
            var found = false;
            for (i = 0; i < pullRequests.length; i += 1) {
                pr = pullRequests[i];
                if (pr.repository.url === session.pull_request.repository.url &&
                        pr.pull_request_number === session.pull_request.pull_request_number) {
                    pullRequests[i].commentCount += session.events.length;
                    found = true;
                }
            }
            if (!found) {
                session.pull_request.commentCount = session.semantic_events.length;
                pullRequests.push(session.pull_request);
            }
        });
        
        return pullRequests;
    }
    
    function graphObject(pullRequests) {
        var xy = [], i, j;
        for (i = 0; i < 5; i += 1) {
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
            .getSessions()
            .then(function (sessions) {
                return sessions.filter(function (session) {
                    return session.user.username === userName;
                });
            })
            .then(setSemanticEvents) //resolve semantic events
            .then(filterSessionsForComments) //filter those events for comments
            .then(pullRequestCommentObject) //count comments
            .then(graphObject) //Convert to wanted format for graph
            .then(fulfill);
    });
        
    return promise;
}