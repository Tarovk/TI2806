/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, UserResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function ForceLayoutAggregator(userName, platform) {
    "use strict";
    var promise, prResolver = new PullRequestResolver(), userResolver = new UserResolver(platform);
    
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
            pr.totalDuration = pr.totalDuration / 1000 / 60;
        });
        return pullRequests;
    }
    
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
                    "repo": pr.repository.name
                };
                
            }));
            repoCounter += prCounter - 1;
        });
        return graphObject;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionEventsFromUser(userName)
            .then(createPullRequestsObjectFromSessions)
            .then(function (pullRequests) {
                //max 10 because of big blob
                if (pullRequests.length > 10) {
                    return pullRequests.splice(0, 10);
                } else {
                    return pullRequests;
                }
            })
            .then(prResolver.resolvePullRequests)
            .then(orderEvents)
            .then(sumDurationOfSessionsFromPullRequests)
            .then(preProcessPullRequests)
            .then(userResolver.resolveSingleUser)
            .then(convertToGraphObject)
            .then(fulfill);
    });
    return promise;
}
