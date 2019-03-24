# FYP: React App

## Redux Store

``` js
{
  auth: {
    token: String,
    tokenType: String
  },
  installations: {
    status: oneOf('unfetched', 'fetching', 'fetched'),
    error: string,
    data: objectOf({ // installationId
      appId,
      owner,
    })
  },
  reposByInstallation: {
    status: oneOf('unfetched', 'fetching', 'fetched'),
    error: string,
    data: objectOf( // installationId
      arrayOf(String) // repositoryIds
    )
  },
  repositories: objectOf(Object),
  tests: objectOf({ // testId
    benchmarks: objectOf({ // benchmarkId
      benchmarkDefinition: String,
      filepath: String,
      attempts: arrayOf(
        arrayOf({ // runs
          error: String,
          result: Any,
          time: Number
        })
      )
    }),
    commitId: String,
    endTime: Number,
    errors: arrayOf({
      stage: String,
      error: String
    }),
    owner: String,
    queuedAt: Number,
    repositoryId: String,
    startTime: Number,
    workerId: String
  }),
  testsByRepository: {
    status: oneOf('unfetched', 'fetching', 'fetched'),
    error: string,
    data: arrayOf(String) // testIds
  },
  user: {
    status: oneOf('unfetched', 'fetching', 'fetched'),
    error: string,
    data: Object
  }
}
```
