/*exported Graph2Aggregator*/
/*globals OctopeerService, RSVP, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: vars*/
function Graph2Aggregator(userName, amountOfPr) {
    "use strict";
    var promise, opService, prResolver;
    opService = new OctopeerService();
    prResolver = new PullRequestResolver();
    
    function setSemanticEvents(sessions) {
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
    }
    
    function createPullRequestsObjectFromSessions(sessions) {
        var pullRequests = [], dictionary = {}, counter = 0;
        sessions.forEach(function (session) {
            if (!dictionary.hasOwnProperty(session.pull_request.url)) {
                dictionary[session.pull_request.url] = counter;
                pullRequests.push(session.pull_request);
                pullRequests[dictionary[session.pull_request.url]].sessions = [];
                counter += 1;
            }
            pullRequests[dictionary[session.pull_request.url]].sessions.push(session);
        });
        return pullRequests;
    }
    
    function filterSessionStartFromSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            console.log(pr);
            pr.sessions.forEach(function (session) {
                session.sessionStart = new Date();
                session.sessionEnd = new Date();
                session.semantic_events.forEach(function (se) {
                    var date = new Date(se.created_at);
                    if (se.event_type === 401 && session.sessionStart > date) {
                        session.sessionStart = date;
                    } else if (se.event_type === 402 && session.sessionEnd < date) {
                        session.sessionEnd = date;
                    };
                });
            });
        });
        return pullRequests;
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.totalDuration = 0;
            pr.sessions.forEach(function (session) {
                pr.totalDuration += (session.sessionEnd - session.sessionStart);
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
            pr.sessions.forEach(function (session) {
                objectMatrix[mIndex].push(session.sessionEnd - session.sessionStart);
            });
        });
        return objectMatrix;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService
            .getSessions()
            .then(function (sessions) {
                return sessions.filter(function (session) {
                    return session.user.username === userName;
                });
            })
            .then(setSemanticEvents) //resolve semantic events
            .then(createPullRequestsObjectFromSessions) //Create pullrequests object
            .then(prResolver.resolvePullRequests)
            .then(function (pullRequests) { //Filter to amount of wanted Prs
                if (pullRequests.length > amountOfPr) {
                    return pullRequests.splice(0, amountOfPr);
                } else {
                    return pullRequests;
                }
            })
            .then(prResolver.resolvePullRequests)
            .then(filterSessionStartFromSessionsFromPullRequests)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(graphObject)
            .then(fulfill);
    });
        
    return promise;
}