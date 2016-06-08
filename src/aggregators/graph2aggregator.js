/*exported Graph2Aggregator*/
/*globals OctopeerService, RSVP, PullRequestResolver, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function Graph2Aggregator(userName, amountOfPr) {
    "use strict";
    var promise, opService, prResolver;
    opService = new OctopeerService();
    prResolver = new PullRequestResolver();
    
    function setSemanticEvents(sessions) {
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
    
    function createPullRequestsObjectFromSessions(startAndEndEvents) {
        var pullRequests = [],
            dictionary = {},
            counter = 0,
            startEvents = startAndEndEvents[0],
            endEvents = startAndEndEvents[1];
        startEvents.forEach(function (event) {
            if (!dictionary.hasOwnProperty(event.session.pull_request.url)) {
                dictionary[event.session.pull_request.url] = counter;
                pullRequests.push(event.session.pull_request);
                pullRequests[dictionary[event.session.pull_request.url]].sessionStarts = [];
                pullRequests[dictionary[event.session.pull_request.url]].sessionEnds = [];
                counter += 1;
            }
            pullRequests[dictionary[event.session.pull_request.url]].sessionStarts.push(event);
        });
        endEvents.forEach(function (event) {
            if (!dictionary.hasOwnProperty(event.session.pull_request.url)) {
                dictionary[event.session.pull_request.url] = counter;
                pullRequests.push(event.session.pull_request);
                counter += 1;
            }
            pullRequests[dictionary[event.session.pull_request.url]].sessionEnds.push(event);
        });
        return pullRequests;
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.totalDuration = 0;
            pr.sessionStarts.forEach(function (session) {
                var endSessionFound = false;
                pr.sessionEnds.forEach(function (sessionEnd) {
                    if (session.session.id === sessionEnd.session.id) {
                        pr.totalDuration = session.created_at - sessionEnd.create_at;
                        endSessionFound = true;
                    }
                });
                if (!endSessionFound) {
                    pr.totalDuration = 1;
                }
            });
        });
        return pullRequests;
    }
    
    function graphObject(pullRequests) {
        var objectMatrix = [], mIndex;
        pullRequests.forEach(function (pr) {
            objectMatrix.push([]);
            mIndex = objectMatrix.length - 1;
            objectMatrix[mIndex].push(pr.pull_request_number);
            pr.sessionStarts.forEach(function (session) {
                var endSessionFound = false;
                pr.sessionEnds.forEach(function (sessionEnd) {
                    if (session.session.id === sessionEnd.session.id) {
                        objectMatrix[mIndex].push(new Date(session.created_at) - new Date(sessionEnd.created_at));
                        endSessionFound = true;
                    }
                });
                if (!endSessionFound) {
                    objectMatrix[mIndex].push(1);
                }
            });
        });
        return objectMatrix;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService
            .getSessionEventsFromUser(userName)
            .then(createPullRequestsObjectFromSessions) //Create pullrequests object
            .then(function (pullRequests) { //Filter to amount of wanted Prs
                if (pullRequests.length > amountOfPr) {
                    return pullRequests.splice(0, amountOfPr);
                } else {
                    return pullRequests;
                }
            })
            //.then(prResolver.resolvePullRequests)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(graphObject)
            .then(fulfill);
    });
        
    return promise;
}