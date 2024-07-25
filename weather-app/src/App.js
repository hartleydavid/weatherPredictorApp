import React, { useState } from 'react';
import './App.css';
//Import Calendar and State drop-down menu
import Calendar from 'react-calendar';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import getKey from './API_KEY.js';

function App() {

    //Get the API key for google maps API
    const key = getKey();

  //Todays date
  const todaysDate = new Date();
  //Default position (Seattle Washington)
  const defaultPosition  = { lat: 47.62190104905558, lng: -122.33379948020307 };

  //The minimum date that can be selected. Yesterday based on todays date
  const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()-1);
  //The date selected will be todays date by default
  //[variable, function] =useState() :Allows us to assign variables more than once to const value
  const [selectedDate, setSelectedDate] = useState(todaysDate);

  //The coordinates we will use
  const [coordinates, setCoordinates] = useState(defaultPosition);


  //Updates the tile class name for all tiles before today to be blanked and all other dates active
  const tileClassName = ({ date }) => {
    // Check if the date is yesterday or before
    if (date <= minDate) {
      //return 'before-min-date';
      return 'before-today';
    }

    //Date is an available date
    return null;
  };

  //When a date is selected, update the selected date
  const handleDateSelection= (selection) => {
    setSelectedDate(selection);
  };

  //When a area is selected, update the coordinates saved
  const handleCoordinateSelection = (selection) => {
    setCoordinates(selection);
  };

  const mapContainerStyle = {
    width: '500px',
    height: '500px',
    margin: '20px auto'
  };



  return (
    
    <div className="App">
      <header>  Weather Prediction App </header>
      <h2> Please select a valid date. </h2>
      <p> Valid dates are from todays date and on.</p>

      {/*Create calendar that only allows selections of todays date and forward, no past dates*/}
      <Calendar 
        minDate={todaysDate}
        minDetail='Month'
        calendarType='gregory'
        tileClassName={tileClassName}
        onChange = {handleDateSelection}
      />

    <h1> You selected: {selectedDate.toDateString()}</h1>

    {/* Google Map */}
        <LoadScript googleMapsApiKey= {key} >
            <GoogleMap
                onClick={ev => {
                const newCoordinates = { lat: ev.latLng.lat(), lng: ev.latLng.lng() };
                console.log('Map clicked at:', newCoordinates); // Debugging step
                handleCoordinateSelection(newCoordinates);
                //handleCoordinateSelection({ lat: ev.latLng.lat(), lng: ev.latLng.lng() });
                }}
                mapContainerStyle={mapContainerStyle}
                center={coordinates}
                zoom={10}
                
            > 
          </GoogleMap>
        </LoadScript>
        </div>
  );
  
}

export default App;
