/* globals OctopeerHelper, OctopeerService, GitHubService, BitbucketService, SvgCreator */
/* exported modules, octopeerHelper, octopeerService, gitHubService, bitbucketService, svgCreator */

//Global modules list for if the module objects are needed elsewhere.
var modules = [];

//Global helper objects
var octopeerHelper = new OctopeerHelper();
var octopeerService = new OctopeerService();
var gitHubService = new GitHubService();
var bitbucketService = new BitbucketService();
//var dataAggregator = new DataAggregator();
var svgCreator = new SvgCreator();