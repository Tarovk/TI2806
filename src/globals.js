/* globals OctopeerHelper, OctopeerService, GitHubService, BitbucketService, SvgCreator */
/* exported modules, octopeerHelper, octopeerService, gitHubService, bitbucketService, svgCreator */

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i += 1) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
//Global modules list for if the module objects are needed elsewhere.
var modules = [];

//Global helper objects
var octopeerHelper = new OctopeerHelper();
var octopeerService = new OctopeerService();
var gitHubService = new GitHubService();
var bitbucketService = new BitbucketService();
//var dataAggregator = new DataAggregator();
var svgCreator = new SvgCreator();
var globalUserName = getUrlParameter("userName");
if (globalUserName === undefined) {
    globalUserName = "Travis";
}
