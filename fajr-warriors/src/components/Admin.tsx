'use client'

import { useState } from 'react'
import { Calendar, Check } from 'lucide-react'

type Person = {
  id: string
  name: string
  imageUrl: string
}

const dummyPeople: Person[] = [
  { id: '1', name: 'Ahmad', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '2', name: 'Fatima', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '3', name: 'Mohammed', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '4', name: 'Aisha', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '5', name: 'Omar', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '6', name: 'Zainab', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '7', name: 'Hassan', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '8', name: 'Mariam', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '9', name: 'Ali', imageUrl: '/placeholder.svg?height=40&width=40' },
  { id: '10', name: 'Khadija', imageUrl: '/placeholder.svg?height=40&width=40' },
]

export default function AdminCheckin() {
  const [date, setDate] = useState<Date>(new Date())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])

  const filteredPeople = dummyPeople.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (selectedPeople.includes(a.id) && !selectedPeople.includes(b.id)) return -1
    if (!selectedPeople.includes(a.id) && selectedPeople.includes(b.id)) return 1
    return 0
  })

  const togglePersonSelection = (id: string) => {
    setSelectedPeople(prev =>
      prev.includes(id) ? prev.filter(personId => personId !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Fajr Check-in</h2>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <input
            type="date"
            value={date.toISOString().split('T')[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            className="border rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="h-[300px] mb-4 overflow-y-auto">
          {sortedPeople.map(person => (
            <div
              key={person.id}
              className={`flex items-center p-2 cursor-pointer ${
                selectedPeople.includes(person.id) ? 'bg-blue-100' : ''
              }`}
              onClick={() => togglePersonSelection(person.id)}
            >
              <div className="h-10 w-10 mr-3 rounded-full overflow-hidden">
                <img src={person.imageUrl} alt={person.name} className="h-full w-full object-cover" />
              </div>
              <span className="flex-grow">{person.name}</span>
              {selectedPeople.includes(person.id) && (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button 
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => console.log('Checked in:', selectedPeople)}
        >
          Check-in Selected ({selectedPeople.length})
        </button>
      </div>
    </div>
  )
}