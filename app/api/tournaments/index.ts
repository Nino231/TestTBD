import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const tournaments = await prisma.tournament.findMany({
        include: {
          organizerTeam: {
            select: { teamName: true }
          },
          participants: {
            include: {
              team: {
                select: { teamName: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(tournaments)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tournaments' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}