import React, { useState } from 'react'
import "./output.css"
import clear from "../src/assets/clear.png"
import cloud from "../src/assets/cloud.png"
import drizzle from "../src/assets/drizzle.png"
import humidity from "../src/assets/humidity.png"
import rain from "../src/assets/rain.png"
import search from "../src/assets/search.png"
import snow from "../src/assets/snow.png"
import wind from "../src/assets/wind.png"


function Weather() {
    const [data,setData] = useState(null)
    const[icons,setIcons] = useState(clear)
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "1.3d": snow,
        "13n": snow,
    }
    
    
    async function search(){
        const cityName = document.getElementById("search").value
        document.getElementById("search").value=""

        
        try{
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${import.meta.env.VITE_API_KEY}`
            const response = await fetch(weatherURL)
            const weatherData =await response.json()
            const icon = await allIcons[weatherData.weather[0].icon] ||clear
            setData(weatherData)
            setIcons(icon)
            
        }
        catch(error){
            console.log(error)

        }
        
        
    }
    
    
    
  return (
    <div className='h-full w-full flex justify-center items-center bg-transparent ' id="container" >
        
        <div className=' w-[500px] text-black flex justify-center items-center flex-col bg-gradient-to-r from-violet-600 to-indigo-600 
        mt-[50px] p-11 pt-3  rounded-2xl border-2 border-black  sm:w-0' >
            <div  className='mt-2'>
                <input type='text' placeholder='Enter a Location' className='p-2 rounded-md mr-2' id='search'></input>
                <button className='bg-slate-900 p-2 text-md text-white rounded-xl pl-3 pr-3' onClick={search}>search</button>
            </div>

          {data ? 
          <div className='flex justify-center items-center flex-col'>
            <div id="weatherIcon">
                <img src={icons} alt=""/>
            </div>
            <div id="temp">
                <p className='text-5xl text-white font-semibold'>{(data.main.temp-273).toFixed(1)}°C</p>
            </div>
            <div id="location">
                <p className='text-3xl font-medium text-white mt-3'>{data.name}</p>

            </div>
            <div id="details" className='flex flex-row justify-center items-stretch mt-10 text-white '>
                <div id="humidity" className='mr-[70px] flex justify-center items-center'>
                    <img src={humidity} alt="" className='w-[30px] h-[30] mr-4' />
                    <div className='flex flex-col'>
                        
                        <p className='text-2xl'>{data.main.humidity}</p>
                        <p>Humidity</p>
                    </div>
                    

                </div>
                <div id="windspeed" className='flex flex-row '>
                    <img src={wind} alt="" className='w-[35px] h-[35px] mr-4' />
                    <div className='flex flex-col'>
                        <p className='text-2xl'>{data.wind.speed}Km/h</p>
                        <p>Wind Speed</p>
                    </div>
                    

                </div>
            </div>

          </div> 
          :<p className='text-white mt-10 text-2xl'>No data Found</p>}

            
        
        </div>
    </div>
    
  )
}

export default Weather