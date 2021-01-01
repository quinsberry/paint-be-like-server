import express from 'express'
import cors from 'cors'
export const app = express()
import path from 'path'

import { appWS, broadcastConnection, connectionHandler } from './core/websocket'
import { Connection, Message, WSMethods } from './types'
import { ImageCtrl } from './controllers/Image.controller'

app.use(cors())
app.use(express.json())

export const appRoot = path.resolve(__dirname)

app.post('/image', ImageCtrl.saveImage)
app.post('/image-get', ImageCtrl.getImage)

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
