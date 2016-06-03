define(['services/OctopeerService'], function () {
    /*exported Graph1Aggregator*/
    /*globals OctopeerService, RSVP*/
    //https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
    /*jshint unused: vars*/
    function Graph1Aggregator(userName) {
        "use strict";
        var promise, opService;
        opService = new OctopeerService();

        function setSemanticEvents(sessions) {
            opService.getSemanticEvents()
                .then(function (events) {
                    sessions.forEach(function (session) {
                        session.events = events.filter(function (event) {
                            return event.session.url === session.url;
                        });
                    });
                    return sessions;
                });
        }

        function filterSessionsForComments(sessions) {
            sessions.forEach(function (session) {
                session.events = session.events.filter(function (event) {
                    return event.event_type === "http://146.185.128.124/api/event-types/4/"; //Should be checked
                });
            });

            return sessions;
        }

        function pullRequestCommentObject(sessions) {
            var i, pullRequests = [], pr;

            sessions.forEach(function (session) {
                var found = false;
                for (i = 0; i < pullRequests.length; i += 1) {
                    pr = pullRequests[i];
                    if (pr.repository.url === session.pull_request.repository.url &&
                            pr.pull_request_number === session.pull_request.pull_request_number) {
                        pullRequests[i].commentCount += session.events.length;
                        found = true;
                    }
                }
                if (!found) {
                    session.pull_request.commentCount = session.events.length;
                    pullRequests.push(session.pull_request);
                }
            });
            return pullRequests;
        }

        function graphObject(pullRequests) {
            var xy = [], i, j;
            for (i = 0; i < 5; i += 1) {
                xy.push({
                    "x": i,
                    "y": 2
                });
                for (j = 0; j < pullRequests.length; j += 1) {
                    if (pullRequests[j].commentCount === i) {
                        xy[i].y += 1;
                    }
                }
            }
            return xy;
        }

        promise = new RSVP.Promise(function (fulfill) {
            opService
                //.getSessionsFromUser(userName) //first get the session array of urls
                .getSessions()
                //.then(objectResolver.resolveArrayOfUrls) //resolve them to session objects
                .then(setSemanticEvents) //Add events attribute to all the sessions
                .then(filterSessionsForComments) //filter those events for comments
                .then(pullRequestCommentObject) //count comments
                .then(graphObject) //Convert to wanted format for graph
                .then(fulfill);
        });

        return promise;
    }
});