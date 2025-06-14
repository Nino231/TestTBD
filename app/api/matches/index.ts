import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const matches = await prisma.match.findMany({
        include: {
          team1: {
            select: { teamName: true }
          },
          team2: {
            select: { teamName: true }
          },
          result: {
            include: {
              winnerTeam: {
                select: { teamName: true }
              }
            }
          },
          tournament: {
            select: { tourName: true }
          }
        },
        orderBy: { scheduledAt: 'desc' }
      })
      res.status(200).json(matches)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch matches' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}