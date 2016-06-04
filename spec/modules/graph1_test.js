define(["src/modules/graph1"], function (module) {
	var data = [
        {"x":0,"y":8},
        {"x":1,"y":2},
        {"x":2,"y":2},
        {"x":3,"y":3},
        {"x":4,"y":2},
    ];
    var g = module.body(data),
    xaxis = module.xAxisScale(),
    yaxis = module.yAxisFitFunction(data);

    describe('Test suite for the all-prs-force-layout module', function () {
        it('Return 4 bars', function () {
            expect(
            	g.selectAll('rect')[0].length
            ).toEqual(
            	4
            );
        });
    });

    describe('Test suite for the all-prs-force-layout module', function () {
        it('X axis scale is ordinal', function () {
            expect(
                typeof xaxis.scale().rangePoints
            ).toEqual(
                "function"
            );
        });
    });

    describe('Test suite for the all-prs-force-layout module', function () {
        it('Y axis is fit', function () {
            expect(
                module.yAxisScale()
            ).toEqual(
                "fit"
            );
        });
    });

    describe('Test suite for the all-prs-force-layout module', function () {
        it('Y axis scale is not ordinal', function () {
            expect(
                typeof yaxis.scale().rangePoints
            ).toEqual(
                "undefined"
            );
        });
    });
});
