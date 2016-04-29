function get(query, callback) {
    switch (query.replace(host, '')) {
        case '/':
            callback(db.root);
            break;
        case '/users/':
            callback(db.users);
            break;
        case '/pull-requests/':
            callback(db.pullrequests);
            break;
        case '/sessions/':
            callback(db.sessions);
            break;
        case '/events/':
            callback(db.events);
            break;
        case '/event-positions/':
            callback(db.eventpositions);
            break;
        case '/event-types/':
            callback(db.eventtypes);
            break;
        default:
            break;
    }
}

var database = function () {
    function genNumber(n) {
        return Math.round(Math.random() * n);
    }
    function genName() {
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var length = genNumber(100);
        var res = '';
        for (var i = 0; i < length; ++i) {
            res += chars[genNumber(chars.length - 1)];
        }
        return res;
    }
    function genDate() {
        var date = new Date();
        date.setDate(genNumber(28));
        return date.toTimeString();
    }
    var userscount = genNumber(100);
    var pullrequestscount = genNumber(100);
    var sessionscount = genNumber(100);
    var eventscount = genNumber(100);
    var eventpositionscount = genNumber(100);
    var eventtypescount = genNumber(100);

    this.root = {
        'users': host + '/users/',
        'pull-requests': host + '/pull-requests/',
        'sessions': host + '/sessions/',
        'events': host + '/events/',
        'event-positions': host + '/event-positions/',
        'event-types': host + '/event-types/'
    };

    this.users = {
        'count': userscount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= userscount; ++i) {
        var user = {
            'url': host + '/users/' + i + '/',
            'name': genName()
        };
        this.users.results.push(user);
    }

    this.pullrequests = {
        'count': pullrequestscount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= pullrequestscount; ++i) {
        var pullrequest = {
            'url': host + '/pull-requests/' + i + '/',
            'created_at': genDate(),
            'merged_at': genDate(),
            'closed_at': genDate()
        };
        this.pullrequests.results.push(pullrequest);
    }

    this.sessions = {
        'count': sessionscount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= sessionscount; ++i) {
        var pullrequest = genNumber(pullrequestscount);
        pullrequest = (pullrequest == 0) ? 1 : pullrequest;
        var user = genNumber(userscount);
        user = (user == 0) ? 1 : user;
        var session = {
            'url': host + '/sessions/' + i + '/',
            'platform': genName(),
            'pull_request': host + '/pull-requests/' + pullrequest + '/',
            'user': host + '/users/' + user + '/'
        };
        this.sessions.results.push(session);
    }

    this.events = {
        'count': eventscount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= eventscount; ++i) {
        var session = genNumber(sessionscount);
        session = (session == 0) ? 1 : session;
        var eventtype = genNumber(eventtypescount);
        eventtype = (eventtype == 0) ? 1 : eventtype;
        var event = {
            'url': host + '/events/' + i + '/',
            'started_at': genDate(),
            'duration': genNumber(1000),
            'session': host + '/sessions/' + session + '/',
            'event_type': host + '/event-types/' + eventtype + '/'
        };
        this.events.results.push(event);
    }

    this.eventpositions = {
        'count': eventpositionscount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= eventpositionscount; ++i) {
        var event = genNumber(eventscount);
        event = (event == 0) ? 1 : event;
        var eventposition = {
            'url': host + '/event-positions/' + i + '/',
            'filename': genName(),
            'event': host + '/events/' + event + '/'
        };
        this.eventpositions.results.push(eventposition);
    }
    this.eventtypes = {
        'count': eventtypescount,
        'next': null,
        'previous': null,
        'results': []
    };
    for (var i = 1; i <= eventtypescount; i++) {
        var eventtype = {
            'url': host + '/event-types/' + i + '/',
            'name': genName()
        };
        this.eventtypes.results.push(eventtype);
    }
}

var db = new database();