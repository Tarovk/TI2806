define(['src/pullrequestTransformer'], function (prt) {
    describe('A PullRequestTransformer object', function () {

        it('transforms a Github pull request', function () {
            var prt = new PullRequestTransformer();
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
            var transformed = prt.transform(pullrequest, "GITHUB");
            
            expect(transformed.title).toEqual(pullrequest.title);
            expect(transformed.author).toEqual(pullrequest.user.login);
            expect(transformed.created_at).toEqual(pullrequest.created_at);
            expect(transformed.updated_at).toEqual(pullrequest.updated_at);
            expect(transformed.description).toEqual(pullrequest.body);
            expect(transformed.state).toEqual(pullrequest.state);
            expect(transformed.merged).toEqual(pullrequest.merged);
            expect(transformed.number).toEqual(pullrequest.number);
        });


        it('transforms a Github pull request', function () {
            var prt = new PullRequestTransformer();
            var pullrequest = {
                "merge_commit": null,
                "description": "* Draft version of database connection for mouse positioning\r\n\r\n* Added function which can insert a new session in the database",
                "links": {
                    "decline": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/decline"
                    }, 
                    "commits": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/commits"
                    },
                    "self": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4"
                    }, 
                    "comments": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/comments"
                    }, 
                    "merge": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/merge"
                    }, 
                    "html": {
                        "href": "https://bitbucket.org/CasBs/ooc-octopeer/pull-requests/4"
                    }, 
                    "activity": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/activity"
                    }, 
                    "diff": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/diff"}, "approve": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/approve"}}, "title": "Dbconnection", "close_source_branch": false, "reviewers": [{"username": "8uurg", "display_name": "Arthur Guijt", "type": "user", "uuid": "{dbcfaadd-e373-473b-b4f5-9e156944d53e}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/8uurg"}, "html": {"href": "https://bitbucket.org/8uurg/"}, "avatar": {"href": "https://bitbucket.org/account/8uurg/avatar/32/"}}}, {"username": "tarovk", "display_name": "Thomas Overklift", "type": "user", "uuid": "{9e1b440d-bfa5-4878-8153-d3d126a64c86}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/tarovk"}, "html": {"href": "https://bitbucket.org/tarovk/"}, "avatar": {"href": "https://bitbucket.org/account/tarovk/avatar/32/"}}}, {"username": "larsstegman", "display_name": "Lars Stegman", "type": "user", "uuid": "{022e8dc5-217e-4f72-8b64-452d06616afb}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/larsstegman"}, "html": {"href": "https://bitbucket.org/larsstegman/"}, "avatar": {"href": "https://bitbucket.org/account/larsstegman/avatar/32/"}}}], "destination": {"commit": {"hash": "852bbd2e73d2", "links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/commit/852bbd2e73d2"}}}, "repository": {"links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer"}, "html": {"href": "https://bitbucket.org/CasBs/ooc-octopeer"}, "avatar": {"href": "https://bitbucket.org/CasBs/ooc-octopeer/avatar/32/"}}, "type": "repository", "name": "OOC-OctoPeer", "full_name": "CasBs/ooc-octopeer", "uuid": "{9847dce6-a19c-442b-a6b6-e40f29318fa5}"}, "branch": {"name": "master"}}, "state": "DECLINED", "closed_by": {"username": "CasBs", "display_name": "CasBs", "type": "user", "uuid": "{cce0b5ab-13a9-4cad-8ff4-4b83242324e2}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/CasBs"}, "html": {"href": "https://bitbucket.org/CasBs/"}, "avatar": {"href": "https://bitbucket.org/account/CasBs/avatar/32/"}}}, "source": {"commit": {"hash": "e25f7176df8d", "links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/commit/e25f7176df8d"}}}, "repository": {"links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer"}, "html": {"href": "https://bitbucket.org/CasBs/ooc-octopeer"}, "avatar": {"href": "https://bitbucket.org/CasBs/ooc-octopeer/avatar/32/"}}, "type": "repository", "name": "OOC-OctoPeer", "full_name": "CasBs/ooc-octopeer", "uuid": "{9847dce6-a19c-442b-a6b6-e40f29318fa5}"}, "branch": {"name": "DBConnection"}}, "comment_count": 0, "author": {"username": "CasBs", "display_name": "CasBs", "type": "user", "uuid": "{cce0b5ab-13a9-4cad-8ff4-4b83242324e2}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/CasBs"}, "html": {"href": "https://bitbucket.org/CasBs/"}, "avatar": {"href": "https://bitbucket.org/account/CasBs/avatar/32/"}}}, "created_on": "2016-04-25T09:38:31.691665+00:00", "participants": [{"role": "REVIEWER", "type": "participant", "user": {"username": "larsstegman", "display_name": "Lars Stegman", "type": "user", "uuid": "{022e8dc5-217e-4f72-8b64-452d06616afb}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/larsstegman"}, "html": {"href": "https://bitbucket.org/larsstegman/"}, "avatar": {"href": "https://bitbucket.org/account/larsstegman/avatar/32/"}}}, "approved": false}, {"role": "REVIEWER", "type": "participant", "user": {"username": "tarovk", "display_name": "Thomas Overklift", "type": "user", "uuid": "{9e1b440d-bfa5-4878-8153-d3d126a64c86}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/tarovk"}, "html": {"href": "https://bitbucket.org/tarovk/"}, "avatar": {"href": "https://bitbucket.org/account/tarovk/avatar/32/"}}}, "approved": false}, {"role": "REVIEWER", "type": "participant", "user": {"username": "8uurg", "display_name": "Arthur Guijt", "type": "user", "uuid": "{dbcfaadd-e373-473b-b4f5-9e156944d53e}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/8uurg"}, "html": {"href": "https://bitbucket.org/8uurg/"}, "avatar": {"href": "https://bitbucket.org/account/8uurg/avatar/32/"}}}, "approved": false}], "reason": "", "updated_on": "2016-04-25T09:38:46.562201+00:00", "type": "pullrequest", "id": 4, "task_count": 0}
            var transformed = prt.transform(pullrequest, "BITBUCKET");

            expect(transformed.url).toEqual(pullrequest.links.self.href);
            expect(transformed.title).toEqual(pullrequest.title);
            expect(transformed.author).toEqual(pullrequest.author.username);
            expect(transformed.created_at).toEqual(pullrequest.created_on);
            expect(transformed.updated_at).toEqual(pullrequest.updated_on);
            expect(transformed.description).toEqual(pullrequest.description);
            expect(transformed.state).toEqual(pullrequest.state);
            expect(transformed.merged).toEqual((pullrequest.merge_commit !== null));
            expect(transformed.number).toEqual(pullrequest.id);
        });


        it('does not know about other platforms', function () {
            var prt = new PullRequestTransformer();
            var pullrequest = {
                "merge_commit": null,
                "description": "* Draft version of database connection for mouse positioning\r\n\r\n* Added function which can insert a new session in the database",
                "links": {
                    "decline": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/decline"
                    }, 
                    "commits": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/commits"
                    },
                    "self": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4"
                    }, 
                    "comments": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/comments"
                    }, 
                    "merge": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/merge"
                    }, 
                    "html": {
                        "href": "https://bitbucket.org/CasBs/ooc-octopeer/pull-requests/4"
                    }, 
                    "activity": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/activity"
                    }, 
                    "diff": {
                        "href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/diff"}, "approve": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/pullrequests/4/approve"}}, "title": "Dbconnection", "close_source_branch": false, "reviewers": [{"username": "8uurg", "display_name": "Arthur Guijt", "type": "user", "uuid": "{dbcfaadd-e373-473b-b4f5-9e156944d53e}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/8uurg"}, "html": {"href": "https://bitbucket.org/8uurg/"}, "avatar": {"href": "https://bitbucket.org/account/8uurg/avatar/32/"}}}, {"username": "tarovk", "display_name": "Thomas Overklift", "type": "user", "uuid": "{9e1b440d-bfa5-4878-8153-d3d126a64c86}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/tarovk"}, "html": {"href": "https://bitbucket.org/tarovk/"}, "avatar": {"href": "https://bitbucket.org/account/tarovk/avatar/32/"}}}, {"username": "larsstegman", "display_name": "Lars Stegman", "type": "user", "uuid": "{022e8dc5-217e-4f72-8b64-452d06616afb}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/larsstegman"}, "html": {"href": "https://bitbucket.org/larsstegman/"}, "avatar": {"href": "https://bitbucket.org/account/larsstegman/avatar/32/"}}}], "destination": {"commit": {"hash": "852bbd2e73d2", "links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/commit/852bbd2e73d2"}}}, "repository": {"links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer"}, "html": {"href": "https://bitbucket.org/CasBs/ooc-octopeer"}, "avatar": {"href": "https://bitbucket.org/CasBs/ooc-octopeer/avatar/32/"}}, "type": "repository", "name": "OOC-OctoPeer", "full_name": "CasBs/ooc-octopeer", "uuid": "{9847dce6-a19c-442b-a6b6-e40f29318fa5}"}, "branch": {"name": "master"}}, "state": "DECLINED", "closed_by": {"username": "CasBs", "display_name": "CasBs", "type": "user", "uuid": "{cce0b5ab-13a9-4cad-8ff4-4b83242324e2}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/CasBs"}, "html": {"href": "https://bitbucket.org/CasBs/"}, "avatar": {"href": "https://bitbucket.org/account/CasBs/avatar/32/"}}}, "source": {"commit": {"hash": "e25f7176df8d", "links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer/commit/e25f7176df8d"}}}, "repository": {"links": {"self": {"href": "https://api.bitbucket.org/2.0/repositories/CasBs/ooc-octopeer"}, "html": {"href": "https://bitbucket.org/CasBs/ooc-octopeer"}, "avatar": {"href": "https://bitbucket.org/CasBs/ooc-octopeer/avatar/32/"}}, "type": "repository", "name": "OOC-OctoPeer", "full_name": "CasBs/ooc-octopeer", "uuid": "{9847dce6-a19c-442b-a6b6-e40f29318fa5}"}, "branch": {"name": "DBConnection"}}, "comment_count": 0, "author": {"username": "CasBs", "display_name": "CasBs", "type": "user", "uuid": "{cce0b5ab-13a9-4cad-8ff4-4b83242324e2}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/CasBs"}, "html": {"href": "https://bitbucket.org/CasBs/"}, "avatar": {"href": "https://bitbucket.org/account/CasBs/avatar/32/"}}}, "created_on": "2016-04-25T09:38:31.691665+00:00", "participants": [{"role": "REVIEWER", "type": "participant", "user": {"username": "larsstegman", "display_name": "Lars Stegman", "type": "user", "uuid": "{022e8dc5-217e-4f72-8b64-452d06616afb}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/larsstegman"}, "html": {"href": "https://bitbucket.org/larsstegman/"}, "avatar": {"href": "https://bitbucket.org/account/larsstegman/avatar/32/"}}}, "approved": false}, {"role": "REVIEWER", "type": "participant", "user": {"username": "tarovk", "display_name": "Thomas Overklift", "type": "user", "uuid": "{9e1b440d-bfa5-4878-8153-d3d126a64c86}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/tarovk"}, "html": {"href": "https://bitbucket.org/tarovk/"}, "avatar": {"href": "https://bitbucket.org/account/tarovk/avatar/32/"}}}, "approved": false}, {"role": "REVIEWER", "type": "participant", "user": {"username": "8uurg", "display_name": "Arthur Guijt", "type": "user", "uuid": "{dbcfaadd-e373-473b-b4f5-9e156944d53e}", "links": {"self": {"href": "https://api.bitbucket.org/2.0/users/8uurg"}, "html": {"href": "https://bitbucket.org/8uurg/"}, "avatar": {"href": "https://bitbucket.org/account/8uurg/avatar/32/"}}}, "approved": false}], "reason": "", "updated_on": "2016-04-25T09:38:46.562201+00:00", "type": "pullrequest", "id": 4, "task_count": 0}
            var transformed = prt.transform(pullrequest, "ABACADABRA");
            expect(transformed).not.toBeDefined();
        });



        it('only takes the necessary files from GitHub', function () {
            var prt = new PullRequestTransformer();
            var gitHubFiles = [
              {
                "sha": "bbcd538c8e72b8c175046e27cc8f907076331401",
                "filename": "file1.txt",
                "status": "added",
                "additions": 103,
                "deletions": 21,
                "changes": 124,
                "blob_url": "https://github.com/octocat/Hello-World/blob/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
                "raw_url": "https://github.com/octocat/Hello-World/raw/6dcb09b5b57875f334f61aebed695e2e4193db5e/file1.txt",
                "contents_url": "https://api.github.com/repos/octocat/Hello-World/contents/file1.txt?ref=6dcb09b5b57875f334f61aebed695e2e4193db5e",
                "patch": "@@ -132,7 +132,7 @@ module Test @@ -1000,7 +1000,7 @@ module Test"
              }
            ];

            var transformed = prt.transformGitHubFiles(gitHubFiles);
            expect(transformed[0].filename).toEqual("file1.txt");
            expect(transformed[0].additions).toEqual(103);
            expect(transformed[0].deletions).toEqual(21);
            expect(transformed[0].status).toEqual("added");

            expect(transformed[0].patch).not.toBeDefined();
            expect(transformed[0].contents_url).not.toBeDefined();
        });
    });
});