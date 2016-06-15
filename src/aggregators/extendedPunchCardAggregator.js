/*exported Graph1Aggregator*/
/*globals octopeerService, RSVP, PunchCardAggregator, PullRequestResolver, DataAggregatorHelperFunctions, UserResolver */
/*jshint unused: false*/
function ExtendedPunchCardAggregator(userName, platform, from, to) {
    "use strict";
    var promise,
        prResolver = new PullRequestResolver(),
        userResolver = new UserResolver(platform);
    
    console.log(userName);
    console.log(platform);
    console.log(from);
    console.log(to);
    
    //1. Get semantic events user x
    //2. filter op datum (from, to) x
    //3. order op datum van vroeg naar laat x
    //4. ga ze 1 voor 1 af totdat er een relevante startende semantic event komt
    //5. ga door totdat je de afsluitende event tegenkomt
    //6. sla start en end op, en 
    
    function filterEventsOnDate(events) {
        console.log(events);
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
        console.log(array, endDate);
        if (array.length > 0 && !array[array.length - 1].hasOwnProperty("end")) {
            console.log(array, endDate);
            console.log(array[array.length - 1], endDate);
            array[array.length - 1].end = endDate;
        }
    }
    
    function findSemanticSessions(events) {
        var semanticEvents = [],
            filling = false,
            sessionEvent;
        events.forEach(function (event) {
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
                if ((event.element_type === 502 || event.element_type === 105)
                        && event.event_type === 201) { //start inline commenting
                    startArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
                } else if ((event.element_type === 103 || event.element_type === 104) &&
                           event.event_type === 201) {
                    endArrayIfAble(sessionEvent.write_inline_comment, new Date(event.created_at));
                }
            }
        });
        console.log(semanticEvents);
        return semanticEvents;
    }
    
    return new RSVP.Promise(function (fulfill, reject) {
        octopeerService.getSemanticEventsFromUser(userName)
            .then(filterEventsOnDate)
            .then(orderEvents)
            .then(findSemanticSessions)
            .then(fulfill);
    });
}
