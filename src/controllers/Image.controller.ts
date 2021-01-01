import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { appRoot } from '../app'

class ImageController {
  saveImage = (req: Request, res: Response) => {
    try {
      const data = req.body.image.replace('data:image/png;base64,', '')
      fs.writeFileSync(path.resolve(appRoot, 'files', `${req.query.id}.jpg`), data, 'base64')

      return res.status(200).json({
        code: 200,
        status: 'success',
        data: [],
        message: 'Successfully uploaded',
      })
    } catch (err) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        errors: {},
        message: 'Internal server error',
      })
    }
  }

  getImage = (req: Request, res: Response) => {
    try {
      if (!fs.existsSync(path.resolve(appRoot, 'files', `${req.query.id}.jpg`))) {
        const data = req.body.image.replace('data:image/png;base64,', '')
        fs.writeFileSync(path.resolve(appRoot, 'files', `${req.query.id}.jpg`), data, 'base64')
      }
      const file = fs.readFileSync(path.resolve(appRoot, 'files', `${req.query.id}.jpg`))
      const data = 'data:image/png;base64,' + file.toString('base64')

      return res.status(200).json({
        code: 200,
        status: 'success',
        data,
        message: 'Successfully fetched',
      })
    } catch (err) {
      return res.status(500).json({
        code: 500,
        status: 'error',
        errors: {},
        message: 'Internal server error',
      })
    }
  }
}

export const ImageCtrl = new ImageController()
