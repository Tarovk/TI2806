define(['src/modules/punch-card'], function (module) {

    

    var g = module.body(data);

    describe('punch card test suite', function () {

        it('should have the correct radius attribute for circles', function () {
            expect(g.select('circle')[0][0].getAttribute('r')).toBe('5');
        });

        it('should have the correct stroke-width attribute for lines', function () {
            expect(g.select('line')[0][0].getAttribute('stroke-width')).toBe('2');
        });

    });

});