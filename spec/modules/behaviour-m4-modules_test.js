define(["src/modules/behaviour-m4-modules"], function (module) {
	var data = {"keystrokes":20762,
        "clicks":{"total":513, "merge":113, "close":113},
        "scrolls":932,
        "comments": {"pr":94,"inline":153,"edits":12}
    };
    var div = module.prebody();
    module.body(data);
    describe('Test suite for the behaviour-m4-modules module', function () {
        it('Return 3 cards', function () {
            expect(
            	div.selectAll('.card')[0].length
            ).toEqual(
            	3
            );
        });
    });
});
