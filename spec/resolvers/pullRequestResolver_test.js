define(['src/resolvers/pullRequestResolver'], function (resolver) {

    var pullRequest1 = {
        repository: {
            platform: "GitHub",
            owner: "mboom",
            name: "TI2806"
        },
        pull_request_number: 23
    };

    var pullRequest2 = {
        repository: {
            platform: "Bitbucket",
            owner: "CasBs",
            name: "ooc-octopeer"
        },
        pull_request_number: 23
    };

    describe('A PullRequestResolver object', function () {
        it('contains a BitbucketService and GitHubService', function () {
            // These are needed for mocking later, so they should be available
            var prResolver = new PullRequestResolver();

            expect(prResolver.getGitHubService()).toBeDefined();
            expect(prResolver.getGitHubService()).not.toBeNull();

            expect(prResolver.getBitbucketService()).toBeDefined();
            expect(prResolver.getBitbucketService()).not.toBeNull();
        });
    });

    describe('A PullRequestResolver object', function () {
        it('resolves a pull request from GitHub correctly', function () {
            var prResolver = new PullRequestResolver();
            var ghService = prResolver.getGitHubService();
            spyOn(ghService,'getPullRequest').and.callThrough();

            var prResolved = prResolver.resolveSinglePullRequest(pullRequest1);
            expect(ghService.getPullRequest).toHaveBeenCalledWith("mboom", "TI2806", 23, jasmine.any(Function));
            expect(prResolved._id).toBeDefined();
        });
    });

    describe('A PullRequestResolver object', function () {
        it('resolves a pull request from Bitbucket correctly', function () {
            var prResolver = new PullRequestResolver();
            var bbService = prResolver.getBitbucketService();

            spyOn(bbService,'getPullRequest').and.callThrough();

            var prResolved = prResolver.resolveSinglePullRequest(pullRequest2);
            expect(bbService.getPullRequest).toHaveBeenCalledWith("CasBs", "ooc-octopeer", 23, jasmine.any(Function));
            expect(prResolved._id).toBeDefined();
        });
    });

    describe('A PullRequestResolver object', function () {
        it('resolves multiple pull requests from different platforms correctly', function () {
            var prResolver = new PullRequestResolver();
            var ghService = prResolver.getGitHubService();
            var bbService = prResolver.getBitbucketService();

            spyOn(bbService,'getPullRequest').and.callThrough();
            spyOn(ghService,'getPullRequest').and.callThrough();

            var prResolved = prResolver.resolvePullRequests([pullRequest1, pullRequest2]);
            expect(bbService.getPullRequest).toHaveBeenCalledWith("CasBs", "ooc-octopeer", 23, jasmine.any(Function));
            expect(prResolved._id).toBeDefined();
        });
    });
});