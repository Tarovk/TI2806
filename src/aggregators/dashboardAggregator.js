/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function DashboardAggregator(userName) {
    "use strict";
    var promise, prResolver = new PullRequestResolver();
    
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
    
    function checkIfClosedByUser(pullRequests) {
        return octopeerService.getSemanticEventsFromUser(userName, 201, 102).then(function (events) {
            pullRequests.forEach(function (pr) {
                events.forEach(function (event) {
                    if (event.session.pull_request.url === pr.url) {
                        pr["closedByYou"] = true;
                    }
                });
            });
            return pullRequests;
        });
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.totalDuration = 0;
            pr.sessionStarts.forEach(function (session) {
                var endSessionFound = false;
                pr.sessionEnds.forEach(function (sessionEnd) {
                    if (session.session.id === sessionEnd.session.id) {
                        var endDate = new Date(sessionEnd.created_at);
                        var startDate = new Date(session.created_at);
                        if (endDate > startDate) {
                            pr.totalDuration = endDate - startDate;
                        } else {
                            pr.totalDuration = 10000;
                        }
                        endSessionFound = true;
                    }
                });
                if (!endSessionFound) {
                    pr.totalDuration = 1000;
                }
                pr.totalDuration = pr.totalDuration / 1000;
            });
        });
        return pullRequests;
    }
    
    function convertToGraphObject(pullRequests) {
        var graphObject = {
            "sessions": []
        };
        graphObject.sessions = graphObject.sessions.concat(pullRequests.map(function (pr) {
            var state = "0";
            if (pr.prInfo.state === "merged") {
                state = "1";
            } else if (pr.prInfo.state === "closed") {
                state = "2";
            }
            if (pr.prInfo.hasOwnProperty("merged_by")) {
                if (pr.prInfo.merged_by === userName) {
                    state = "11";
                }  
            } else if (pr.closedByYou) {
                state = "21";
            } 
            return {
                "id": "1",
                "type": "pr",
                "name": pr.prInfo.title,
                "duration": pr.totalDuration,
                "status": state,
                "repo": pr.repository.name
            };
        }));
        console.log(graphObject);
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(createPullRequestsObjectFromSessions)
            .then(prResolver.resolvePullRequests)
            .then(checkIfClosedByUser)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
