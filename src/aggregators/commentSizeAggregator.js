/*exported CommentSizeAggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, UserResolver*/
/*jshint unused: false*/
function CommentSizeAggregator(userName, platform) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver(),
        api = new OctopeerAPI();
    
    function keystrokesFromSessions(sessions) {
        var promises = [];
        sessions.forEach(function (session) {
            promises.push(octopeerService.getKeyStrokesFromSession(session.id));
        });
        return RSVP.all(promises);
    }
    
    function keystrokesFromUser(sessionKeyStrokes) {
        var object = {
            "sessionKeyStrokes": sessionKeyStrokes.reduce(function (a, b) {
                return a.concat(b);
            })
        };
        return octopeerService.getKeyStrokesFromUser(userName)
            .then(function (keystrokes) {
                object.userKeyStrokes = keystrokes;
                return object;
            });
    }
    
    function pullRequestsFromStrokes(userSessionStrokes) {
        var pullRequests = [],
            dictionary = {},
            counter = 0;
        userSessionStrokes.sessionKeyStrokes.forEach(function (stroke) {
            if (!dictionary.hasOwnProperty(stroke.session.pull_request.url)) {
                dictionary[stroke.session.pull_request.url] = counter;
                pullRequests.push(stroke.session.pull_request);
                pullRequests[dictionary[stroke.session.pull_request.url]].strokes = [];
                counter += 1;
            }
            pullRequests[dictionary[stroke.session.pull_request.url]].strokes.push(stroke);
        });
        userSessionStrokes.userKeyStrokes.forEach(function (stroke) {
            if (!dictionary.hasOwnProperty(stroke.session.pull_request.url)) {
                dictionary[stroke.session.pull_request.url] = counter;
                pullRequests.push(stroke.session.pull_request);
                pullRequests[dictionary[stroke.session.pull_request.url]].strokes = [];
                counter += 1;
            }
            pullRequests[dictionary[stroke.session.pull_request.url]].strokes.push(stroke);
        });
        return pullRequests;
    }
    
    function getCommentCount(pullRequests) {
        var userEventsCount;
        pullRequests.forEach(function (pr) {
            var promises = [];
            var endpoint = api.endpoints.semanticEvents + "/"
                + userName + "/"
                + pr.repository.owner + "/"
                + pr.repository.name + "/"
                + pr.pull_request_number;
            
            promises.push(octopeerService.
                          getSemanticEventsOfPullRequest(userName,
                                                         pr.repository.owner,
                                                         pr.resository.name,
                                                         pr.pull_request_number, {
                        event_type: 201,
                        element_type: 104
                    })
                          );
            promises.push(octopeerService.
                          getSemanticEventsOfPullRequest(userName,
                                                         pr.repository.owner,
                                                         pr.resository.name,
                                                         pr.pull_request_number, {
                        event_type: 201,
                        element_type: 113
                    })
                          );
            RSVP.all(promises).then(function (events) {
                pr.commentCount = events[0].length + events[1].length;
                var userEventsCount = events[0].filter(function (event) {
                    return event.session.user.username === userName;
                }).length;
                userEventsCount += events[1].filter(function (event) {
                    return event.session.user.username === userName;
                }).length;
                pr.userCommentCount = userEventsCount;
            });
        });
        return pullRequests;
    }
    
    function transformGraphObject(pullRequests) {
        console.log(pullRequests);
        return pullRequests.map(function (pr) {
            return {
                "total": {
                    x: pr.pull_request_number,
                    y: pr.strokes.length / pr.commentCount
                },
                "user": {
                    x: pr.pull_request_number,
                    y: pr.strokes.filter(function (stroke) {
                        return stroke.session.user.username === userName;
                    }).length / pr.userCommentCount
                }
            };
        });
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionsFromUser(userName)
            .then(keystrokesFromSessions)
            .then(keystrokesFromUser)
            .then(pullRequestsFromStrokes)
            .then(getCommentCount)
            .then(prResolver.resolvePullRequests)
            .then(transformGraphObject);
    });
    return promise;
}
