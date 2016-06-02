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
        return opService.getSemanticEvents()
            .then(function (events) {
                sessions.forEach(function (session) {
                    session.events = events.filter(function (event) {
                        return event.session.url === session.url;
                    });
                });
                return sessions;
            });
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
            pr.sessions.forEach(function (session) {
                session.events = session.events.filter(function (se) {
                    return se.event_type === "http://146.185.128.124/api/event-types/4/";
                });
            });
        });
        return pullRequests;
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            var summedDuration = 0;
            pr.sessions.forEach(function (session) {
                session.events.forEach(function (se) {
                    summedDuration += se.duration;
                });
            });
            pr.totalDuration = summedDuration;
            summedDuration = 0;
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
                var summedDuration = 0;
                session.events.forEach(function (se) {
                    summedDuration += se.duration;
                });
                objectMatrix[mIndex].push(summedDuration);
            });
        });
        return objectMatrix;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService
            //.getSessionsFromUser(userName) //Gets sessions from user
            .getSessions()
            .then(setSemanticEvents) //Set semantic events for sessions
            .then(createPullRequestsObjectFromSessions) //Create pullrequests object
            .then(prResolver.resolvePullRequests)
            .then(function (pullRequests) { //Filter to amount of wanted Prs
                return pullRequests.splice(0, amountOfPr);
            })
            .then(prResolver.resolvePullRequests)
            .then(filterSessionStartFromSessionsFromPullRequests)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(graphObject)
            .then(fulfill);
    });
        
    return promise;
}