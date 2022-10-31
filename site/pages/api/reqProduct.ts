import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../packages/local/src/data.json'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    return res.status(200).json(data.products)
  }
  if (req.method == 'post') {
    const { nombre, imagen } = req.body
    return res.status(200).json({ nombre: nombre, imagen: imagen })
  }
  return res.status(400).json({ error: 'El metodo no existe' })
}

export default handler

/* app.post('/sendmessage', async (req, res, next) => {
  try {
    const { number, message, media } = req.body // Get the body
    const msg = await client.sendMessage(number + '@c.us', message) // Send the message
    const data = sendMedia(number + '@c.us', media)
    res.send({ msg, data }) // Send the response
    console.log(colored.bright_green('Mensaje enviado desde post'))
  } catch (error) {
    next(error)
  }
}) */
