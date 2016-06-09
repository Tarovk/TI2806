define(['src/resolvers/objectResolver'], function (resolver) {
    describe('An ObjectResolver object', function () {
        it('should resolve an empty object correctly', function () {
            var oResolver = new ObjectResolver("");
            expect(oResolver.resolveSingleObject(JSON.stringify({}))).toEqual(JSON.stringify({}));
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve an empty array correctly', function () {
            var oResolver = new ObjectResolver("");
            expect(oResolver.resolveArray([])).toEqual([]);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve an non-empty array correctly', function () {
            var oResolver = new ObjectResolver("");
            expect(oResolver.resolveArray(['1','5'])).toEqual(['1', '5']);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve an empty URL correctly', function () {
            var oResolver = new ObjectResolver("");
            var res = oResolver.resolveUrl("");
            var comp = RSVP.all([]);

            expect(res._label).toEqual(comp._label);
            expect(res._subscribers).toEqual(comp._subscribers);
            expect(res._state).toEqual(comp._state);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve an empty array of URLs correctly', function () {
            var oResolver = new ObjectResolver("");
            var res = oResolver.resolveArrayOfUrls([]);

            var comp = new RSVP.Promise(function (fulfill) {
                getJSON(url, function (obj) {
                    fulfill(obj);
                });
            });

            expect(res._label).toEqual(comp._label);
            expect(res._subscribers).toEqual(comp._subscribers);
            expect(res._state).toEqual(comp._state);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve an array of URLs correctly', function () {
            var oResolver = new ObjectResolver("");
            var res = oResolver.resolveArrayOfUrls([{url: 'http://146.185.128.124/api/semantic-events/13/'}]);

            var comp = new RSVP.Promise(function (fulfill) {
                getJSON(url, function (obj) {
                    fulfill(obj);
                });
            });

            expect(res._label).toEqual(comp._label);
            expect(res._subscribers).toEqual(comp._subscribers);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve a single object with provided fields', function () {
            var oResolver = new ObjectResolver(['url']);
            var obj = {size: 1, str: "hi", url: "http://146.185.128.124/api/semantic-events/13/"};
            var res = oResolver.resolveSingleObject(obj);

            expect(res).toEqual(obj);
        });
    });

    describe('An ObjectResolver object', function () {
        it('should resolve a single object without provided fields', function () {
            var oResolver = new ObjectResolver(['url']);
            var obj = {size: 1, str: "hi"};
            var res = oResolver.resolveSingleObject(obj);

            expect(res).toEqual(obj);
        });
    });

});