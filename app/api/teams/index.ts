import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const teams = await prisma.team.findMany({
        include: {
          captain: {
            select: { name: true }
          },
          members: {
            where: { isActive: true },
            include: {
              player: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
      res.status(200).json(teams)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch teams' })
    }
  } else if (req.method === 'POST') {
    try {
      const { teamName, captainId, playerIds } = req.body
      
      const team = await prisma.team.create({
        data: {
          teamName,
          captainId: captainId || null
        }
      })

      // Add team members if provided
      if (playerIds && playerIds.length > 0) {
        const teamMembers = playerIds.map((playerId: string) => ({
          teamId: team.id,
          playerId,
          role: 'MEMBER'
        }))
        
        await prisma.teamMember.createMany({
          data: teamMembers
        })
      }
      
      res.status(201).json(team)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create team' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}