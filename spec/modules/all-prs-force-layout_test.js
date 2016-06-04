	require(["libs/d3/d3.min"], function() {
	define(["src/modules/all-prs-force-layout"], function (module) {
		var data = {
	        "nodes" : 
	            [
	                {"name":"user","type":"user","src":"https://avatars2.githubusercontent.com/u/2778466?v=3&s=460"},

	                {"name":"repo1","type":"repo","title":"mboom/TI2806"},
	                {"name":"repo2","type":"repo","title":"agudek/repo0"},
	                {"name":"repo3","type":"repo","title":"agudek/demo"},

	                {"name":"pr2","type":"pr","size":5,"status":0},
	                {"name":"pr14","type":"pr","size":7,"status":2},
	                {"name":"pr26","type":"pr","size":13,"status":0},

	                {"name":"pr1","type":"pr","size":2,"status":1},
	                {"name":"pr4","type":"pr","size":5,"status":1},
	                {"name":"pr7","type":"pr","size":9,"status":2},
	                {"name":"pr13","type":"pr","size":3,"status":0},
	                {"name":"pr21","type":"pr","size":15,"status":1},
	                {"name":"pr26","type":"pr","size":12,"status":0},
	                {"name":"pr37","type":"pr","size":5,"status":1},

	                {"name":"pr53","type":"pr","size":25,"status":1},
	                {"name":"pr79","type":"pr","size":15,"status":1}
	            ],
	        "links" :
	            [
	                {"source":1,"target":0,"value":1},
	                {"source":2,"target":0,"value":1},
	                {"source":3,"target":0,"value":1},

	                {"source":4,"target":1,"value":1},
	                {"source":5,"target":1,"value":1},
	                {"source":6,"target":1,"value":1},

	                {"source":7,"target":2,"value":1},
	                {"source":8,"target":2,"value":1},
	                {"source":9,"target":2,"value":1},
	                {"source":10,"target":2,"value":1},
	                {"source":11,"target":2,"value":1},
	                {"source":12,"target":2,"value":1},
	                {"source":13,"target":2,"value":1},

	                {"source":14,"target":3,"value":1},
	                {"source":15,"target":3,"value":1},
	            ]
	    };
	    describe('Test suite for the all-prs-force-layout module', function () {
	        it('Return 1 user node', function () {
            	var g = module.body(data);
	            expect(
	            	g.selectAll('.user').length
	            ).toEqual(
	            	1
	            );
	            //var aggregator = new Graph1Aggregator(username);
	            //console.log(setSemanticEvents(undefined));
	        });

	        it('Return 3 repo nodes', function () {
            	var g = module.body(data);
	            expect(
	            	g.selectAll('.repo').length
	            ).toEqual(
	            	3
	            );
	            //var aggregator = new Graph1Aggregator(username);
	            //console.log(setSemanticEvents(undefined));
	        });

	        it('Return 12 pr node', function () {
            	var g = module.body(data);
	            expect(
	            	g.selectAll('.pr').length
	            ).toEqual(
	            	12
	            );
	            //var aggregator = new Graph1Aggregator(username);
	            //console.log(setSemanticEvents(undefined));
	        });

	        it('Return 15 links', function () {
            	var g = module.body(data);
	            expect(
	            	g.selectAll('line').length
	            ).toEqual(
	            	15
	            );
	            //var aggregator = new Graph1Aggregator(username);
	            //console.log(setSemanticEvents(undefined));
	        });
	    });
	});
});
