/* exported PullRequestResolver */
/* globals RSVP, GitHubService, BitbucketService */
function PullRequestResolver() {
    "use strict";
    var ghService, bbService;
    ghService = new GitHubService();
    bbService = new BitbucketService();
    
    function resolvePullRequest(pullRequest) {
        var promise = new RSVP.Promise(function (fulfill) {
            if (pullRequest.repository.platform === "GitHub") {
                ghService.getPullRequest(pullRequest.repository.owner,
                                         pullRequest.repository.name,
                                         pullRequest.pull_request_number,
                                         function (pr) {
                        pullRequest.prInfo = pr;
                        fulfill(pullRequest);
                    });
            } else {
                bbService.getPullRequest(pullRequest.repository.owner,
                                        pullRequest.repository.name,
                                        pullRequest.pull_request_number,
                                        function (pr) {
                        pullRequest.prInfo = pr;
                        fulfill(pullRequest);
                    });
            }
        });
        return promise;
    }
    
    this.resolveSinglePullRequest = function (pullRequest) {
        return resolvePullRequest(pullRequest);
    };
    
    this.resolvePullRequests = function (pullRequests) {
        var promises = [];
        pullRequests.forEach(function (pr) {
            promises.push(resolvePullRequest(pr));
        });
        return RSVP.all(promises);
    };

}
