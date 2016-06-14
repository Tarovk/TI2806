/*exported ReviewOnYourPrsAggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, UserResolver, DataAggregatorHelperFunctions*/
/*jshint unused: false*/
function TimeSpentSizePrAggregator(userName, platform) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver();
    
    function transformToGraphObject(pullRequests) {
        var counter, timeSpent, sizeData, linesChanged = 0, duration = 0;
        counter = -1;
        timeSpent = pullRequests.map(function (pr) {
            duration = Math.min(pr.totalDuration, 50);
            if (isNaN(duration)) {
                duration = 0;
            }
            counter += 1;
            return {
                "x": counter,
                "y": duration,
                "url": pr.prInfo.url
            };
        });
        counter = -1;
        sizeData = pullRequests.map(function (pr) {
            linesChanged = pr.prInfo.additions + pr.prInfo.deletions;
            if (isNaN(linesChanged)) {
                linesChanged = 0;
            }
            counter += 1;
            return {
                "x": counter,
                "y": linesChanged,
                "url": pr.prInfo.url
            };
        });
        return {
            "sizeData": sizeData,
            "timeSpent": timeSpent
        };
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(DataAggregatorHelperFunctions.pullRequestsFromStartAndEndEvents)
            .then(DataAggregatorHelperFunctions.sumDurationPullRequests)
            .then(prResolver.resolvePullRequests)
            .then(transformToGraphObject)
            .then(fulfill);
    });
    return promise;
}
