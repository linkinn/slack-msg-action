import * as core from '@actions/core'
import {context} from '@actions/github'
import {WebClient} from '@slack/web-api'
import {ISlack} from './slack-interface'

export async function slack({
  payload,
  channelID,
  threadTS,
  environment
}: ISlack): Promise<void> {
  core.debug(`Start slack message...`)

  try {
    const slackToken = process.env.SLACK_TOKEN
    const webClient = new WebClient(slackToken)
    const tag = context.ref.includes('refs/tags/')
      ? context.ref.slice(10)
      : context.ref.slice(11)
    const repoName = context.repo.repo
    const workflow = `${context.payload.repository?.html_url}/actions/runs/${context.runId}`

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
                `@channel Deploy *${repoName}* \`${tag}\` em *${environment}*\n<${workflow}|clique aqui para ver a action>`
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
              `@channel Deploy *${repoName}* \`${tag}\` em *${environment}*\n<${workflow}|clique aqui para ver a action>`
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
