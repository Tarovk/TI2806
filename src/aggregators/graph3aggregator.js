/*exported Graph3Aggregator*/
/*globals OctopeerService, RSVP*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: vars*/
function Graph3Aggregator(userName, amountOfPr) {
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
    
    function createPullRequestsObjectFromSessions(sessions) {
        var pullRequests = [], dictionary = {}, counter = 0;
        
        sessions.forEach(function (session) {
            if (!dictionary.hasOwnProperty(session.pull_request.url)) {
                dictionary[session.pull_request.url] = counter;
                pullRequests.push(session.pull_request);
                pullRequests[dictionary[session.pull_request.url]].sessions = [];
                counter += 1;
            }
            pullRequests[dictionary[session.pull_request.url]].sessions.push(session);
        });
        return pullRequests;
    }
    
    function aggregateDurationEventsPerPR(pullRequests) {
        pullRequests.forEach(function (pullRequest) {
            var eventDuration = {};
            pullRequest.sessions.forEach(function (session) {
                session.events.forEach(function (event) {
                    if (!eventDuration.hasOwnProperty(event.url)) {
                        eventDuration[event.url] = event.duration;
                    } else {
                        eventDuration[event.url] += event.duration;
                    }
                });
            });
            pullRequest.eventDurations = eventDuration;
        });
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        opService.getSessionsFromUser(userName) //Gets sessions from user
            .then(setSemanticEvents) //Set semantic events for sessions
            .then(createPullRequestsObjectFromSessions) //Create pullrequests object
            .then(aggregateDurationEventsPerPR) //Aggregate duration semantic events
            .then(fulfill);
    });
        
    return promise;
}
