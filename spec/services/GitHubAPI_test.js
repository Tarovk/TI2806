define(['src/services/GitHubAPI'], function () {
    describe('A GitHubAPI object', function () {
        var ghapi = new GitHubAPI();

        it('builds simple pullrequest URL (no parameters)', function () {
            var simpleURL = ghapi.urlBuilder('repos/mboom/TI2806/pulls', {});
            expect(simpleURL).toEqual('http://api.github.com/repos/mboom/TI2806/pulls');
        });

        it('builds pullrequest URL (2 parameters)', function () {
            var parameterURL = ghapi.urlBuilder('repos/mboom/TI2806/pulls', {state: "all", sort: "popularity"});
            expect(parameterURL).toEqual('http://api.github.com/repos/mboom/TI2806/pulls?state=all&sort=popularity');
        });
    });
});