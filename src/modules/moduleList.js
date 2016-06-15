/* globals define */
define([// Array of non-visualisation modules
        // These must be loaded in before the visualisation modules
        'settings',
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
        'resolvers/userResolver',
        'svgCreator',
        'aggregators/DataAggregatorHelperFunctions',
        'aggregators/pullRequestsAggregator',
        'aggregators/forceLayoutAggregator',
        'aggregators/graph1aggregator',
        'aggregators/graph2aggregator',
        'aggregators/graph3aggregator',
        'aggregators/graph4aggregator',
        'aggregators/dashboardAggregator',
        'aggregators/punchCardAggregator',
        'aggregators/extendedPunchCardAggregator',
        'aggregators/ReviewsOnYourPrsAggregator',
        'aggregators/behaviourAggregator',
        'aggregators/timeSpentSizePrAggregator',
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
        'modules/behaviour-m4-modules',
        //PROJECT
    	'modules/pr-size',
    	'modules/average-comment-size-total',
        'modules/graph1.js',
        'modules/graph2.js',

        //DEVELOPMENT
    	]
    ]; 
});
