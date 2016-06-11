/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver*/
//https://docs.google.com/document/d/1QUu1MP9uVMH9VlpEFx2SG99j9_TgxlhHo38_bgkUNKk/edit?usp=sharing
/*jshint unused: false*/
function ReviewOnYourPrsAggregator(userName) {
    "use strict";
    var promise, prResolver = new PullRequestResolver();
    
    function createAllSessionsUserSessionsObject(sessions) {
        var userSessions = [],
            dictionary = {},
            counter = 0,
            result = {
                "userSessions": [],
                "allSessions": sessions
            };
        sessions.forEach(function (session) {
            if (!dictionary.hasOwnProperty(session.pull_request.url) &&
                    session.user.username === userName) {
                dictionary[session.pull_request.url] = counter;
                userSessions.push(session);
                counter += 1;
            }
        });
        result.userSessions = userSessions;
        return result;
    }
    
    function distinctifyUserPullRequests(sessions) {
        var temp = [];
        sessions.userSessions = sessions.userSessions.filter(function (session) {
            return temp.indexOf(session.pull_request.url) === -1 &&
                temp.push(session.pull_request.url);
        });
        return sessions;
    }
    
    function addUsernamesToSessions(sessions) {
        sessions.userSessions.forEach(function (us) {
            us.peerReviewers = [];
            sessions.allSessions.forEach(function (as) {
                if (us.user.username !== as.user.username &&
                        us.pull_request.url === as.pull_request.url) {
                    us.peerReviewers.push(as.user);
                }
            });
        });
        return sessions.userSessions;
    }
    
    function transformToGraphObject(userSessions) {
        return userSessions.map(function (us) {
            return {
                "pr": us.pull_request.pull_request_number,
                "repo": us.pull_request.repository.name,
                "reviews": us.peerReviewers
            };
        });
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessions()
            .then(createAllSessionsUserSessionsObject)
            .then(distinctifyUserPullRequests)
            .then(addUsernamesToSessions)
            .then(transformToGraphObject)
            .then(fulfill);
    });
    return promise;
}
