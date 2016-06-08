/* globals define */
define([// Array of non-visualisation modules
        // These must be loaded in before the visualisation modules
        // Keep in mind that there should be a corresponding module_test.js in the /test folder
        'settings',
        'cache',
        'apicallers',
        'pullrequestTransformer',
        'OctopeerHelper',
        'resolvers/objectResolver',
        'services/OctopeerAPI',
        'services/OctopeerService',
        'services/GitHubAPI',
        'services/GitHubService',
        'services/BitbucketAPI',
	    'services/BitbucketService',
        'resolvers/pullRequestResolver',
        'svgCreator',
        'aggregators/pullRequestsAggregator.js',
        'aggregators/graph1aggregator.js',
        'aggregators/graph2aggregator.js',
        'aggregators/graph3aggregator.js',
        'aggregators/graph4aggregator.js',
        'example-services',
        'globals'
        ], function () {
    "use strict";
    
    return [
        //Module with default values. Needs to be loaded in seperately 
        //so that they can be used in the visualistaion modules without problems
        ['modules/default-module-values'],
	    [// Array of visualisation modules
    	'modules/pull-requests',
    	'modules/time-and-pr-size',
    	'modules/time-spent-on-pr',
    	'modules/pr-size',
    	'modules/average-comment-size-compared',
    	'modules/average-comment-size-yours',
    	'modules/average-comment-size-total',
        'modules/graph1.js',
        'modules/graph2.js',
        'modules/all-prs-force-layout'
    	]
    ]; 
});
