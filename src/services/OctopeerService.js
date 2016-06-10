/*exported OctopeerService*/
/*globals RSVP, Settings, OctopeerAPI, ObjectResolver, getJSON*/
/**
 * This object will create a service object. This object contains useful calls to the octopeer
 * server. Every function will return promises.
 *
 * @constructor
 * @this {OctopeerService}
 */
/*jshint unused: vars*/
function OctopeerService() {
    "use strict";
    var settings, api;
    settings = new Settings();
    api = new OctopeerAPI();
    //var caller = new DummyCaller(settings.host);

    this.getUsers = function () {
        var url, promise;
        url = api.urlBuilder(api.endpoints.users, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
    };
    
    this.getSessions = function () {
        var url, promise;
        url = api.urlBuilder(api.endpoints.sessions, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (sessions) {
                fulfill(sessions.results);
            });
        });
        return promise;
    };

    this.getPullRequests = function () {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["session"]);
        url = api.urlBuilder(api.endpoints.pullRequests, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (pullRequests) {
                fulfill(objectResolver.resolveArray(pullRequests));
            });
        });
        return promise;
    };
    
    this.getSemanticEventsBySession = function () {//sessionId) {
        var url, promise;
        url = api.urlBuilder(api.endpoints.semanticEvents, {});
        //url = api.urlBuilder(api.endpoints.sessions + sessionId + "/semanticEvents", {});

        promise = new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (semantiEvents) {
                fulfill(semantiEvents);
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };

    this.getRepositories = function () {
        var url, promise;
        url = api.urlBuilder(api.endpoints.repositories, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
    };
    
    this.getPullRequests = function () {//userId) {
        var promise, url;
        //url = api.urlBuilder(api.endpoints.users + userId + '/pullrequests/', {});
        url = api.urlBuilder(api.endpoints.pullRequests, {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (pullRequests) {
                fulfill(pullRequests);
            }, function (error) {
                reject(error);
            });
        });
    };
    
    this.getSessionsFromPullRequests = function (prId) {
        var promise, url;
        url = api.urlBuilder(api.endpoints.pullRequests + prId + "/sessions", {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (sessions) {
                fulfill(sessions);
            }, function (error) {
                reject(error);
            });
        });
    };
    
    this.getSessionsFromUser = function (userName) {
        var url;
        url = api.urlBuilder(api.endpoints.sessions + '/' + userName, {});
        
        return new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (sessions) {
                fulfill(sessions.results);
            }, function (error) {
                reject(error);
            });
        });
    };
    
    this.getSemanticEvents = function () {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["element_type", "event_type"]);
        url = api.urlBuilder(api.endpoints.semanticEvents, {});

        promise = new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (events) {
                fulfill(objectResolver.resolveArray(events.results));
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };
    
    this.getCommentEventsFromUser = function (userName) {
        var url = api.urlBuilder(api.endpoints.semanticEvents + '/' + userName + '/', {
            "event_type": 201,
            "element_type": 113
        });
        return new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (events) {
                fulfill(events.results);
            }, function (error) {
                reject(error);
            });
        });
    };
    
    this.getSessionEventsFromUser = function (userName) {
        var promises = [],
            startSessionsUrl = api.urlBuilder(api.endpoints.semanticEvents + '/' + userName + '/', {
                "event_type": 401
            }),
            endSessionsUrl = api.urlBuilder(api.endpoints.semanticEvents + '/' + userName + '/', {
                "event_type": 402
            });
        promises.push(new RSVP.Promise(function (fulfill) {
            getJSON(startSessionsUrl, function (events) {
                fulfill(events.results);
            });
        }));
        promises.push(new RSVP.Promise(function (fulfill) {
            getJSON(endSessionsUrl, function (events) {
                fulfill(events.results);
            });
        }));
        
        return RSVP.all(promises);
    };
    
    this.getSemanticEventsFromUser = function (userName, eventType, elementType) {
        var url = api.urlBuilder(api.endpoints.semanticEvents + '/' + userName + '/', {
            "event_type": eventType,
            "element_type": elementType
        });
        return new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (events) {
                fulfill(events.results);
            }, function (error) {
                reject(error);
            });
        });
    };
    ///api/semantic-events/<username>/<owner>/<name>/<pull_request_number>/
    this.getSemanticEventsOfPullRequest = function (userName, owner, repo, prNr) {
        var url = api.urlBuilder(api.endpoints.semanticEvents + '/' +
                                userName + '/' +
                                owner + '/' +
                                repo + '/' +
                                prNr);
        return new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (events) {
                fulfill(events.results);
            }, function (error) {
                reject(error);
            });
        });
    };
    
    this.getAPI = function () {
        return api;
    };
}
