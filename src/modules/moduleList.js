/* globals define */
define([// Array of non-visualisation modules
        // These must be loaded in before the visualisation modules
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
        'aggregators/forceLayoutAggregator.js',
        'aggregators/graph1aggregator.js',
        'aggregators/graph2aggregator.js',
        'aggregators/graph3aggregator.js',
        'aggregators/graph4aggregator.js',
        'aggregators/dashboardAggregator.js',
        'aggregators/punchCardAggregator.js',
        'example-services',
        'globals'
        ], function () {
    "use strict";
    
    return [
        //Module with default values. Needs to be loaded in seperately 
        //so that they can be used in the visualistaion modules without problems
        ['modules/default-module-values'],
	    [// Array of visualisation modules
        //DASHBOARD
        'modules/all-prs-force-layout',
        'modules/reviews-on-my-prs',
        'modules/dashboard-m4-modules',

        //PERSONAL
        'modules/time-and-pr-size',
        'modules/time-spent-on-pr',
        'modules/average-comment-size-compared',
        'modules/average-comment-size-yours',
        'modules/punch-card',

        //BEHAVIOUR

        //PROJECT
    	'modules/pr-size',
    	'modules/average-comment-size-total',
        'modules/graph1.js',
        'modules/graph2.js',

        //DEVELOPMENT
    	]
    ]; 
});
