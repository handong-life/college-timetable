import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TimetablePage } from './pages';
import './styles/App.scss';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/timetable" component={TimetablePage} />
        </Switch>
      </Router>
    </div>
  );
}
