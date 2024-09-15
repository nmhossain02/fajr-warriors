import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Calendar } from 'lucide-react'

export default function Component() {
  const name = "Ahmad"
  const attendancePercentage = 75

  return (
    <div className="min-h-screen bg-gray-100 p-4 max-w-md mx-auto">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Fajr Warriors</h1>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl mb-2">
          Assalamu Alaikum,<br />
          {name}
        </h2>

        <div className="flex items-center justify-between mb-6">
          <div className="w-24 h-24">
            <CircularProgressbar 
              value={attendancePercentage} 
              text={`${attendancePercentage}%`}
              styles={buildStyles({
                textSize: '22px',
                pathColor: `rgba(62, 152, 199, ${attendancePercentage / 100})`,
                textColor: '#3e98c7',
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div className="text-sm text-gray-600 flex-1 ml-4">
            Attendance<br />past 30 days
          </div>
          <Calendar className="w-8 h-8 text-gray-500" />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            Masjid Al Farooq,<br />Atlanta
          </h3>
        </div>

        <div className="text-sm text-gray-600">
          Fajr azan: 5:15 AM<br />
          Fajr iqama: 5:30 AM
        </div>
      </div>
    </div>
  )
}