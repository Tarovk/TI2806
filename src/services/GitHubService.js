/* globals PullRequestTransformer, GitHubAPI, getJSON */
/* exported GitHubService */
function GitHubService() {
    "use strict";
    var api;
    api = new GitHubAPI();
    
    function userTransformer(user) {
        return {
            "name": user.login,
            "picture": user.avatar_url,
            "url": user.url
        };
    }

    this.getPullRequests = function (owner, repo, callback) {
        getJSON(api.urlBuilder('repos/' +
                               owner + '/' +
                               repo +
                               '/pulls', { state: "all" }), function (pullrequests) {
                                   var transformer, transformed;
                                   transformer = new PullRequestTransformer();
                                   transformed = pullrequests.map(function (pr) {
                                       return transformer.transform(pr, "GITHUB");
                                   });
                                   callback(transformed);
                               }, function (error) {
            callback({
                "error": error
            });
        });
    };

    this.getPullRequest = function (owner, repo, number, callback) {
        getJSON(api.urlBuilder('repos/' +
                               owner + '/' +
                               repo +
                               '/pulls' + '/' +
                               number, {}), function (pullrequest) {
                                   var transformer, transformed;
                                   transformer = new PullRequestTransformer();
                                   transformed = transformer.transform(pullrequest, "GITHUB");
                                   getFilesChanged(owner, repo, number, function (files) {
                                       transformed.files = files;
                                       callback(transformed);
                                   });
                               }, function (error) {
            callback({
                "error": error
            });
        });
    };

    function getFilesChanged(owner, repo, number, callback) {
        getJSON(api.urlBuilder('repos/' +
                               owner + '/' +
                               repo +
                               '/pulls' + '/' +
                               number + '/files', {}), function (files) {
                                   var transformer, transformed;
                                   transformer = new PullRequestTransformer();
                                   transformed = transformer.transformGitHubFiles(files);
                                   callback(transformed);
                               }, function (error) {
            callback({
                "error": error
            });
        });
    }
    
    this.getUser = function (userName, callback) {
        $.getJSON(api.urlBuilder('users/' + userName, {}), function (user) {
            callback(userTransformer(user));
        }, function (error) {
            callback({
                "error": error
            });
        });
    };
}
