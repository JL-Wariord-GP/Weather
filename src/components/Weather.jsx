import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import VideoSunny from '../video/sunny-weather-02d.mp4'
import VideoOver from '../video/overcastClouds-03n.mp4'
import ReactPlayer from 'react-player'


const Weather = ({ coordinates }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [cambioVideo, setCambioVideo] = useState()
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [infoTemp, setInfoTemp] = useState(true)
    const iconImg = `${weather?.weather[0].icon}`
    const imgURL = `https://openweathermap.org/img/wn/${iconImg}@2x.png`


    useEffect(() => {
        if (coordinates) {
            const API_KEY = '0b235425cf74e4e2d458b59309fd9e62'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${API_KEY}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    setIsLoading(false)
                    //! LA FUNCION PARA CAMBIAR EL VIDEO LA ESTABA IMPLEMENTADO ACA DEBAJO
                    setCambioVideo(() => {
                        if (`${weather?.weather[0].icon}` == '02n') {
                            console.log('Esto es verdadero');
                        }
                    })
                    const dataTemp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
                    }
                    setTemperature(dataTemp)
                })
                .catch(error => console.log(error))
        }
    }, [coordinates])

    const getBtn = () => setInfoTemp(!infoTemp)

console.log(cambioVideo);

    return (
        <div className='video'>

            {
                isLoading ?
                    <Loader />
                    :
                    <weather weather={weather} />
            }


            <ReactPlayer
                playing={true}
                loop={true}
                url={VideoSunny}
                muted={true}
                width="100%"
                height="100%"

            />



            <div className="App" >

                <div className='box-h1-h2-sup' >
                    <h1>Weather</h1>
                    <h2>{weather?.name}, {weather?.sys.country}</h2>
                </div>

                <div className='box-img-ul-li' >
                    <img src={imgURL} />
                    <ul>
                        <h2>&#34;{weather?.weather[0].description}&#34;</h2>
                        <li><span>Wind speed:</span> {weather?.wind.speed} m/s </li>
                        <li><span>Clouds:</span> {weather?.clouds.all} %</li>
                        <li><span>Pressure:</span> {weather?.main.pressure} hPa</li>
                    </ul>
                </div>

                <div className='sytle-h2-btn'>
                    <h2>{infoTemp ? temperature?.celsius : temperature?.fahrenheit}</h2>
                    <div className='contenedor_btn'>
                        <div className='btn' onClick={getBtn} ><a>{infoTemp ? 'Change to °F' : 'Change to °C'}</a></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Weather