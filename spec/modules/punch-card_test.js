define(['src/modules/punch-card'], function (module) {

    var data = [
        [
            { start: "2016-06-06T21:00:00.529Z", end: "2016-06-07T22:30:00.529Z" },
            { start: "2016-06-06T05:00:00.529Z", end: "2016-06-06T09:00:00.529Z" },
            { start: "2016-06-07T11:00:00.529Z", end: "2016-06-07T14:00:00.529Z" },
            { start: "2016-06-08T12:00:00.529Z", end: "2016-06-08T15:00:00.529Z" }
        ]
    ];

    var g = module.body(data);

    describe('punch card test suite', function () {

        it('should make the correct amount of nodes with the same class', function () {
            expect(g.selectAll('.same')[0].length).toEqual(3);
        });

        it('should make the correct amount of nodes with the diff class', function () {
            expect(g.selectAll('.diff')[0].length).toEqual(1);
        });

        it('should have the correct radius attribute for circles', function () {
            expect(g.select('circle')[0][0].getAttribute('r')).toBe('5');
        });

        it('should have the correct stroke-width attribute for lines', function () {
            expect(g.select('line')[0][0].getAttribute('stroke-width')).toBe('2');
        });

    });

});