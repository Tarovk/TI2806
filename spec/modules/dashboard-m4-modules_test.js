define(["src/modules/dashboard-m4-modules"], function (module) {
	var data = [{ "sessions":
        [
            {"id":"1","status":"11","duration":35,"repo":"mboom/TI2806"},
            {"id":"12","status":"2","duration":38,"repo":"mboom/TI2806"},
            {"id":"15","status":"22","duration":15,"repo":"mboom/TI2806"},
            {"id":"21","status":"2","duration":57,"repo":"mboom/TI2806"},
            {"id":"25","status":"2","duration":45,"repo":"mboom/TI2806"},
            {"id":"31","status":"2","duration":24,"repo":"mboom/TI2806"},
            {"id":"41","status":"1","duration":44,"repo":"mboom/TI2806"},
            {"id":"52","status":"2","duration":7,"repo":"mboom/TI2806"},
            {"id":"63","status":"1","duration":25,"repo":"mboom/TI2806"},
            {"id":"71","status":"11","duration":4,"repo":"mboom/TI2806"},
            {"id":"1","status":"11","duration":35,"repo":"agudek/demo0"},
            {"id":"12","status":"22","duration":38,"repo":"agudek/demo0"},
            {"id":"15","status":"1","duration":15,"repo":"agudek/demo0"},
            {"id":"21","status":"2","duration":57,"repo":"agudek/demo0"},
            {"id":"25","status":"1","duration":45,"repo":"agudek/demo0"},
            {"id":"31","status":"2","duration":24,"repo":"agudek/demo0"},
            {"id":"41","status":"2","duration":44,"repo":"agudek/demo0"},
            {"id":"52","status":"0","duration":7,"repo":"agudek/demo0"},
            {"id":"63","status":"0","duration":25,"repo":"agudek/demo0"},
            {"id":"71","status":"0","duration":4,"repo":"agudek/demo0"},
        ]
    }];
    var div = module.prebody();
    module.body(data);
    describe('Test suite for the dashboard-m4-modules module', function () {
        it('Return 6 cards', function () {
            expect(
            	div.selectAll('.card')[0].length
            ).toEqual(
            	6
            );
        });
    });
});
