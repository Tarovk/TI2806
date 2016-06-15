/* globals BitbucketAPI, PullRequestTransformer, getJSON */
/* exported BitbucketService */
function BitbucketService() {
    "use strict";
    var api;
    api = new BitbucketAPI();

    this.getPullRequests = function (owner, repo, callback) {
        getJSON(api.urlBuilder('repositories/' +
                               owner + '/' +
                               repo +
                               '/pullrequests', {}), function (pullrequests) {
            var transformer, transformed;
            transformer = new PullRequestTransformer();
            transformed = pullrequests.values.map(function (item) {
                return transformer.transform(item, "BITBUCKET");
            });
            callback(transformed);
        }, function () {
            callback({});
        });
    };
    
    this.getPullRequest = function (owner, repo, number, callback) {
        getJSON(api.urlBuilder('repositories/' +
                               owner + '/' +
                               repo +
                               '/pullrequests/' +
                               number, {}), function (pullrequests) {
            var transformer;
            transformer = new PullRequestTransformer();
            callback(transformer.transform(pullrequests, "BITBUCKET"));
        }, function () {
            callback({});
        });
    };
}
