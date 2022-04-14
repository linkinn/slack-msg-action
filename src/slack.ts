import * as core from '@actions/core'
import {context} from '@actions/github'
import {WebClient} from '@slack/web-api'
import {ISlack} from './slack-interface'

// function githubToken(): string {
//   const token = process.env.GITHUB_TOKEN
//   if (!token)
//     throw ReferenceError('No token defined in the environment variables')
//   return token
// }

export async function slack({
  payload,
  channelID,
  threadTS
}: ISlack): Promise<void> {
  core.debug(`Start slack message...`)
  core.debug(JSON.stringify(context))
  core.debug(context.repo.repo)
  core.debug(context.ref)

  try {
    const slackToken = process.env.SLACK_TOKEN
    const webClient = new WebClient(slackToken)

    if (threadTS) {
      await webClient.chat.postMessage({
        mrkdwn: true,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                payload ||
                `@channel Deploy *{{repo.name}}* \`{{repo.version}}\` em *{{repo.envirenmont}}*`
            }
          }
        ],
        channel: channelID,
        thread_ts: threadTS
      })

      return
    }

    const {message} = await webClient.chat.postMessage({
      mrkdwn: true,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text:
              payload ||
              `@channel Deploy *{{repo.name}}* \`{{repo.version}}\` em *{{repo.envirenmont}}*`
          }
        }
      ],
      channel: channelID
    })

    const thread_ts = message?.ts

    core.debug(`time: ${new Date().toTimeString()}`)
    core.setOutput('thread_ts', thread_ts)
  } catch (e: any) {
    throw new Error(e)
  }
}
