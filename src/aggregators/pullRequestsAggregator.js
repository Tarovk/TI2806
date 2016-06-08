/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function PullRequestsAggregator(userName) {
    "use strict";
    var promise, prResolver = new PullRequestResolver();
    
    function convertSessionsToPullRequests(sessions) {
        var pullRequests = [], dictionary = {}, counter = 0;
        sessions.forEach(function (session) {
            if (!dictionary.hasOwnProperty(session.pull_request.url)) {
                dictionary[session.pull_request.url] = counter;
                pullRequests.push(session.pull_request);
                counter += 1;
            }
        });
        return pullRequests;
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionsFromUser(userName)
            .then(convertSessionsToPullRequests)
            .then(prResolver.resolvePullRequests)
            .then(fulfill)
    });
    return promise;
}