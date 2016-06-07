/* globals PullRequestTransformer, GitHubAPI */
/* exported GitHubService */
function GitHubService() {
    "use strict";
    var api;
    api = new GitHubAPI();

    this.getPullRequests = function (owner, repo, callback) {
        $.getJSON(api.urlBuilder('repos/' +
                               owner + '/' +
                               repo +
                               '/pulls', { state: "all" }), function (pullrequests) {
                                   var transformer, transformed;
                                   transformer = new PullRequestTransformer();
                                   transformed = pullrequests.map(function (pr) {
                                       return transformer.transform(pr, "GITHUB");
                                   });
                                   callback(transformed);
                               });
    };

    this.getPullRequest = function (owner, repo, number, callback) {
        $.getJSON(api.urlBuilder('repos/' +
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
                               });
    };

    function getFilesChanged(owner, repo, number, callback) {
        $.getJSON(api.urlBuilder('repos/' +
                               owner + '/' +
                               repo +
                               '/pulls' + '/' +
                               number + '/files', {}), function (files) {
                                   var transformer, transformed;
                                   transformer = new PullRequestTransformer();
                                   transformed = transformer.transformGitHubFiles(files);
                                   callback(transformed);
                               });
    }
}
