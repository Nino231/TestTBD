import { useState, useEffect } from 'react'
import { Player } from '../types'
import PlayerForm from '../components/PlayerForm'
import PlayerList from '../components/PlayerList'

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players')
      const data = await response.json()
      setPlayers(data)
    } catch (error) {
      console.error('Failed to fetch players:', error)
    }
  }

  const handleAddPlayer = async (playerData: any) => {
    setLoading(true)
    try {
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...playerData,
          userId: 'temp-user-id' // You'll need to implement proper user authentication
        }),
      })

      if (response.ok) {
        fetchPlayers()
      } else {
        throw new Error('Failed to add player')
      }
    } catch (error) {
      console.error('Error adding player:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlayer = async (playerId: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/players/${playerId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPlayers()
      } else {
        throw new Error('Failed to delete player')
      }
    } catch (error) {
      console.error('Error deleting player:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Player Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <PlayerForm onSubmit={handleAddPlayer} loading={loading} />
          </div>
          
          <div className="lg:col-span-2">
            <PlayerList 
              players={players} 
              onDelete={handleDeletePlayer} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}