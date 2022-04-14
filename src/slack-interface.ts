export interface ISlack {
  payload: string
  channelID: string
  threadTS: string
  environment: string
}

export interface IBlocks {
  type: string
  text: any
  accessory?: any
}
