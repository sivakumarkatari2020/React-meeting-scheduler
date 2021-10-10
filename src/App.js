import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom";
import HomePage from './components/HomePage';
import Scheduler from './components/Scheduler';
import Calendar from './components/Calendar'

function App() {
  return (
    <Switch>
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/scheduler">
        <Scheduler />
      </Route>
      <Route exact path="/calendar">
        <Calendar />
      </Route>
    </Switch>
  );
}

export default App;
