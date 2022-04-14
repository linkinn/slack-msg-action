<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# About

Action send message to slack

# Create a JavaScript Action using TypeScript

Use this template to bootstrap the creation of a TypeScript action.:rocket:

This template includes compilation support, tests, a validation workflow, publishing, and versioning guidance.  

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Code in Main

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ yarn
```

Build the typescript and package it for distribution
```bash
$ npm run all
```

## Change action.yml

The action.yml defines news inputs and output for action.

| Inputs                       |   required    |    default   |                  description                  |
|------------------------------|:-------------:|-------------:|:---------------------------------------------:|
| channel_id                   | true          | CHANGELOG.md | add channel id                                |
| payload                      | false         | null         | add payload send message                      |
| thread_ts                    | false         | null         | add thread id                                 |
| environment                  | true          | Sandbox      | add name environment                          |


## Example

```javascript
jobs:
  slack:
    runs-on: ubuntu-latest
    steps:
      - name: Slack Send Message
        uses: linkinn/slack-action
        with:
          channel_id: 'channelID'
          payload: 'hello world'
          thread_ts: 'threadID' 
        env:
          SLACK_TOKEN: ${{secrets.SLACK_TOKEN}}
```