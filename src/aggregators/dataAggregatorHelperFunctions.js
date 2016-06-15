/*exported DataAggregatorHelperFunctions */
var DataAggregatorHelperFunctions = {
    "pullRequestsFromStartAndEndEvents": function (startAndEndEvents) {
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
    },
    
    "orderEventsInPullRequests": function (pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.sessionStarts = pr.sessionStarts.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
            pr.sessionEnds = pr.sessionEnds.sort(function (a, b) {
                return new Date(a.created_at) - new Date(b.created_at);
            });
        });
        return pullRequests;
    },
    
    "sumDurationPullRequests": function (pullRequests) {
        var sessionStartId,
            endEvent,
            sessionEndId,
            i,
            sessionStartDate,
            sessionEndDate,
            savedEndSessions = [];
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
                        savedEndSessions.push(pr.sessionEnds.splice(i, 1)[0]);
                        if (sessionEndDate > sessionStartDate) {
                            pr.totalDuration += sessionEndDate - sessionStartDate;
                        }
                        break;
                    }
                }
            });
            pr.sessionEnds = pr.sessionEnds.concat(savedEndSessions);
            pr.totalDuration = Math.ceil(pr.totalDuration / 1000 / 60);
        });
        return pullRequests;
    },
    
    "getRepoUrl": function (repository) {
        if (repository.platform.toLowerCase() === "bitbucket") {
            return 'https://bitbucket.org/' + repository.owner + '/' + repository.name;
        } else if (repository.platform.toLowerCase() === "github") {
            return 'https://github.com/' + repository.owner + '/' + repository.name;
        }
    }
};
