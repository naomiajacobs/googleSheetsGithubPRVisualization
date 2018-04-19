({
  "data": {
    "organization": {
      "repository": {
        "milestone": {
          "pullRequests": {
            "nodes": [
              {
                "title": "Oldest Child",
                "url": "https://github.com/organization/repo/pull/1",
                "labels": { "nodes": [] },
                "createdAt": "2018-01-08T00:45:21Z",
                "baseRefName": "master",
                "headRefName": "oldest-child",
                "mergeable": "MERGEABLE",
                "commits": {
                  "nodes": [
                    {
                      "commit": {
                        "status": {
                          "state": "SUCCESS"
                        }
                      }
                    }
                  ]
                }
              },
              {
                "title": "Middle Child",
                "url": "https://github.com/organization/repo/pull/2",
                "labels": { "nodes": [] },
                "createdAt": "2018-02-07T19:44:19Z",
                "baseRefName": "i-am-not-here",
                "headRefName": "really-not-here",
                "mergeable": "MERGEABLE",
                "commits": {
                  "nodes": [
                    {
                      "commit": {
                        "status": {
                          "state": "FAILURE"
                        }
                      }
                    }
                  ]
                }
              },
            ]
          }
        }
      }
    }
  }
})
