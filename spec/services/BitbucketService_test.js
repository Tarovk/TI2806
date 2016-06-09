define(['src/services/BitbucketService', 'src/services/BitbucketAPI'], function (settings) {
    describe('A BitbucketService object', function () {
        var bbservice = new BitbucketService();

        beforeEach(function(){
            spyOn($, 'getJSON');
        });

        it('calls getJSON correctly when requesting all pull requests in a repository', function () {
            bbservice.getPullRequests('CasBs', 'ooc-octopeer', console.log("BitbucketService succesfully called API (getPullRequests)"));
            expect($.getJSON).toHaveBeenCalledWith('http://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests', jasmine.any(Function), jasmine.any(Function));
        });

        it('calls getJSON correctly when requesting a specific pull request in a repository', function () {
            bbservice.getPullRequest('CasBs', 'ooc-octopeer', 1, console.log("BitbucketService succesfully called API (getPullRequest)"));
            expect($.getJSON).toHaveBeenCalledWith('http://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/1', jasmine.any(Function), jasmine.any(Function));
        });
    });
});