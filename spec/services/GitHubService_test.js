define(['src/services/GitHubAPI', 'src/services/GitHubService'], function () {
    describe('A GitHubService object', function () {
        var ghservice = new GitHubService();

        beforeEach(function(){
            spyOn($, 'getJSON');
        });

        it('calls getJSON with the correct URL when requesting all pull requests in a repository', function () {
            ghservice.getPullRequests('mboom', 'TI2806', console.log("GitHubService succesfully called API (getPullRequests)"));
            expect($.getJSON).toHaveBeenCalledWith('http://api.github.com/repos/mboom/TI2806/pulls?state=all', jasmine.any(Function));
        });

        it('calls getJSON with the correct URL when requesting a specific pull request in a repository', function () {
            ghservice.getPullRequest('mboom', 'TI2806', 1, console.log("GitHubService succesfully called API (getPullRequest)"));
            expect($.getJSON).toHaveBeenCalledWith('http://api.github.com/repos/mboom/TI2806/pulls/1', jasmine.any(Function));
        });
    });
});