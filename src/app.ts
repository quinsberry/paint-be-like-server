import express from 'express'
export const app = express()

import { appWS, broadcastConnection, connectionHandler } from './core/websocket'

export enum WSMethods {
  connection = 'connection',
  draw = 'draw',
}

export interface Message<D> {
  method: WSMethods
  data: D
}

export interface Connection {
  id: string
  username: string
}

appWS.app.ws('/', (ws: any, _: any) => {
  ws.on('message', (msg: string) => {
    const msgObj: Message<Connection> = JSON.parse(msg)
    switch (msgObj.method) {
      case WSMethods.connection:
        connectionHandler(ws, msgObj)
        break
      case WSMethods.draw:
        broadcastConnection(ws, msgObj)
        break
    }
  })
})

const PORT = process.env.PORT || 5000
async function start() {
  try {
    app.listen(PORT, (): void => {
      console.log(`Server running at port: ${PORT}`)
    })
  } catch (e) {
    console.log(`Starting error: ${e.message}`)
    process.exit(1)
  }
}

start()
