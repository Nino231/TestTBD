import { useState, useEffect } from 'react'
import { Tournament } from '../types'

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])

  useEffect(() => {
    fetchTournaments()
  }, [])

  const fetchTournaments = async () => {
    try {
      const response = await fetch('/api/tournaments')
      const data = await response.json()
      setTournaments(data)
    } catch (error) {
      console.error('Failed to fetch tournaments:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tournaments</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div key={tournament.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-2">{tournament.tourName}</h3>
              {tournament.tourSeason && (
                <p className="text-gray-600 mb-2">Season: {tournament.tourSeason}</p>
              )}
              <p className="text-sm text-gray-500 mb-2">
                {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Max Participants: {tournament.maxParticipants}
              </p>
              
              {tournament.organizerTeam && (
                <p className="text-sm text-gray-600 mb-4">
                  Organized by: {tournament.organizerTeam.teamName}
                </p>
              )}
              
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Participants ({tournament.participants.length})</h4>
                <div className="space-y-1">
                  {tournament.participants.map((participant, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{participant.team.teamName}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        participant.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        participant.status === 'REGISTERED' ? 'bg-blue-100 text-blue-800' :
                        participant.status === 'ELIMINATED' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {participant.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}