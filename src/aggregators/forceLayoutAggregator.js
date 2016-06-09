/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function ForceLayoutAggregator(userName) {
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
    
    function convertToGraphObject(pullRequests) {
        var graphObject = {
            "nodes": [],
            "links": []
        };
        graphObject.nodes.push({
            "name": "user",
            "type": "user",
            "src": "https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"
        })
        graphObject.nodes.push({
            "name": "repo1",
            "type": "repo",
            "title": "bla"
        })
        graphObject.nodes = graphObject.nodes.concat(pullRequests.map(function (pr) {
            return {
                "id": "1",
                "type": "pr",
                "name": pr.prInfo.title,
                "size": pr.totalDuration,
                "status": 1,
                "repo": pr.repository.name,
            };
        }));

        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(createPullRequestsObjectFromSessions)
            .then(prResolver.resolvePullRequests)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
