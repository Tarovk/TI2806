/*exported CommentSizeAggregator*/
/*globals octopeerService, RSVP, OctopeerAPI, ObjectResolver, PullRequestResolver, UserResolver*/
/*jshint unused: false*/
function CommentSizeAggregator(userName, platform) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver(),
        api = new OctopeerAPI();
    
    function flatten(arr) {
        return arr.reduce(function (flat, toFlatten) {
            return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
        }, []);
    }
    
    function keystrokesFromSessions(sessions) {
        var promises = [];
        sessions.forEach(function (session) {
            promises.push(octopeerService.getKeyStrokesFromSession(session.id));
        });
        return RSVP.all(promises);
    }
    
    function pullRequestsFromStrokes(strokes) {
        var pullRequests = [],
            dictionary = {},
            counter = 0;
        strokes = flatten(strokes);
        strokes.forEach(function (stroke) {
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
        var userEventsCount,
            promises = [],
            userRe,
            filtered,
            filteredByUser;
        pullRequests.forEach(function (pr) {
            var endpoint = api.endpoints.semanticEvents + "/" +
                userName + "/" +
                pr.repository.owner + "/" +
                pr.repository.name + "/" +
                pr.pull_request_number;
            pr.commentCount = 1;
            pr.userCommentCount = 1;
            
            promises.push(octopeerService.getSemanticEventsOfPullRequest(userName, 
                                                                         pr.repository.owner, 
                                                                         pr.repository.name, 
                                                                         pr.pull_request_number));
        });
        return RSVP.all(promises).then(function (res) {
            res.forEach(function (re) {
                var filtered = re.filter(function (r) { return ((r.element_type === 104 ||
                                                                 r.element_type === 113) && 
                                                                r.event_type === 201); });
                var filteredByUser = filtered.filter(function (r) { return r.session.user.username === userName; });
                if (filtered.length > 0) {
                    if (pullRequests.filter(function (pr) { 
                        return pr.pull_request_number === filtered[0].session.pull_request.pull_request_number; 
                    }).length > 0) {
                        var pullRequest = pullRequests.filter(function (pr) {
                            return pr.pull_request_number === filtered[0].session.pull_request.pull_request_number;
                        })[0];
                        pullRequest.commentCount += filtered.length;
                        pullRequest.userCommentCount += filteredByUser.length;
                    }
                }
            });
            return pullRequests;
        });
    }
    
    function transformGraphObject(pullRequests) {
        var counter = -1;
        return pullRequests.map(function (pr) {
            counter += 1;
            return {
                "total": {
                    x: counter,
                    y: pr.strokes.length / pr.commentCount,
                    pr: pr
                },
                "user": {
                    x: counter,
                    y: pr.strokes.filter(function (stroke) {
                        return stroke.session.user.username === userName;
                    }).length / pr.userCommentCount,
                    pr: pr
                }
            };
        });
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionsFromUser(userName)
            .then(keystrokesFromSessions)
            .then(pullRequestsFromStrokes)
            .then(getCommentCount)
            .then(prResolver.resolvePullRequests)
            .then(transformGraphObject)
            .then(fulfill);
    });
    return promise;
}
