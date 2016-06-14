/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, PunchCardAggregator, PullRequestResolver, DataAggregatorHelperFunctions, UserResolver */
/*jshint unused: false*/
function ExtendedPunchCardAggregator(userName, platform, from, to) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver(),
        userResolver = new UserResolver(platform);
    
    //1. Get semantic events user x
    //2. filter op datum (from, to) x
    //3. order op datum van vroeg naar laat x
    //4. ga ze 1 voor 1 af totdat er een relevante startende semantic event komt
    //5. ga door totdat je de afsluitende event tegenkomt
    //6. sla start en end op, en 
    
    function filterEventsOnDate(events) {
        return events.filter(function (event) {
            return new Date(event.created_at) > from &&
                new Date(event.created_at) < to;
        });
    }
    
    function orderEvents(events) {
        return events.sort(function (a, b) {
            return new Date(a.created_at) - new Date(b.created_at);
        });
    }
    
    function findSemanticSessions(events) {
        var semanticEvents = [],
            filling = false,
            sessionEvent;
        var counter = 0;
        events.forEach(function (event) {
            counter += 1;
            if (event.event_type === 401 && !filling) {
                filling = true;
                semanticEvents.push({
                    "view_conversation": [{
                        start: new Date(event.created_at)
                    }],
                    "write_comment": [],
                    "write_inline_comment": [],
                    "view_code": [],
                    "view_commits": [],
                    "session_id": event.session.id
                });
            } else if (event.event_type === 402) {
                filling = false;
                sessionEvent = semanticEvents[semanticEvents.length - 1];
                if (sessionEvent.view_conversation.length > 0 && 
                    !sessionEvent.view_conversation[sessionEvent.view_conversation.length - 1].hasOwnProperty("end")) {
                    sessionEvent.view_conversation[sessionEvent.view_conversation.length - 1].end = new Date(event.created_at);
                }
                if (sessionEvent.write_comment.length > 0 && 
                    !sessionEvent.write_comment[sessionEvent.write_comment.length - 1].hasOwnProperty("end")) {
                    sessionEvent.write_comment[sessionEvent.write_comment.length - 1].end = new Date(event.created_at);
                }
                if (sessionEvent.write_inline_comment.length > 0 && 
                    !sessionEvent.write_inline_comment[sessionEvent.write_inline_comment.length - 1].hasOwnProperty("end")) {
                    sessionEvent.write_inline_comment[sessionEvent.write_inline_comment.length - 1].end = new Date(event.created_at);
                }
                if (sessionEvent.view_code.length > 0 && 
                    !sessionEvent.view_code[sessionEvent.view_code.length - 1].hasOwnProperty("end")) {
                    sessionEvent.view_code[sessionEvent.view_code.length - 1].end = new Date(event.created_at);
                }
                if (sessionEvent.view_commits.length > 0 && 
                    !sessionEvent.view_commits[sessionEvent.view_commits.length - 1].hasOwnProperty("end")) {
                    sessionEvent.view_commits[sessionEvent.view_commits.length - 1].end = new Date(event.created_at);
                }
            } else if (filling) {
                sessionEvent = semanticEvents[semanticEvents.length - 1];
                if (event.element_type === 201 && event.event_type === 201) { //Watching conversation tab
                    if (sessionEvent.view_conversation.length > 0 && 
                       !sessionEvent.view_conversation[sessionEvent.view_conversation.length - 1].hasOwnProperty("end")) {
                        
                    } else {
                        sessionEvent.view_conversation.push({
                            start: new Date(event.created_at)
                        });
                    }
                } else if ((event.element_type === 202 || //leaves conversation tab
                           event.element_type === 203) &&
                           event.event_type === 201) {
                    if (sessionEvent.view_conversation.length > 0 && 
                       !sessionEvent.view_conversation[sessionEvent.view_conversation.length - 1].hasOwnProperty("end")) {
                        sessionEvent.view_conversation[sessionEvent.view_conversation.length - 1]
                        .end = new Date(event.created_at);
                    }
                }
                if (event.element_type === 203 && event.event_type === 201) { //Watching code tab
                    if (sessionEvent.view_code.length > 0 && 
                       !sessionEvent.view_code[sessionEvent.view_code.length - 1].hasOwnProperty("end")) {
                        
                    } else {
                        sessionEvent.view_code.push({
                            start: new Date(event.created_at)
                        });
                    }
                } else if ((event.element_type === 201 || //leaves code tab
                           event.element_type === 202) &&
                           event.event_type === 201) {
                    if (sessionEvent.view_code.length > 0 && 
                       !sessionEvent.view_code[sessionEvent.view_code.length - 1].hasOwnProperty("end")) {
                        sessionEvent.view_code[sessionEvent.view_code.length - 1]
                        .end = new Date(event.created_at);
                    }
                }
                if (event.element_type === 202 && event.event_type === 201) { //Watching commits tab
                    if (sessionEvent.view_commits.length > 0 && 
                       !sessionEvent.view_commits[sessionEvent.view_commits.length - 1].hasOwnProperty("end")) {
                        
                    } else {
                        sessionEvent.view_commits.push({
                            start: new Date(event.created_at)
                        });
                    }
                } else if ((event.element_type === 201 || //leaves commits tab
                           event.element_type === 203) &&
                           event.event_type === 201) {
                    if (sessionEvent.view_commits.length > 0 && 
                       !sessionEvent.view_commits[sessionEvent.view_commits.length - 1].hasOwnProperty("end")) {
                        sessionEvent.view_commits[sessionEvent.view_commits.length - 1]
                        .end = new Date(event.created_at);
                    }
                }
                if (event.element_type === 501 && event.event_type === 201) { //start commenting
                    if (sessionEvent.write_comment.length > 0 && 
                       !sessionEvent.write_comment[sessionEvent.write_comment.length - 1].hasOwnProperty("end")) {
                        
                    } else {
                        sessionEvent.write_comment.push({
                            start: new Date(event.created_at)
                        });
                    }
                } else if ((event.element_type === 113 || //done commenting
                           event.element_type === 114 ||
                           event.element_type === 115) &&
                           event.event_type === 201) {
                    sessionEvent.write_comment[sessionEvent.write_comment.length - 1]
                        .end = new Date(event.created_at);
                }
                if ((event.element_type === 502 ||
                     event.element_type === 105) 
                    && event.event_type === 201) { //start inline commenting
                    if (sessionEvent.write_inline_comment.length > 0 && 
                       !sessionEvent.write_inline_comment[sessionEvent.write_inline_comment.length - 1].hasOwnProperty("end")) {
                        
                    } else {
                        sessionEvent.write_inline_comment.push({
                            start: new Date(event.created_at)
                        });
                    }
                } else if ((event.element_type === 103 || //done inline commenting
                           event.element_type === 104) &&
                           event.event_type === 201) {
                    sessionEvent.write_inline_comment[sessionEvent.write_inline_comment.length - 1]
                        .end = new Date(event.created_at);
                }
            }
        });
        console.log(semanticEvents);
        return semanticEvents;
    }
    
//    this.getDetail = function (from, to) {
        return new RSVP.Promise(function (fulfill, reject) {
            octopeerService.getSemanticEventsFromUser(userName)
                .then(filterEventsOnDate)
                .then(orderEvents)
                .then(findSemanticSessions)
                .then(fulfill);
        });
//    };
    
    //return new PunchCardAggregator(userName);
}
