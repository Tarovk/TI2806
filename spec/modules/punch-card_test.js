define(['src/modules/punch-card'], function (module) {

    var data = [[
        { "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T20:08:30Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/thervh70/ContextProject_RDD/7/", "id": 1, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/thervh70/ContextProject_RDD/7/", "repository": { "url": "http://146.185.128.124/api/repositories/thervh70/ContextProject_RDD/", "owner": "thervh70", "name": "ContextProject_RDD", "platform": "GitHub" }, "pull_request_number": 7 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
        { "start": "2016-06-06T12:08:30Z", "end": "2016-06-06T12:08:30Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/mboom/TI2806/191/", "id": 3, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/mboom/TI2806/191/", "repository": { "url": "http://146.185.128.124/api/repositories/mboom/TI2806/", "owner": "mboom", "name": "TI2806", "platform": "GitHub" }, "pull_request_number": 191 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
        { "start": "2016-06-06T13:08:30Z", "end": "2016-06-06T13:08:30Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/mboom/TI2806/191/", "id": 3, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/mboom/TI2806/191/", "repository": { "url": "http://146.185.128.124/api/repositories/mboom/TI2806/", "owner": "mboom", "name": "TI2806", "platform": "GitHub" }, "pull_request_number": 191 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } },
        { "start": "2016-06-06T14:08:30Z", "end": "2016-06-06T14:08:30Z", "session": { "url": "http://146.185.128.124/api/sessions/Travis/mboom/TI2806/195/", "id": 4, "pull_request": { "url": "http://146.185.128.124/api/pull-requests/mboom/TI2806/195/", "repository": { "url": "http://146.185.128.124/api/repositories/mboom/TI2806/", "owner": "mboom", "name": "TI2806", "platform": "GitHub" }, "pull_request_number": 195 }, "user": { "url": "http://146.185.128.124/api/users/Travis/", "id": 1, "username": "Travis" } } }
    ]];


    var g = module.body(data);

    describe('punch card test suite', function () {

        it('should have the correct radius attribute for circles', function () {
            expect(g.select('circle')[0][0].getAttribute('r')).toBe('5');
        });

        it('should have the correct stroke-width attribute for lines', function () {
            expect(g.select('line')[0][0].getAttribute('stroke-width')).toBe('2');
        });

    });

});