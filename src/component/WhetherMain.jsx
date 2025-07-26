import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import SingleInfo from './SingleInfo';
import './WhetherMain.css'; // Import the CSS file

function WhetherMain() {
    const [city, setCity] = useState('dehradun');
    const [whether, setWhether] = useState('');
    const [temp, setTemp] = useState('');
    const [pressure, setPressure] = useState('');
    const [humidity, setHumidity] = useState('');
    const [visibility, setVisibility] = useState('');
    const [wind, setWind] = useState('');
    const [clouds, setClouds] = useState('');
    const [icon, setIcon] = useState('');
    const [location, setLocation] = useState(''); // Add state for location

    const getWhether = () => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=0a56ddc8df544c96bdf44243251101&q=${city}`)
        .then((response) => {
            const data = response.data;
            setWhether(data.current.condition.text); // Corrected path for weather description
            setTemp(data.current.temp_c);
            setPressure(data.current.pressure_mb);
            setHumidity(data.current.humidity);
            setVisibility(data.current.vis_km);
            setWind(data.current.wind_kph);
            setClouds(data.current.cloud || 'N/A'); // Adjusted for cloud data
            setIcon(data.current.condition.icon); // Corrected path for icon
            setLocation(data.location.name); // Set location from API response
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() =>{
        getWhether(); // Fetch weather data on component mount
        setCity("");
    },[])

    return (
        <div className="container">
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Enter City Name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input-field"
                />
                <button 
                    onClick={() => {
                        getWhether();
                        setTimeout(() => {
                            setCity(''); // Clear the input field after a delay
                        }, 1000); // Delay of 500ms
                    }} 
                    className="check-button"
                >
                    Check
                </button>
            </div>
            <h1 className="location-heading">
                Location: <span>{location || city}</span>
            </h1>
            <div className="info-container">
                <SingleInfo text="Whether" info={whether} />
                <SingleInfo text="Temperature" info={`${temp}°C`} />
                <SingleInfo text="Pressure" info={`${pressure} mb`} />
                <SingleInfo text="Humidity" info={`${humidity}%`} />
                <SingleInfo text="Visibility" info={`${visibility} km`} />
                <SingleInfo text="Wind" info={`${wind} kph`} />
                <SingleInfo text="Cloud" info={clouds} />
                <img src={icon}  alt='' className="weather-icon" />
            </div>
        </div>
    );
}

export default WhetherMain;