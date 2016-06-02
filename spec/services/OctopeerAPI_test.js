define(['src/services/OctopeerAPI'], function () {
    describe('OctopeerAPI test', function () {
        it('should fail on incorrect endpoints', function () {
            var opapi = new OctopeerAPI();
            var endpoint = 'repositories';
            var parameters = [1];
            expect(function () { opapi.urlBuilder(endpoint, parameters) }).toThrow("endpoints must start with a slash (\'/\')");
        });

        it('should build a url correctly', function () {
            var opapi = new OctopeerAPI();
            var endpoint = '/repositories';
            var parameters = [];
            expect(opapi.urlBuilder(endpoint, parameters)).toEqual("http://146.185.128.124/api/repositories");
        });

        it('should build a url with parameters correctly', function () {
            var opapi = new OctopeerAPI();
            var endpoint = '/repositories';
            var parameters = { a: 1, b: 2, c: 3 };
            expect(opapi.urlBuilder(endpoint, parameters)).toEqual("http://146.185.128.124/api/repositories?a=1&b=2&c=3");
        });
    });
});