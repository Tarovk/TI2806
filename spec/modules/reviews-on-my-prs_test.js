define(["src/modules/reviews-on-my-prs"], function (module) {
	var data = [[
        {"pr":"17","repo":"mboom/TI2806","reviews":[
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z",
                "picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"pr":"34","repo":"agudek/demo","reviews":[
            {"username":"lvdoorn","session_start":"2016-06-06T13:08:30Z"},
            {"username":"borek2","session_start":"2016-06-06T13:08:30Z",
                "picture":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},
            {"username":"mboom","session_start":"2016-06-06T13:08:30Z"},
            {"username":"DaanvanderValk","session_start":"2016-06-06T13:08:30Z"},
            {"username":"agudek","session_start":"2016-06-06T13:08:30Z",
                "picture":"https://avatars2.githubusercontent.com/u/5946456?v=3&s=40"},
            {"username":"breijm","session_start":"2016-06-06T13:08:30Z"}
        ]},
        {"pr":"42","repo":"agudek/demo","reviews":[]},
        {"pr":"6","repo":"agudek/demo1","reviews":[]},
        {"pr":"2","repo":"agudek/demo2","reviews":[]},
        {"pr":"13","repo":"agudek/demo3","reviews":[]},
        {"pr":"62","repo":"agudek/demo4","reviews":[]},
        {"pr":"42","repo":"agudek/demo5","reviews":[]},
        {"pr":"6","repo":"agudek/demo6","reviews":[]},
        {"pr":"2","repo":"agudek/demo7","reviews":[]},
        {"pr":"13","repo":"agudek/demo8","reviews":[]},
        {"pr":"62","repo":"agudek/demo9","reviews":[]},
        {"pr":"42","repo":"agudek/demo10","reviews":[]},
        {"pr":"6","repo":"agudek/demo11","reviews":[]},
        {"pr":"2","repo":"agudek/demo12","reviews":[]},
        {"pr":"13","repo":"agudek/demo13","reviews":[]},
        {"pr":"62","repo":"agudek/demo14","reviews":[]}
    ]];
    var g = module.body(data);
    describe('Test suite for the reviews-on-my-prs', function () {
        it('Return 17 rows', function () {
            expect(
            	g.select('.reviews-on-my-prs-scrollContainer')
                    .selectAll('.reviews-on-my-prs-row')[0].length
            ).toEqual(
            	17
            );
        });
    });
});
