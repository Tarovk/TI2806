(function () {
    module('Create a pullrequestTransformer object', {
        // Set up this module
        setup: function () {
            this.prt = new PullRequestTransformer();
        }
    });


    test("Transform a GitHub pullrequest", function (assert) {

        
        var pullrequest = {
            "url": "https://api.github.com/repos/mboom/TI2806/pulls/125",
            "id": 71288515,
            "html_url": "https://github.com/mboom/TI2806/pull/125",
            "diff_url": "https://github.com/mboom/TI2806/pull/125.diff",
            "patch_url": "https://github.com/mboom/TI2806/pull/125.patch",
            "issue_url": "https://api.github.com/repos/mboom/TI2806/issues/125",
            "number": 125,
            "state": "open",
            "locked": false,
            "title": "Module data service integration #101",
            "user": {
                "login": "agudek",
                "id": 5946456,
                "avatar_url": "https://avatars.githubusercontent.com/u/5946456?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/agudek",
                "html_url": "https://github.com/agudek",
                "followers_url": "https://api.github.com/users/agudek/followers",
                "following_url": "https://api.github.com/users/agudek/following{/other_user}",
                "gists_url": "https://api.github.com/users/agudek/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/agudek/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/agudek/subscriptions",
                "organizations_url": "https://api.github.com/users/agudek/orgs",
                "repos_url": "https://api.github.com/users/agudek/repos",
                "events_url": "https://api.github.com/users/agudek/events{/privacy}",
                "received_events_url": "https://api.github.com/users/agudek/received_events",
                "type": "User",
                "site_admin": false
            },
            "body": "Data aggregator + data gathering in modules",
            "created_at": "2016-05-24T20:38:40Z",
            "updated_at": "2016-05-26T08:39:09Z",
            "closed_at": null,
            "merged_at": null,
            "merge_commit_sha": "8a5bc4b43acea430513ac3b50607b7e1b64d6419",
            "assignee": null,
            "milestone": null,
            "commits_url": "https://api.github.com/repos/mboom/TI2806/pulls/125/commits",
            "review_comments_url": "https://api.github.com/repos/mboom/TI2806/pulls/125/comments",
            "review_comment_url": "https://api.github.com/repos/mboom/TI2806/pulls/comments{/number}",
            "comments_url": "https://api.github.com/repos/mboom/TI2806/issues/125/comments",
            "statuses_url": "https://api.github.com/repos/mboom/TI2806/statuses/82e5ffd8909929c113c2a3859c8cf93c8c607164",
            "head": {
                "label": "mboom:module-dataService-integration-#101",
                "ref": "module-dataService-integration-#101",
                "sha": "82e5ffd8909929c113c2a3859c8cf93c8c607164",
                "user": {
                    "login": "mboom",
                    "id": 9715349,
                    "avatar_url": "https://avatars.githubusercontent.com/u/9715349?v=3",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/mboom",
                    "html_url": "https://github.com/mboom",
                    "followers_url": "https://api.github.com/users/mboom/followers",
                    "following_url": "https://api.github.com/users/mboom/following{/other_user}",
                    "gists_url": "https://api.github.com/users/mboom/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/mboom/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/mboom/subscriptions",
                    "organizations_url": "https://api.github.com/users/mboom/orgs",
                    "repos_url": "https://api.github.com/users/mboom/repos",
                    "events_url": "https://api.github.com/users/mboom/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/mboom/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "repo": {
                    "id": 56750401,
                    "name": "TI2806",
                    "full_name": "mboom/TI2806",
                    "owner": {
                        "login": "mboom",
                        "id": 9715349,
                        "avatar_url": "https://avatars.githubusercontent.com/u/9715349?v=3",
                        "gravatar_id": "",
                        "url": "https://api.github.com/users/mboom",
                        "html_url": "https://github.com/mboom",
                        "followers_url": "https://api.github.com/users/mboom/followers",
                        "following_url": "https://api.github.com/users/mboom/following{/other_user}",
                        "gists_url": "https://api.github.com/users/mboom/gists{/gist_id}",
                        "starred_url": "https://api.github.com/users/mboom/starred{/owner}{/repo}",
                        "subscriptions_url": "https://api.github.com/users/mboom/subscriptions",
                        "organizations_url": "https://api.github.com/users/mboom/orgs",
                        "repos_url": "https://api.github.com/users/mboom/repos",
                        "events_url": "https://api.github.com/users/mboom/events{/privacy}",
                        "received_events_url": "https://api.github.com/users/mboom/received_events",
                        "type": "User",
                        "site_admin": false
                    },
                    "private": false,
                    "html_url": "https://github.com/mboom/TI2806",
                    "description": "Tools for Software Engineering",
                    "fork": false,
                    "url": "https://api.github.com/repos/mboom/TI2806",
                    "forks_url": "https://api.github.com/repos/mboom/TI2806/forks",
                    "keys_url": "https://api.github.com/repos/mboom/TI2806/keys{/key_id}",
                    "collaborators_url": "https://api.github.com/repos/mboom/TI2806/collaborators{/collaborator}",
                    "teams_url": "https://api.github.com/repos/mboom/TI2806/teams",
                    "hooks_url": "https://api.github.com/repos/mboom/TI2806/hooks",
                    "issue_events_url": "https://api.github.com/repos/mboom/TI2806/issues/events{/number}",
                    "events_url": "https://api.github.com/repos/mboom/TI2806/events",
                    "assignees_url": "https://api.github.com/repos/mboom/TI2806/assignees{/user}",
                    "branches_url": "https://api.github.com/repos/mboom/TI2806/branches{/branch}",
                    "tags_url": "https://api.github.com/repos/mboom/TI2806/tags",
                    "blobs_url": "https://api.github.com/repos/mboom/TI2806/git/blobs{/sha}",
                    "git_tags_url": "https://api.github.com/repos/mboom/TI2806/git/tags{/sha}",
                    "git_refs_url": "https://api.github.com/repos/mboom/TI2806/git/refs{/sha}",
                    "trees_url": "https://api.github.com/repos/mboom/TI2806/git/trees{/sha}",
                    "statuses_url": "https://api.github.com/repos/mboom/TI2806/statuses/{sha}",
                    "languages_url": "https://api.github.com/repos/mboom/TI2806/languages",
                    "stargazers_url": "https://api.github.com/repos/mboom/TI2806/stargazers",
                    "contributors_url": "https://api.github.com/repos/mboom/TI2806/contributors",
                    "subscribers_url": "https://api.github.com/repos/mboom/TI2806/subscribers",
                    "subscription_url": "https://api.github.com/repos/mboom/TI2806/subscription",
                    "commits_url": "https://api.github.com/repos/mboom/TI2806/commits{/sha}",
                    "git_commits_url": "https://api.github.com/repos/mboom/TI2806/git/commits{/sha}",
                    "comments_url": "https://api.github.com/repos/mboom/TI2806/comments{/number}",
                    "issue_comment_url": "https://api.github.com/repos/mboom/TI2806/issues/comments{/number}",
                    "contents_url": "https://api.github.com/repos/mboom/TI2806/contents/{+path}",
                    "compare_url": "https://api.github.com/repos/mboom/TI2806/compare/{base}...{head}",
                    "merges_url": "https://api.github.com/repos/mboom/TI2806/merges",
                    "archive_url": "https://api.github.com/repos/mboom/TI2806/{archive_format}{/ref}",
                    "downloads_url": "https://api.github.com/repos/mboom/TI2806/downloads",
                    "issues_url": "https://api.github.com/repos/mboom/TI2806/issues{/number}",
                    "pulls_url": "https://api.github.com/repos/mboom/TI2806/pulls{/number}",
                    "milestones_url": "https://api.github.com/repos/mboom/TI2806/milestones{/number}",
                    "notifications_url": "https://api.github.com/repos/mboom/TI2806/notifications{?since,all,participating}",
                    "labels_url": "https://api.github.com/repos/mboom/TI2806/labels{/name}",
                    "releases_url": "https://api.github.com/repos/mboom/TI2806/releases{/id}",
                    "deployments_url": "https://api.github.com/repos/mboom/TI2806/deployments",
                    "created_at": "2016-04-21T07:03:58Z",
                    "updated_at": "2016-04-21T10:00:55Z",
                    "pushed_at": "2016-05-26T08:39:09Z",
                    "git_url": "git://github.com/mboom/TI2806.git",
                    "ssh_url": "git@github.com:mboom/TI2806.git",
                    "clone_url": "https://github.com/mboom/TI2806.git",
                    "svn_url": "https://github.com/mboom/TI2806",
                    "homepage": null,
                    "size": 4370,
                    "stargazers_count": 0,
                    "watchers_count": 0,
                    "language": "JavaScript",
                    "has_issues": true,
                    "has_downloads": true,
                    "has_wiki": true,
                    "has_pages": true,
                    "forks_count": 2,
                    "mirror_url": null,
                    "open_issues_count": 16,
                    "forks": 2,
                    "open_issues": 16,
                    "watchers": 0,
                    "default_branch": "master"
                }
            },
            "base": {
                "label": "mboom:master",
                "ref": "master",
                "sha": "01170239108bf68872fe940e3ce62e4ac69e6305",
                "user": {
                    "login": "mboom",
                    "id": 9715349,
                    "avatar_url": "https://avatars.githubusercontent.com/u/9715349?v=3",
                    "gravatar_id": "",
                    "url": "https://api.github.com/users/mboom",
                    "html_url": "https://github.com/mboom",
                    "followers_url": "https://api.github.com/users/mboom/followers",
                    "following_url": "https://api.github.com/users/mboom/following{/other_user}",
                    "gists_url": "https://api.github.com/users/mboom/gists{/gist_id}",
                    "starred_url": "https://api.github.com/users/mboom/starred{/owner}{/repo}",
                    "subscriptions_url": "https://api.github.com/users/mboom/subscriptions",
                    "organizations_url": "https://api.github.com/users/mboom/orgs",
                    "repos_url": "https://api.github.com/users/mboom/repos",
                    "events_url": "https://api.github.com/users/mboom/events{/privacy}",
                    "received_events_url": "https://api.github.com/users/mboom/received_events",
                    "type": "User",
                    "site_admin": false
                },
                "repo": {
                    "id": 56750401,
                    "name": "TI2806",
                    "full_name": "mboom/TI2806",
                    "owner": {
                        "login": "mboom",
                        "id": 9715349,
                        "avatar_url": "https://avatars.githubusercontent.com/u/9715349?v=3",
                        "gravatar_id": "",
                        "url": "https://api.github.com/users/mboom",
                        "html_url": "https://github.com/mboom",
                        "followers_url": "https://api.github.com/users/mboom/followers",
                        "following_url": "https://api.github.com/users/mboom/following{/other_user}",
                        "gists_url": "https://api.github.com/users/mboom/gists{/gist_id}",
                        "starred_url": "https://api.github.com/users/mboom/starred{/owner}{/repo}",
                        "subscriptions_url": "https://api.github.com/users/mboom/subscriptions",
                        "organizations_url": "https://api.github.com/users/mboom/orgs",
                        "repos_url": "https://api.github.com/users/mboom/repos",
                        "events_url": "https://api.github.com/users/mboom/events{/privacy}",
                        "received_events_url": "https://api.github.com/users/mboom/received_events",
                        "type": "User",
                        "site_admin": false
                    },
                    "private": false,
                    "html_url": "https://github.com/mboom/TI2806",
                    "description": "Tools for Software Engineering",
                    "fork": false,
                    "url": "https://api.github.com/repos/mboom/TI2806",
                    "forks_url": "https://api.github.com/repos/mboom/TI2806/forks",
                    "keys_url": "https://api.github.com/repos/mboom/TI2806/keys{/key_id}",
                    "collaborators_url": "https://api.github.com/repos/mboom/TI2806/collaborators{/collaborator}",
                    "teams_url": "https://api.github.com/repos/mboom/TI2806/teams",
                    "hooks_url": "https://api.github.com/repos/mboom/TI2806/hooks",
                    "issue_events_url": "https://api.github.com/repos/mboom/TI2806/issues/events{/number}",
                    "events_url": "https://api.github.com/repos/mboom/TI2806/events",
                    "assignees_url": "https://api.github.com/repos/mboom/TI2806/assignees{/user}",
                    "branches_url": "https://api.github.com/repos/mboom/TI2806/branches{/branch}",
                    "tags_url": "https://api.github.com/repos/mboom/TI2806/tags",
                    "blobs_url": "https://api.github.com/repos/mboom/TI2806/git/blobs{/sha}",
                    "git_tags_url": "https://api.github.com/repos/mboom/TI2806/git/tags{/sha}",
                    "git_refs_url": "https://api.github.com/repos/mboom/TI2806/git/refs{/sha}",
                    "trees_url": "https://api.github.com/repos/mboom/TI2806/git/trees{/sha}",
                    "statuses_url": "https://api.github.com/repos/mboom/TI2806/statuses/{sha}",
                    "languages_url": "https://api.github.com/repos/mboom/TI2806/languages",
                    "stargazers_url": "https://api.github.com/repos/mboom/TI2806/stargazers",
                    "contributors_url": "https://api.github.com/repos/mboom/TI2806/contributors",
                    "subscribers_url": "https://api.github.com/repos/mboom/TI2806/subscribers",
                    "subscription_url": "https://api.github.com/repos/mboom/TI2806/subscription",
                    "commits_url": "https://api.github.com/repos/mboom/TI2806/commits{/sha}",
                    "git_commits_url": "https://api.github.com/repos/mboom/TI2806/git/commits{/sha}",
                    "comments_url": "https://api.github.com/repos/mboom/TI2806/comments{/number}",
                    "issue_comment_url": "https://api.github.com/repos/mboom/TI2806/issues/comments{/number}",
                    "contents_url": "https://api.github.com/repos/mboom/TI2806/contents/{+path}",
                    "compare_url": "https://api.github.com/repos/mboom/TI2806/compare/{base}...{head}",
                    "merges_url": "https://api.github.com/repos/mboom/TI2806/merges",
                    "archive_url": "https://api.github.com/repos/mboom/TI2806/{archive_format}{/ref}",
                    "downloads_url": "https://api.github.com/repos/mboom/TI2806/downloads",
                    "issues_url": "https://api.github.com/repos/mboom/TI2806/issues{/number}",
                    "pulls_url": "https://api.github.com/repos/mboom/TI2806/pulls{/number}",
                    "milestones_url": "https://api.github.com/repos/mboom/TI2806/milestones{/number}",
                    "notifications_url": "https://api.github.com/repos/mboom/TI2806/notifications{?since,all,participating}",
                    "labels_url": "https://api.github.com/repos/mboom/TI2806/labels{/name}",
                    "releases_url": "https://api.github.com/repos/mboom/TI2806/releases{/id}",
                    "deployments_url": "https://api.github.com/repos/mboom/TI2806/deployments",
                    "created_at": "2016-04-21T07:03:58Z",
                    "updated_at": "2016-04-21T10:00:55Z",
                    "pushed_at": "2016-05-26T08:39:09Z",
                    "git_url": "git://github.com/mboom/TI2806.git",
                    "ssh_url": "git@github.com:mboom/TI2806.git",
                    "clone_url": "https://github.com/mboom/TI2806.git",
                    "svn_url": "https://github.com/mboom/TI2806",
                    "homepage": null,
                    "size": 4370,
                    "stargazers_count": 0,
                    "watchers_count": 0,
                    "language": "JavaScript",
                    "has_issues": true,
                    "has_downloads": true,
                    "has_wiki": true,
                    "has_pages": true,
                    "forks_count": 2,
                    "mirror_url": null,
                    "open_issues_count": 16,
                    "forks": 2,
                    "open_issues": 16,
                    "watchers": 0,
                    "default_branch": "master"
                }
            },
            "_links": {
                "self": {
                    "href": "https://api.github.com/repos/mboom/TI2806/pulls/125"
                },
                "html": {
                    "href": "https://github.com/mboom/TI2806/pull/125"
                },
                "issue": {
                    "href": "https://api.github.com/repos/mboom/TI2806/issues/125"
                },
                "comments": {
                    "href": "https://api.github.com/repos/mboom/TI2806/issues/125/comments"
                },
                "review_comments": {
                    "href": "https://api.github.com/repos/mboom/TI2806/pulls/125/comments"
                },
                "review_comment": {
                    "href": "https://api.github.com/repos/mboom/TI2806/pulls/comments{/number}"
                },
                "commits": {
                    "href": "https://api.github.com/repos/mboom/TI2806/pulls/125/commits"
                },
                "statuses": {
                    "href": "https://api.github.com/repos/mboom/TI2806/statuses/82e5ffd8909929c113c2a3859c8cf93c8c607164"
                }
            },
            "merged": false,
            "mergeable": true,
            "mergeable_state": "unstable",
            "merged_by": null,
            "comments": 3,
            "review_comments": 8,
            "commits": 8,
            "additions": 186,
            "deletions": 151,
            "changed_files": 13
        };
        console.log(this.prt.transform(pullrequest, "GITHUB"));
        assert.equal(JSON.stringify(this.prt.transform(pullrequest, "GITHUB")), JSON.stringify({
            "title": pullrequest.title,
            "author": pullrequest.user.login,
            "created_at": pullrequest.created_at,
            "updated_at": pullrequest.updated_at,
            "description": pullrequest.body,
            "state": pullrequest.state,
            "merged": pullrequest.merged,
            "number": pullrequest.number
        }));
    })
}());