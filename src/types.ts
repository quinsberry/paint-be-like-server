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
