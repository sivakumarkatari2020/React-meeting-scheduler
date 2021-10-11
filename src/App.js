import React from 'react';
import './App.css';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from './components/HomePage';
import Scheduler from './components/Scheduler';
import Calendar from './components/Calendar'
import Suggestions from './components/Suggestions';

function App() {

  const [values,setValues] = React.useState({
    employees: [],
    fromDate: null,
    toDate: null,
    officeHoursStart: null,
    officeHoursEnd: null,
    MeetingLength: 30,
  });

  return (
    <Switch>
      <Route exact path="/">
          <Redirect exact from="/" to="/home" />
        </Route>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/scheduler">
        <Scheduler values={values} setValues={setValues}/>
      </Route>
      <Route exact path="/suggestions">
        <Suggestions values={values}/>
      </Route>
      <Route exact path="/calendar">
        <Calendar />
      </Route>
    </Switch>
  );
}

export default App;
