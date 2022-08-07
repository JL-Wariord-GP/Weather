import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import VideoSunnyWeather from '../video/sunny-weather-01d.mp4'
import VideoCloudDay from '../video/cloudDay-03d.mp4'
import VideoRainyWeather from '../video/rainyWeather-09d.mp4'
import VideoClearNigth from '../video/clearNight-01n.mp4'
import VideoOverClouds from '../video/overcastClouds-03n.mp4'
import VideoRainyNight from '../video/nightRain-09n.mp4'
import VideoDefault from '../video/default.mp4'
import ReactPlayer from 'react-player'


const Weather = ({ coordinates }) => {
    const [isLoading, setIsLoading] = useState(true) 
    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [infoTemp, setInfoTemp] = useState(true)
    const iconImg = `${weather?.weather[0].icon}`
    const imgURL = `https://openweathermap.org/img/wn/${iconImg}@2x.png`

    const [icon, setIcon] = useState(null)

    //*!================== MATRIX AND RECEPTION OF API =====================*/
    useEffect(() => {
        if (coordinates) {
            const API_KEY = '0b235425cf74e4e2d458b59309fd9e62'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates?.lat}&lon=${coordinates?.lon}&appid=${API_KEY}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    setIsLoading(false)
                    const dataTemp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} °F`
                    }
                    setTemperature(dataTemp)
                })
                .catch(error => console.log(error))
        }
    }, [coordinates])

    //*!================== BTN - TEMPERATURE =====================*/
    const getBtn = () => setInfoTemp(!infoTemp)

    //*!================== FUNCTION WITH SWITCH =====================*/
    /* function getCurrentVideo(icon){
        let currentVideo = VideoOver;
        switch (icon) {
            case icon = '01d':
                currentVideo = VideoOver
        }
        return currentVideo
    } */
 
    //*!================== FUNCTION WITH OBJECT =====================*/
    function getCurrentVideo2(icon) {
        let videos = {
            //*!================== Day =====================*/
            '01d': VideoSunnyWeather,
            '02d': VideoSunnyWeather,
            '03d': VideoCloudDay,
            '04d': VideoRainyWeather,
            '09d': VideoRainyWeather,

            //*!================== Nigth =====================*/

            '01n': VideoClearNigth,
            '02n': VideoClearNigth,
            '03n': VideoOverClouds,
            '04n': VideoRainyNight,
            '09n': VideoRainyNight,
            'default': VideoDefault
        }
        //*!================== Day =====================*/
        if (iconImg == '01d') {
            return videos['01d']
        }
        if (iconImg == '02d') {
            return videos['02d']
        }
        if (iconImg == '03d') {
            return videos['03d']
        }
        if (iconImg == '04d') {
            return videos['04d']
        }
        if (iconImg == '09d') {
            return videos['09d']
        }
        //*!================== Nigth =====================*/
        if (iconImg == '01n') {
            return videos['01n']
        }
        if (iconImg == '02n') {
            return videos['02n']
        }
        if (iconImg == '03n') {
            return videos['03n']
        }
        if (iconImg == '04n') {
            return videos['04n']
        }
        if (iconImg == '09n') {
            return videos['09n']
        }
        return videos[icon] || videos["default"]
    }

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
                url={getCurrentVideo2(icon)}
                muted={true}
                width="100%"
                height="100%"

            />

            <div className="App" >
                {
                    //! HEADER
                }
            
                <div className='box-h1-h2-sup' >
                    <h1>Weather</h1>
                    <h2>{weather?.name}, {weather?.sys.country}</h2>
                </div>

                {
                    //! BODY BRANCH
                }

                <div className='box-img-ul-li' >
                    <img src={imgURL} />
                    <ul>
                        <h2>&#34;{weather?.weather[0].description}&#34;</h2>
                        <li><i className="fa-solid fa-wind iconWeather"></i><span> Wind speed:</span> {weather?.wind.speed} m/s </li>
                        <li><i className="fa-solid fa-cloud iconWeather"></i><span> Clouds:</span> {weather?.clouds.all} %</li>
                        <li><i className="fa-solid fa-temperature-three-quarters iconWeather"></i><span> Pressure:</span> {weather?.main.pressure} hPa</li>
                    </ul>
                </div>

                {
                    //! CALCULATING TEMPERATURE
                }

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