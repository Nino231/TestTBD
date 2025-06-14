import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const players = await db.player.findMany({
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(players)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch players' })
    }
  } else if (req.method === 'POST') {
    try {
      const { playerName, age, username, email, userId } = req.body
      
      const player = await db.player.create({
        data: {
          playerName,
          age: age ? parseInt(age) : null,
          username,
          email,
          userId
        }
      })
      
      res.status(201).json(player)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create player' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}