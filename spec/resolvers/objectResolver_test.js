define(['src/resolvers/objectResolver'], function (resolver) {
    describe('ObjectResolver test', function () {
        it('should resolve an empty object correctly', function () {
            var oResolver = new ObjectResolver("");
            expect(oResolver.resolveSingleObject(JSON.stringify({}))).toBe(JSON.stringify({}));
        });
    });


});