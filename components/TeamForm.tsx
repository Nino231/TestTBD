import { useState, useEffect } from 'react'
import { Player } from '../types'

interface TeamFormProps {
  onSubmit: (data: any) => void
  players: Player[]
  loading?: boolean
}

export default function TeamForm({ onSubmit, players, loading }: TeamFormProps) {
  const [formData, setFormData] = useState({
    teamName: '',
    selectedPlayers: [] as string[]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      teamName: formData.teamName,
      playerIds: formData.selectedPlayers
    })
    setFormData({ teamName: '', selectedPlayers: [] })
  }

  const handlePlayerToggle = (playerId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPlayers: prev.selectedPlayers.includes(playerId)
        ? prev.selectedPlayers.filter(id => id !== playerId)
        : [...prev.selectedPlayers, playerId]
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Team</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Team Name
        </label>
        <input
          type="text"
          value={formData.teamName}
          onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Players
        </label>
        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
          {players.map((player) => (
            <div key={player.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={player.id}
                checked={formData.selectedPlayers.includes(player.id)}
                onChange={() => handlePlayerToggle(player.id)}
                className="mr-2"
              />
              <label htmlFor={player.id} className="text-sm">
                {player.playerName} ({player.username})
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Team'}
      </button>
    </form>
  )
}