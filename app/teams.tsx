import { useState, useEffect } from 'react'
import { Team, Player } from '../types'
import TeamForm from '../components/TeamForm'
import TeamList from '../components/TeamList'

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTeams()
    fetchPlayers()
  }, [])

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams')
      const data = await response.json()
      setTeams(data)
    } catch (error) {
      console.error('Failed to fetch teams:', error)
    }
  }

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players')
      const data = await response.json()
      setPlayers(data)
    } catch (error) {
      console.error('Failed to fetch players:', error)
    }
  }

  const handleAddTeam = async (teamData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamData),
      })

      if (response.ok) {
        fetchTeams()
      } else {
        throw new Error('Failed to add team')
      }
    } catch (error) {
      console.error('Error adding team:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTeam = async (teamId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/teams/${teamId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchTeams()
      } else {
        throw new Error('Failed to delete team')
      }
    } catch (error) {
      console.error('Error deleting team:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Team Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TeamForm 
              onSubmit={handleAddTeam} 
              players={players}
              loading={loading} 
            />
          </div>
          
          <div className="lg:col-span-2">
            <TeamList 
              teams={teams} 
              onDelete={handleDeleteTeam} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}