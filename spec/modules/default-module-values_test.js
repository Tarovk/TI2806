define(["src/modules/default-module-values"], function (module) {
    describe('A default module', function () {
        it('has no name', function () {
            expect(module.name).toEqual("no-name");
        });

        it('contains empty axis labels', function () {
            expect(module.xAxisLabel).toEqual("");
            expect(module.yAxisLabel).toEqual("");
        });

        it('contains a parentSelector (string)', function () {
            expect(module.parentSelector).toEqual(jasmine.any(String));
        });

        it('contains an xAxisScale (string)', function () {
            expect(module.xAxisScale()).toEqual(jasmine.any(String));
        });

        it('contains an yAxisScale (string)', function () {
            expect(module.yAxisScale()).toEqual(jasmine.any(String));
        });

        it('contains an yRightAxisScale (string)', function () {
            expect(module.yRightAxisScale()).toEqual(jasmine.any(String));
        });

        it('contains an xAxisFitFunction (function)', function () {
            expect(module.xAxisFitFunction()).toEqual(jasmine.any(Array));
        });

        it('contains an yAxisFitFunction (function)', function () {
            expect(module.yAxisFitFunction()).toEqual(jasmine.any(Array));
        });

        it('contains an yRightAxisFitFunction (function)', function () {
            expect(module.yRightAxisFitFunction()).toEqual(jasmine.any(Function));
        });

        it('contains a body', function () {
            expect(module.body()).toBeDefined();
        });

        it('contains a failBody', function () {
            expect(module.failBody()).toBeDefined();
        });


    });
});
