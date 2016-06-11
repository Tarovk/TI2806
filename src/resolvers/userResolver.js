/* exported UserResolver */
/* globals RSVP, GitHubService, BitbucketService */
function UserResolver(platform) {
    "use strict";
    var ghService, bbService;
    ghService = new GitHubService();
    bbService = new BitbucketService();
    
    function resolveUser(user) {
        var promise = new RSVP.Promise(function (fulfill) {
            if (platform === "GitHub") {
                ghService.getUser(user.username, function (ghUser) {
                    user.userInfo = ghUser;
                    fulfill(user);
                });
            } else {
                //Bitbucket requires authentication, nogo here
                fulfill(user);
            }
        });
        return promise;
    }
    
    this.resolveSingleUser = function (user) {
        return resolveUser(user);
    };
    
    this.resolveUsers = function (users) {
        var promises = [];
        users.forEach(function (user) {
            promises.push(resolveUser(user));
        });
        return RSVP.all(promises);
    };

    this.getGitHubService = function () {
        return ghService;
    };

    this.getBitbucketService = function () {
        return bbService;
    };

}
