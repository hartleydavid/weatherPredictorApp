import React, { useState } from 'react';
import './App.css';
//Import Calendar and State drop-down menu
import Calendar from 'react-calendar';
import SelectUSState from 'react-select-us-states';


function App() {

  //Todays date
  const todaysDate = new Date();
  //The minimum date that can be selected. Yesterday based on todays date
  const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()-1);
  //The date selected will be todays date by default
  //[variable, function] =useState() :Allows us to assign variables more than once to const value
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [selectedState, setSelectedState] = useState(null);

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

  const handleStateSelection = (selection) => {
    //console.log('this is the State code:' + newValue);
	setSelectedState(selection);
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
        calendarType='US'
        tileClassName={tileClassName}
        onChange = {handleDateSelection}
      />

	<SelectUSState 
	    className="custom-select" // Apply custom class name
		onChange={handleStateSelection}
		value = {selectedState}
	/>

      <h1> You selected: {selectedDate.toDateString()}</h1>
	  <h1> You selected: {selectedState}</h1>
    </div>
  );
}

export default App;
