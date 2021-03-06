define(['libs/rsvp', 'src/settings', 'src/services/OctopeerService', 'src/services/OctopeerAPI'], function () {
    describe('An OctopeerService object', function () {
        var opservice = new OctopeerService();
        var apispy = opservice.getAPI();

        beforeEach(function(){
            spyOn(apispy, 'urlBuilder');
            spyOn(RSVP, 'Promise');
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getUsers()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.users;

            opservice.getUsers();
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI, {});
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getSessions()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.sessions;

            opservice.getSessions();
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI, {});
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getPullRequests()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.pullRequests;

            opservice.getPullRequests();
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI, {});
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getSemanticEventsBySession()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.semanticEvents;

            opservice.getSemanticEventsBySession();
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI, {});
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getSessionsFromPullRequests()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.pullRequests;
            var providedPrId = 44;

            opservice.getSessionsFromPullRequests(providedPrId);
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI + providedPrId + "/sessions", jasmine.any(Object));
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getSessionsFromUser(username)', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.sessions;
            var providedUsername = 'mboom';

            opservice.getSessionsFromUser(providedUsername);
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI + '/' + providedUsername, jasmine.any(Object));
            expect(RSVP.Promise).toHaveBeenCalled();
        });

        it('calls the API urlBuilder correctly and creates a Promise when executing getSemanticEvents()', function () {
            // Get actual URL from OctopeerAPI
            var providedURLfromAPI = new OctopeerAPI().endpoints.semanticEvents;

            opservice.getSemanticEvents();
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI, {});
            expect(RSVP.Promise).toHaveBeenCalled();
        });
        
        it('calls the API urlBuilder correctly and creates a Promise when executing getSemanticEventsForPullRequests()', function () {
            var api = new OctopeerAPI();
            var providedURLfromAPI = api.endpoints.semanticEvents + '/' +
                                'Travis' + '/' +
                                "thervh70" + '/' +
                                "ContextProject_RDD" + '/' +
                                7;

            opservice.getSemanticEventsOfPullRequest("Travis", "thervh70", "ContextProject_RDD", 7);
            expect(apispy.urlBuilder).toHaveBeenCalledWith(providedURLfromAPI);
            expect(RSVP.Promise).toHaveBeenCalled();

        });
    });
});