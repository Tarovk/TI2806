/*exported ReviewOnYourPrsAggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, UserResolver*/
/*jshint unused: false*/
function ReviewOnYourPrsAggregator(userName, platform) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver(),
        userResolver = new UserResolver(platform);
    
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
    
    function resolvePeerReviewers(sessions) {
        var promises = [];
        sessions.forEach(function (session) {
            promises.push(userResolver.resolveUsers(session.peerReviewers).then(function (users) {
                session.peerReviewers = users;
                return session;
            }));
        });
        return RSVP.all(promises);
    }
    
    function resolvePullRequests(sessions) {
        var promises = [];
        sessions.forEach(function (session) {
            promises.push(prResolver.resolveSinglePullRequest(session.pull_request).then(function (prs) {
                return session;
            }));
        });
        return RSVP.all(promises);
    }
    
    function transformToGraphObject(userSessions) {
        return userSessions.map(function (us) {
            return {
                "pr": us.pull_request.pull_request_number,
                "pr_url": us.pull_request.prInfo.url,
                "repo": us.pull_request.repository.name,
                "reviews": us.peerReviewers.map(function (prv) {
                    return {
                        "username": prv.username,
                        "picture": prv.userInfo.picture,
                        "session_start": us.created_at
                    };
                })
            };
        });
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessions()
            .then(createAllSessionsUserSessionsObject)
            .then(distinctifyUserPullRequests)
            .then(addUsernamesToSessions)
            .then(resolvePeerReviewers)
            .then(resolvePullRequests)
            .then(transformToGraphObject)
            .then(fulfill);
    });
    return promise;
}
