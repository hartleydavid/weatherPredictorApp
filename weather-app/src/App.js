import './App.css';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';


function App() {

  const todaysDate = new Date();
  const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate()-1);

  const tileClassName = ({ date }) => {
    // Check if the date is before minDate
    if (date <= minDate) {
      //return 'before-min-date';
      return 'before-today';
    }
    return null;
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
    />

    </div>
  );
}

export default App;
