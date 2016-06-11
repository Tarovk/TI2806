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
                        pr.closedByYou = true;
                    }
                });
            });
            return pullRequests;
        });
    }
    
    function orderEvents(pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.sessionStarts = pr.sessionStarts.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
            pr.sessionEnds = pr.sessionEnds.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
        });
        return pullRequests;
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        var sessionStartId,
            endEvent,
            sessionEndId,
            i,
            sessionStartDate,
            sessionEndDate;
        pullRequests.forEach(function (pr) {
            pr.totalDuration = 0;
            pr.sessionStarts.forEach(function (se) {
                sessionStartId = se.session.id;
                sessionStartDate = new Date(se.created_at);
                for (i = 0; i < pr.sessionEnds.length; i += 1) {
                    endEvent = pr.sessionEnds[i];
                    sessionEndDate = new Date(endEvent.created_at);
                    sessionEndId = endEvent.session.id;
                    if (sessionStartId === sessionEndId) {
                        pr.sessionEnds.splice(i, 1);
                        if (sessionEndDate > sessionStartDate) {
                            pr.totalDuration += sessionEndDate - sessionStartDate;
                        }
                        break;
                    }
                }
            });
            pr.totalDuration = Math.ceil(pr.totalDuration / 1000 / 60);
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
                state = "2";
            } else if (pr.prInfo.state === "closed") {
                state = "1";
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
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(createPullRequestsObjectFromSessions)
            .then(prResolver.resolvePullRequests)
            .then(checkIfClosedByUser)
            .then(orderEvents)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
