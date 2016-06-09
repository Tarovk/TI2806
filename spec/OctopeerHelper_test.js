define(['src/OctopeerHelper'], function () {
    var ocHelper, pullRequest;
    var data = [
        {"x":0, "y":2},
        {"x":1, "y":3}
    ];

    beforeEach(function() {
        ocHelper = new OctopeerHelper();
        pullRequest = {
            repository: {
                platform: "GitHub",
                owner: "mboom",
                name: "TI2806"
            },
            pull_request_number: 23
        };
    });

    describe('An OctopeerHelper object', function () {
        it('getSafeModuleValue returns present field value', function () {
            var safeValue = ocHelper.getSafeModuleValue(pullRequest, 'pull_request_number');
            expect(safeValue).toEqual(23);
        });

        it('getSafeModuleValue returns present field value, not the standard module value', function () {
            ocHelper.defaultModule = {
                repository: {
                    platform: "GitHub",
                    owner: "mboom",
                    name: "TI2806"
                },
                pull_request_number: 0,
                pull_request_duration: 30
            };
            var safeValue = ocHelper.getSafeModuleValue(pullRequest, 'pull_request_number');
            expect(safeValue).toEqual(23);
        });

        it('getSafeModuleValue returns standard module value for undefined field value', function () {
            ocHelper.defaultModule = {
                repository: {
                    platform: "GitHub",
                    owner: "mboom",
                    name: "TI2806"
                },
                pull_request_number: 0,
                pull_request_duration: 30
            };
            var safeValue = ocHelper.getSafeModuleValue(pullRequest, 'pull_request_duration');
            expect(safeValue).toEqual(30);
        });



        it('getScaleType returns correct when using linear scaling', function () {
            var scale = d3.scale.linear();
            var scaleValue = ocHelper.getScaleType(scale);
            expect(scaleValue).toEqual("linear");
        });

        it('getScaleType returns correct when using time/date scaling', function () {
            var scale = d3.time.scale();
            var scaleValue = ocHelper.getScaleType(scale);
            expect(scaleValue).toEqual("time");
        });
        
        it('getScaleType returns correct when using an ordinal scaling', function () {
            var scale = d3.scale.ordinal();
            var scaleValue = ocHelper.getScaleType(scale);
            expect(scaleValue).toEqual("ordinal");
        });



        it('creates a line for some x- and y-dataset', function () {
            var lineValue = ocHelper.line(data);
            expect(lineValue).toEqual("M0,2L1,3");
        });

        it('creates a line for some x- and y-dataset with custom x-scaling', function () {
            var xScaling = function(data){ return 1; };

            var lineValue = ocHelper.line(data, "cardinal", xScaling);
            expect(lineValue).toEqual("M1,2L1,3");
        });

        it('creates a line for some x- and y-dataset with custom x- and y-scaling', function () {
            var xScaling = function(data){ return 2; };
            var yScaling = function(data){ return 3; };

            var lineValue = ocHelper.line(data, "cardinal", xScaling, yScaling);
            expect(lineValue).toEqual("M2,3L2,3");
        });



        it('creates an area for some x- and y-dataset', function () {
            var areaValue = ocHelper.area(data, 5);
            expect(areaValue).toEqual("M0,2L1,3L1,5L0,5Z");
        });

        it('creates an area for some x- and y-dataset with custom x-scaling', function () {
            var xScaling = function(data){ return 1; };

            var areaValue = ocHelper.area(data, 5, "cardinal", xScaling);
            expect(areaValue).toEqual("M1,2L1,3L1,5L1,5Z");
        });

        it('creates an area for some x- and y-dataset with custom x- and y-scaling', function () {
            var xScaling = function(data){ return 2; };
            var yScaling = function(data){ return 3; };

            var areaValue = ocHelper.area(data, 5, "cardinal", xScaling, yScaling);
            expect(areaValue).toEqual("M2,3L2,3L2,5L2,5Z");
        });
    });
});