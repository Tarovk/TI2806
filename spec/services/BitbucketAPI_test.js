define(['src/services/BitbucketAPI'], function () {
    describe('A BitbucketAPI object', function () {
        var bbapi = new BitbucketAPI();

        it('builds simple pullrequest URL (no parameters)', function () {
            var simpleURL = bbapi.urlBuilder('CasBs/ooc-octopeer/pullrequests', {});
            expect(simpleURL).toEqual('http://api.bitbucket.org/2.0/CasBs/ooc-octopeer/pullrequests');
        });

        it('builds pullrequest URL (2 parameters)', function () {
            var parameterURL = bbapi.urlBuilder('CasBs/ooc-octopeer/pullrequests', {state: "MERGED", description: "no"});
            expect(parameterURL).toEqual('http://api.bitbucket.org/2.0/CasBs/ooc-octopeer/pullrequests?state=MERGED&description=no');
        });
    });
});