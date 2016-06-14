/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, DataAggregatorHelperFunctions, UserResolver */
/*jshint unused: false*/
function ForceLayoutAggregator(userName, platform) {
    "use strict";
    var promise, prResolver = new PullRequestResolver(), userResolver = new UserResolver(platform);
    
    function preProcessPullRequests(pullRequests) {
        var user, temp = [];
        user = {
            "username": userName
        };
        user.repositories = pullRequests.map(function (pr) {
            return pr.repository;
        });
        user.repositories = user.repositories.filter(function (repo) {
            return temp.indexOf(repo.url) === -1 &&
                temp.push(repo.url);
        });
        user.repositories.forEach(function (repo) {
            repo.pullRequests = pullRequests.filter(function (pr) {
                return pr.repository.url === repo.url;
            });
        });
        
        return user;
    }
    
    function stateOf(prInfo) {
        var state = 0;
        if (prInfo.state === "merged") {
            state = 2;
        } else if (prInfo.state === "closed") {
            state = 1;
        }
        return state;
    }
    
    function convertToGraphObject(user) {
        var graphObject = {
            "nodes": [],
            "links": []
        }, repoCounter = 1, prCounter;
        graphObject.nodes.push({
            "name": user.username,
            "type": "user",
            "src": user.userInfo.picture,
            "url": user.userInfo.url
        });
        user.repositories.forEach(function (repo) {
            graphObject.nodes.push({
                "name": repo.owner,
                "type": "repo",
                "title": repo.name
            });
            graphObject.links.push({
                "source": repoCounter,
                "target": 0,
                "value": 1
            });
            prCounter = repoCounter + 1;
            graphObject.nodes = graphObject.nodes.concat(repo.pullRequests.map(function (pr) {
                graphObject.links.push({
                    "source": prCounter,
                    "target": repoCounter,
                    "value": 1
                });
                prCounter += 1;
                return {
                    "id": pr.pull_request_number,
                    "type": "pr",
                    "name": pr.prInfo.title,
                    "size": Math.max(Math.min(pr.totalDuration, 30), 5),
                    "status": stateOf(pr.prInfo),
                    "repo": pr.repository.name,
                    "prurl": pr.prInfo.url
                };
                
            }));
            repoCounter += prCounter - 1;
        });
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(DataAggregatorHelperFunctions.pullRequestsFromStartAndEndEvents)
            .then(function (pullRequests) {
                //max 10 because of big blob
                if (pullRequests.length > 10) {
                    return pullRequests.splice(0, 10);
                } else {
                    return pullRequests;
                }
            })
            .then(prResolver.resolvePullRequests)
            .then(DataAggregatorHelperFunctions.orderEvents)
            .then(DataAggregatorHelperFunctions.sumDurationPullRequests)
            .then(preProcessPullRequests)
            .then(userResolver.resolveSingleUser)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
