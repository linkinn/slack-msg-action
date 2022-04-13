import * as core from '@actions/core'
import {slack} from './slack'

async function run(): Promise<void> {
  try {
    const channelID = core.getInput('channel_id')
    const payload = core.getInput('payload')
    const threadTS = core.getInput('thread_ts')

    slack({
      channelID,
      payload,
      threadTS
    })
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
