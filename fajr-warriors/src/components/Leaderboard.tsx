import { useState } from 'react'
import { Trophy, Medal, Star } from 'lucide-react'

type User = {
  id: number
  name: string
  streakDays: number
}

type ShoutoutUser = User & {
  recentStreak: number
}

const dummyUsers: User[] = [
  { id: 1, name: "Ahmad", streakDays: 30 },
  { id: 2, name: "Fatima", streakDays: 28 },
  { id: 3, name: "Mohammed", streakDays: 25 },
  { id: 4, name: "Aisha", streakDays: 22 },
  { id: 5, name: "Omar", streakDays: 20 },
  { id: 6, name: "Zainab", streakDays: 18 },
  { id: 7, name: "Hassan", streakDays: 15 },
  { id: 8, name: "Mariam", streakDays: 12 },
  { id: 9, name: "Ali", streakDays: 10 },
  { id: 10, name: "Khadija", streakDays: 8 },
]

const dummyShoutouts: ShoutoutUser[] = [
  { id: 11, name: "Yusuf", streakDays: 5, recentStreak: 5 },
  { id: 12, name: "Amina", streakDays: 3, recentStreak: 3 },
  { id: 13, name: "Ibrahim", streakDays: 3, recentStreak: 3 },
]

export default function Leaderboard() {
  const [currentUserId] = useState(5) // Assuming Omar is the current user
  const [relativeBoardSize] = useState(3) // Number of users to show above and below current user

  const sortedUsers = [...dummyUsers].sort((a, b) => b.streakDays - a.streakDays)
  const currentUserRank = sortedUsers.findIndex(user => user.id === currentUserId) + 1
  const relativeStart = Math.max(0, currentUserRank - relativeBoardSize - 1)
  const relativeEnd = Math.min(sortedUsers.length, currentUserRank + relativeBoardSize)
  const relativeBoard = sortedUsers.slice(relativeStart, relativeEnd)

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Leaderboard</h2>

      {/* Top 3 Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Top 3 Warriors</h3>
        <div className="flex justify-around">
          {sortedUsers.slice(0, 3).map((user, index) => (
            <div key={user.id} className="flex flex-col items-center">
              {index === 0 && <Trophy className="w-8 h-8 text-yellow-400" />}
              {index === 1 && <Medal className="w-8 h-8 text-gray-400" />}
              {index === 2 && <Medal className="w-8 h-8 text-yellow-600" />}
              <span className="font-semibold">{user.name}</span>
              <span className="text-sm text-gray-600">{user.streakDays} days</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relative Leaderboard */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Ranking</h3>
        {relativeBoard.map((user, index) => (
          <div 
            key={user.id} 
            className={`flex justify-between items-center py-2 ${user.id === currentUserId ? 'bg-blue-100 rounded p-2' : ''}`}
          >
            <span>{relativeStart + index + 1}.</span>
            <span className="flex-grow ml-4">{user.name}</span>
            <span>{user.streakDays} days</span>
          </div>
        ))}
      </div>

      {/* Shoutouts */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          {dummyShoutouts.map((user) => (
            <div key={user.id} className="bg-gray-50 rounded p-3 flex flex-col items-center">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <span className="font-semibold">{user.name}</span>
              <span className="text-sm text-gray-600">{user.recentStreak} day streak!</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}