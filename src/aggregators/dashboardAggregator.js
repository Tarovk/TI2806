/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, DataAggregatorHelperFunctions*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function DashboardAggregator(userName) {
    "use strict";
    var promise, prResolver = new PullRequestResolver();
    
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
            .then(DataAggregatorHelperFunctions.pullRequestsFromStartAndEndEvents)
            .then(prResolver.resolvePullRequests)
            .then(checkIfClosedByUser)
            .then(DataAggregatorHelperFunctions.orderEvents)
            .then(DataAggregatorHelperFunctions.sumDurationPullRequests)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
