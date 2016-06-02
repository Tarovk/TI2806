/*exported Graph4Aggregator*/
/*globals OctopeerService, RSVP, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: vars*/
function Graph4Aggregator(owner, reponame, pullRequestNumber) {
    "use strict";
    var promise, opService, prResolver;
    opService = new OctopeerService();
    prResolver = new PullRequestResolver();
    
    function setSemanticEvents(sessions) {
        return opService.getSemanticEvents()
            .then(function (events) {
                sessions.forEach(function (session) {
                    session.events = events.filter(function (event) {
                        return event.session.url === session.url;
                    });
                });
                return sessions;
            });
    }
    
    function filterForPullRequest(sessions) {
        return sessions.filter(function (session) {
            return session.pull_request.pull_request_number === pullRequestNumber &&
                session.pull_request.repository.name === reponame &&
                session.pull_request.repository.owner === owner;
        });
    }
    
    function createPullRequestObjectFromSessions(sessions) {
        var pullRequest = sessions[0].pull_request;
        pullRequest.sessions = sessions;
        return pullRequest;
    }
    
    function createMatrix(pullRequest) {
        var matrix = {};
        pullRequest.sessions.forEach(function (session) {
            session.events.forEach(function (event) {
                if (!matrix.hasOwnProperty(event.element_type.url)) {
                    matrix[event.element_type.url] = {};
                    matrix[event.element_type.url][event.event_type.url] = 1;
                } else if (!matrix[event.element_type.url].hasOwnProperty([event.event_type.url])) {
                    matrix[event.element_type.url][event.event_type.url] = 1;
                } else {
                    matrix[event.element_type.url][event.event_type.url] += 1;
                }
            });
        });
        pullRequest.matrix = matrix;
        return pullRequest;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService.getSessions() //Gets sessions from user
            .then(setSemanticEvents) //Set semantic events for sessions
            .then(filterForPullRequest)
            .then(createPullRequestObjectFromSessions) //Create pullrequests object
            .then(prResolver.resolveSinglePullRequest)
            .then(createMatrix)
            .then(fulfill);
    });
        
    return promise;
}
