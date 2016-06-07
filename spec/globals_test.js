define(["src/services/GitHubAPI", "src/services/BitbucketAPI", "src/services/OctopeerAPI", , "src/OctopeerHelper",
    "src/svgCreator"], function () {
        define(["src/services/OctopeerService", "src/services/BitbucketService",
        "src/settings", "src/services/OctopeerAPI", "src/globals"], function () {
            describe('Globals file', function () {
                it('contains octopeerHelper', function () {
                    expect(octopeerHelper).toBeDefined();
                    expect(octopeerHelper).not.toBeNull();

                    expect(octopeerService).toBeDefined();
                    expect(octopeerService).not.toBeNull();

                    expect(gitHubService).toBeDefined();
                    expect(gitHubService).not.toBeNull();

                    expect(bitbucketService).toBeDefined();
                    expect(bitbucketService).not.toBeNull();

                    expect(svgCreator).toBeDefined();
                    expect(svgCreator).not.toBeNull();
                });
            });
        });
});
