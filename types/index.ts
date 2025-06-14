export interface Player {
    id: string
    playerName: string
    age?: number
    username: string
    email: string
    createdAt: Date
  }
  
  export interface Team {
    id: string
    teamName: string
    createdAt: Date
    captain?: {
      name: string
    }
    members: {
      player: Player
      role: string
      isActive: boolean
    }[]
  }
  
  export interface Tournament {
    id: string
    tourName: string
    tourSeason?: string
    startDate: Date
    endDate: Date
    maxParticipants: number
    organizerTeam?: {
      teamName: string
    }
    participants: {
      team: {
        teamName: string
      }
      status: string
    }[]
  }
  
  export interface Match {
    id: string
    round: string
    scheduledAt: Date
    status: string
    team1: {
      teamName: string
    }
    team2: {
      teamName: string
    }
    result?: {
      team1Score: number
      team2Score: number
      winnerTeam?: {
        teamName: string
      }
    }
  }