import expressWs from 'express-ws'
import { app } from '../app'

export const appWS = expressWs(app)
export const aWss = appWS.getWss()

export const connectionHandler = (ws: any, msgObj: any) => {
  ws.id = msgObj.id
  broadcastConnection(ws, msgObj)
}

export const broadcastConnection = (_: any, msgObj: any) => {
  aWss.clients.forEach((client) => {
    // @ts-ignore
    if (client.id === msgObj.id) {
      client.send(`Client ${msgObj.id} connected`)
    }
  })
}
