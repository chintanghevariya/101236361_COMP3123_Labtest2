import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';


export default function App(){
  
  const [data, setData] = useState([]);
  const [city, setCity] = useState('toronto');           
  const apiData = async () =>{

    //const api = '285392d1b17cb586aeb6709f6e7e8166'
    const api = 'dabd43091243ee5e79e0ebb05c32db35'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`
    const req = axios.get(url);
    const res = await req;
    setData({
      desc:res.data.weather[0].description,
      temp: res.data.main.temp,
      city: res.data.name,
      icon: res.data.weather[0].icon,
      feel : res.data.main.feels_like,
    })
  }
  
    const readInput=(event)=>{
        setCity(event.target.value)

    }
    const submit=(event)=>{
        event.preventDefault()

    }
  const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let today = new Date();
  let dayName = days[today.getDay()]
  let mm = monthNames[today.getMonth()]
  let dd = today.getDate()
  let yy = today.getFullYear()

  
  let d =  mm+" "+dd+" ," + yy;

  
  let K = data.temp;
  let C = K - 273.15
  let K1 = data.feel;
  let C1 = K1 - 273.15

  useEffect(()=>{
    apiData()
  },[city])
    return (
        <>
        <div id='heading'>Weather</div>
        <div className='App'>
          <div>
            <h1 className='day'>{dayName}</h1>
            <form className='search' onSubmit={submit}>
            <br/>
            <input type='text' id='city'placeholder='City' onChange={readInput}/>
            </form>
          </div>
          <div>
            <h1>{data.desc}</h1>
            <img src={iconUrl} alt="weather_icon"/>
            <h1 className='temp'>{C.toFixed(2)}<span id='c'>&#8451;</span></h1>
            <h1>{d} {data.city}</h1>
          </div>
            <br/> 
            <div className='footer'>
            -By Chintan Ghevariya
            </div>
        </div>
      </>
    )
  }