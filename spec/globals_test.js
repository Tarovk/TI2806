define(['src/globals'], function (settings) {
    describe('Test globals', function () {
        it('userName is set', function () {
            expect(globalUserName).toBeDefined();
        });
    });
});