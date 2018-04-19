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
                "labels": {
                  "nodes": [{ "name": "Reviewable" }]
                },
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
                "labels": {
                  "nodes": [{ "name": "WIP" }]
                },
                "createdAt": "2018-02-07T19:44:19Z",
                "baseRefName": "master",
                "headRefName": "middle-child",
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
              {
                "title": "Youngest child",
                "url": "https://github.com/organization/repo/pull/3",
                "labels": {
                  "nodes": [
                    { "name": "Requires QA" },
                    { "name": "Reviewable" }
                  ]
                },
                "createdAt": "2018-03-06T22:55:03Z",
                "baseRefName": "master",
                "headRefName": "youngest-child",
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
                "title": "Middle Child - First GrandChild",
                "url": "https://github.com/organization/repo/pull/4",
                "labels": {
                  "nodes": [
                    {
                      "name": "WIP"
                    }
                  ]
                },
                "createdAt": "2018-03-06T01:09:30Z",
                "baseRefName": "middle-child",
                "headRefName": "first-grandchild",
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
              {
                "title": "Middle Child - Second Grandchild",
                "url": "https://github.com/organization/repo/pull/5",
                "labels": {
                  "nodes": [
                    { "name": "Requires QA" },
                    { "name": "Reviewable" }
                  ]
                },
                "createdAt": "2018-03-01T23:29:04Z",
                "baseRefName": "middle-child",
                "headRefName": "second-grandchild",
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
                "title": "Middle Child - Third Grandchild",
                "url": "https://github.com/organization/repo/pull/6",
                "labels": {
                  "nodes": [
                    { "name": "Requires QA" },
                    { "name": "Reviewable" }
                  ]
                },
                "createdAt": "2018-03-01T00:59:04Z",
                "baseRefName": "middle-child",
                "headRefName": "third-grandchild",
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
              {
                "title": "Youngest Child - Fourth Grandchild",
                "url": "https://github.com/organization/repo/pull/7",
                "labels": {
                  "nodes": [
                    { "name": "Blocked" },
                    { "name": "WIP" }
                  ]
                },
                "createdAt": "2018-02-26T19:31:40Z",
                "baseRefName": "youngest-child",
                "headRefName": "fourth-grandchild",
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
            ]
          }
        }
      }
    }
  }
})
