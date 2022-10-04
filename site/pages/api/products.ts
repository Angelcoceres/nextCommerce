import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../packages/local/src/data.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    return res.status(200).json(data)
  }
  return res.status(400).json({ error: 'El metodo no existe' })
}

export default handler
