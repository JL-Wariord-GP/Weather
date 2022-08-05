import { useState, useEffect } from 'react'
import './App.css'
import Weather from './components/Weather'
import Video from './components/Video'

function App() {
  const [coordinates, setCoordinates] = useState()

  useEffect(() => {
      const success = pos => {
        
        const ltd = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoordinates(ltd)
    }
  navigator.geolocation.getCurrentPosition(success)
  }, [])


  return (
    <div >
    <Weather 
      coordinates={coordinates}
      />
    </div>
     
  )
}

export default App
