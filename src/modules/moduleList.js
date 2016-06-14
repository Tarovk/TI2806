/* globals define */
define([// Array of non-visualisation modules
        // These must be loaded in before the visualisation modules
        'settings',
        'apicallers',
        'pullrequestTransformer',
        'OctopeerHelper',
        'TimeHelper',
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
       	'aggregators/commentSizeAggregator',
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
        'modules/average-comment-size-compared',
        'modules/punch-card',

        //BEHAVIOUR
        'modules/behaviour-m4-modules',
        'modules/super-punch-card',

        //PROJECT
    	'modules/average-comment-size-total',
        'modules/no-of-pr-per-comment-sizes.js',
        'modules/session-duration-per-pr.js',

        //DEVELOPMENT
    	]
    ]; 
});
