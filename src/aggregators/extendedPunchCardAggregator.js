/*exported ExtendedPunchCardAggregator*/
/*globals octopeerService, RSVP, PullRequestResolver, DataAggregatorHelperFunctions, UserResolver */
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
    
    function startArrayIfAble(array, startDate) {
        var allowed = true;
        if (array.length > 0 && !array[array.length - 1].hasOwnProperty("end")) {
            allowed = false;
        } else {
            array.push({
                start: startDate
            });
        }
        return allowed;
    }
    
    function endArrayIfAble(array, endDate) {
        if (array.length > 0 && !array[array.length - 1].hasOwnProperty("end")) {
            array[array.length - 1].end = endDate;
        }
    }
    
    function findSemanticSessions(events) {
        var semanticEvents = [],
            filling = false,
            sessionEvent;
        events.forEach(function (event) {
            /*jshint maxcomplexity:1000 */
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
                endArrayIfAble(sessionEvent.view_conversation, new Date(event.created_at));
                endArrayIfAble(sessionEvent.write_comment, new Date(event.created_at));
                endArrayIfAble(sessionEvent.view_code, new Date(event.created_at));
                endArrayIfAble(sessionEvent.view_commits, new Date(event.created_at));
                endArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
            } else if (filling) {
                sessionEvent = semanticEvents[semanticEvents.length - 1];
                if (event.element_type === 201 && event.event_type === 201) { //Watching conversation tab
                    startArrayIfAble(sessionEvent.view_conversation, new Date(event.created_at));
                } else if ((event.element_type === 202 || event.element_type === 203) &&
                           event.event_type === 201) {
                    endArrayIfAble(sessionEvent.view_conversation, new Date(event.created_at));
                }
                if (event.element_type === 203 && event.event_type === 201) { //Watching code tab
                    startArrayIfAble(sessionEvent.view_code, new Date(event.created_at));
                } else if ((event.element_type === 201 || event.element_type === 202) &&
                           event.event_type === 201) {
                    endArrayIfAble(sessionEvent.view_code, new Date(event.created_at));
                }
                if (event.element_type === 202 && event.event_type === 201) { //Watching commits tab
                    startArrayIfAble(sessionEvent.view_commits, new Date(event.created_at));
                } else if ((event.element_type === 201 || event.element_type === 203) &&
                           event.event_type === 201) {
                    endArrayIfAble(sessionEvent.view_commits, new Date(event.created_at));
                }
                if (event.element_type === 501 && event.event_type === 201) { //start commenting
                    startArrayIfAble(sessionEvent.write_comment, new Date(event.created_at));
                } else if ((event.element_type === 113 || event.element_type === 114 ||
                           event.element_type === 115) && event.event_type === 201) {
                    endArrayIfAble(sessionEvent.write_comment, new Date(event.created_at));
                }
                if ((event.element_type === 502 || event.element_type === 105) &&
                        event.event_type === 201) { //start inline commenting
                    startArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
                } else if ((event.element_type === 103 || event.element_type === 104) &&
                           event.event_type === 201) {
                    endArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
                }
            }
        });
        sessionEvent = semanticEvents[semanticEvents.length - 1];
        endArrayIfAble(sessionEvent.view_conversation, new Date(event.created_at));
        endArrayIfAble(sessionEvent.write_comment, new Date(event.created_at));
        endArrayIfAble(sessionEvent.view_code, new Date(event.created_at));
        endArrayIfAble(sessionEvent.view_commits, new Date(event.created_at));
        endArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
        return semanticEvents;
    }
    
    function transformToGraphObject(semanticEvents) {
        return semanticEvents.map(function (se) {
            var conversationViewEvents = se.view_conversation.map(function (e) {
                return {
                    "start": e.start,
                    "end": e.end,
                    "type": "view_conversation"
                };
            });
            var codeViewEvents = se.view_code.map(function (e) {
                return {
                    "start": e.start,
                    "end": e.end,
                    "type": "view_code"
                };
            });
            var commitViewEvents = se.view_commits.map(function (e) {
                return {
                    "start": e.start,
                    "end": e.end,
                    "type": "view_commits"
                };
            });
            var writeComments = se.write_comment.map(function (e) {
                return {
                    "start": e.start,
                    "end": e.end,
                    "type": "write_comment"
                };
            });
            var writeInlineComments = se.write_inline_comment.map(function (e) {
                return {
                    "start": e.start,
                    "end": e.end,
                    "type": "write_inline_comment"
                };
            });

            var viewConcatinated = conversationViewEvents.concat(codeViewEvents).concat(commitViewEvents);
            var writeConcatinated = writeComments.concat(writeInlineComments);
            var earliest = conversationViewEvents.sort(function (a, b) {
                return a - b;
            })[0].start;
            
            return {
                viewData: viewConcatinated,
                writeData: writeConcatinated,
                session_id: se.session_id,
                earliest: earliest
            };
        });
    }
    
    return new RSVP.Promise(function (fulfill, reject) {
        octopeerService.getSemanticEventsFromUser(userName)
            .then(filterEventsOnDate)
            .then(orderEvents)
            .then(findSemanticSessions)
            .then(transformToGraphObject)
            .then(fulfill);
    });
}
