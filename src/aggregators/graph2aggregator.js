/*exported Graph2Aggregator*/
/*globals OctopeerService, RSVP, PullRequestResolver, ObjectResolver, DataAggregatorHelperFunctions*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function Graph2Aggregator(userName, amountOfPr) {
    "use strict";
    var promise, opService, prResolver;
    opService = new OctopeerService();
    prResolver = new PullRequestResolver();
    
    function graphObject(pullRequests) {
        var mIndex = 0, sessionLengths, go, sessionStartId, sessionStartDate,
            sessionEndDate, endEvent, sessionEndId, i, found;
        pullRequests.forEach(function (pr) {
            var sessionLengths = [];
            pr.sessionStarts.forEach(function (session) {
                sessionStartId = session.session.id;
                sessionStartDate = new Date(session.created_at);
                found = false;
                for (i = 0; i < pr.sessionEnds.length; i += 1) {
                    endEvent = pr.sessionEnds[i];
                    sessionEndDate = new Date(endEvent.created_at);
                    sessionEndId = endEvent.session.id;
                    if (sessionStartId === sessionEndId) {
                        if (sessionEndDate > sessionStartDate) {
                            sessionLengths.push((sessionEndDate - sessionStartDate) / 1000 / 60);
                        }
                        found = true;
                        pr.sessionEnds.splice(i, 1);
                        break;
                    }
                }
                if (!found) {
                    sessionLengths.push(1);
                }
            });
            pr.sessionLengths = sessionLengths;
        });
        go = pullRequests.map(function (pr) {
            var values = pr.sessionLengths;
            values.unshift(pr.pull_request_number);
            return values;
        });
        return go;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService
            .getSessionEventsFromUser(userName)
            .then(DataAggregatorHelperFunctions.pullRequestsFromStartAndEndEvents)
            .then(prResolver.resolvePullRequests)
            .then(DataAggregatorHelperFunctions.orderEvents)
            .then(DataAggregatorHelperFunctions.sumDurationPullRequests)
            .then(DataAggregatorHelperFunctions.orderEvents)
            .then(graphObject)
            .then(fulfill);
    });
        
    return promise;
}