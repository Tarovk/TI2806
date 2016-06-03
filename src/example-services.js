/*globals Graph4Aggregator, console*/

new Graph4Aggregator("mboom", "TI2806", 1).then(function (result) {
    console.log(result);
});

//var githubService = new GithubService();
//githubService.getPullRequests('mboom', 'TI2806', function (pullrequest) {
////	console.log(pullrequest);
//});
//
//var bitbucketService = new BitbucketService();
//bitbucketService.getPullRequests('jespern','django-piston', function (pullrequests){
////	console.log(pullrequests);
//});

