/* exported PullRequestTransformer */

function PullRequestTransformer() {
    this.transform = function (pullrequest, type) {
        switch (type) {
            case "GITHUB":
                return transformGitHubPullrequest(pullrequest);
            case "BITBUCKET":
                return transformBitbucketPullrequest(pullrequest);
            default:
                console.log("Unaccepted type");
        }
    };
    this.transformGitHubFiles = function (files) {
        return files.map(function (file) {
            return {
                "filename": file.filename,
                "additions": file.additions,
                "deletions": file.deletions,
                "status": file.status
            };
        });
    };

    function transformGitHubPullrequest(pullrequest) {
        var merged = (pullrequest.merged_at !== null);
        return {
            "url": pullrequest.html_url,
            "title": pullrequest.title,
            "author": pullrequest.user.login,
            "created_at": pullrequest.created_at,
            "updated_at": pullrequest.updated_at,
            "description": pullrequest.body,
            "state": pullrequest.state,
            "merged": merged,
            "number": pullrequest.number
        };
    }

    function transformBitbucketPullrequest(pullrequest) {
        var merged = (pullrequest.merge_commit !== null);
        return {
            "url": pullrequest.links.self.href,
            "title": pullrequest.title,
            "author": pullrequest.author.username,
            "created_at": pullrequest.created_on,
            "updated_at": pullrequest.updated_on,
            "description": pullrequest.description,
            "state": pullrequest.state,
            "merged": merged,
            "number": pullrequest.id
        };
    }


}

