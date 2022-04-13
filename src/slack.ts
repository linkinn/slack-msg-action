import * as core from '@actions/core'
import { WebClient } from '@slack/web-api'
import {ISlack} from './slack-interface'

export async function slack({payload, channelID, threadTS}: ISlack): Promise<void> {
  core.debug(`Start slack message...`)

  try {
    const slackToken = process.env.SLACK_TOKEN
    const webClient = new WebClient(slackToken)

    if (threadTS) {
      await webClient.chat.postMessage({
        text: payload,
        channel: channelID,
        thread_ts: threadTS
      });

      return
    }
    
    const {message} = await webClient.chat.postMessage({
      text: payload,
      channel: channelID
    });

    const thread_ts = message?.ts

    core.debug(`time: ${new Date().toTimeString()}`)
    core.setOutput('thread_ts', thread_ts)
  } catch(e: any) {
    throw new Error(e)
  }
}
