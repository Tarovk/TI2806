/*exported CommentSizeAggregator*/
/*globals octopeerService, RSVP, ObjectResolver, PullRequestResolver, UserResolver*/
/*jshint unused: false*/
function CommentSizeAggregator(userName, platform) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver();
    
    function keystrokesFromSessions(sessions) {
        var promises = [];
        console.log(sessions);
        sessions.forEach(function (session) {
            promises.push(octopeerService.getKeyStrokesFromSession(session.id));
        });
        return RSVP.all(promises);
    }
    
    function keystrokesFromUser(sessionKeyStrokes) {
        var object = {
            "sessionKeyStrokes": sessionKeyStrokes
        };
        return octopeerService.getKeyStrokesFromUser(userName)
            .then(function (keystrokes) {
                object.userKeyStrokes = keystrokes;
                return object;
            });
    }
    
    function transformGraphObject(userSessionStrokes) {
        console.log(userSessionStrokes);
    }
    
    promise = new RSVP.Promise(function (fulfill) {
        octopeerService
            .getSessionsFromUser(userName)
            .then(keystrokesFromSessions)
            .then(keystrokesFromUser)
            .then(transformGraphObject)
    });
    return promise;
}
