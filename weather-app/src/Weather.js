import weatherKey from './WEATHER_API_KEY.js';
import React, { useState, useEffect } from 'react';


function Weather(props){
    //Format and retreive the data for the API url
    const coordinates = `${props.lat},${props.lng}`;
    const date =  `${props.selectedDate.getFullYear()}-${props.selectedDate.getMonth() + 1}-${props.selectedDate.getDate()}`;
    const key = weatherKey();


    //API url
    let url = "";
    //Find the difference in days between today and the selected date
    const differenceInDays = (Math.abs(props.today - props.selectedDate)) / (1000 * 3600 * 24);

    //If the difference is greater than 14 days
    if (differenceInDays > 14){
        //Call the future API url (14-300 day)
        url = `http://api.weatherapi.com/v1/future.json?key=${key}&q=${coordinates}&dt=${date}`;
    //If the difference is > 300, print error for now
    }else if (differenceInDays > 300){
        console.error("Day selection limit met or passed. Please select an earlier date.");
    //Otherwise, call the current API url, for today < 14 days 
    }else{
        url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${coordinates}&dt=${date}`;
    }

    //The JSON response data, loading state, and error constants
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //UseEffec() to call and retain information about the API call to WeatherAPI
    useEffect(() => {
        if (url) {
          setIsLoading(true);
          fetch(url)
            .then((response) => response.json())
            .then((json) => {
              setData(json);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setError(error);
              setIsLoading(false);
            });
        }
      }, [url]);
    
    //When we are loading show loading
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    //When there is an error, display error
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    //If there is no data returned by the API, display message
    if (!data) {
        return <div>No data available</div>;
    }

    //Display data according to the API url that was used
        return (
            <div name="Weather">
                {/*Display Weather Data*/}
                <h1> { data.location.name }, { data.location.region } </h1>
                <h1> Min: { data.forecast.forecastday[0].day.mintemp_f} </h1>
                <h1> Max: { data.forecast.forecastday[0].day.maxtemp_f} </h1>
                <h1> Avg: { data.forecast.forecastday[0].day.avgtemp_f} </h1>
                <h1> Text: { data.forecast.forecastday[0].day.condition.text} </h1>
                <img src={data.forecast.forecastday[0].day.condition.icon} alt={data.forecast.forecastday[0].day.condition.text} />                
            </div>
        );
}

export default Weather;