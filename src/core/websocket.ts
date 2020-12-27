import expressWs from 'express-ws'
import { app, Connection, Message } from '../app'

export const appWS = expressWs(app)
export const aWss = appWS.getWss()

export const connectionHandler = (ws: any, msgObj: Message<Connection>): void => {
  ws.id = msgObj.data.id
  broadcastConnection(ws, msgObj)
}

export const broadcastConnection = (_: any, msgObj: Message<Connection>): void => {
  aWss.clients.forEach((client) => {
    // @ts-ignore
    if (client.id === msgObj.data.id) {
      client.send(JSON.stringify(msgObj))
    }
  })
}
