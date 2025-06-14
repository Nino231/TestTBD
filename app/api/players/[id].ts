import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'DELETE') {
    try {
      await prisma.player.delete({
        where: { id: id as string }
      })
      res.status(200).json({ message: 'Player deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete player' })
    }
  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}