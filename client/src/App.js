import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { TimetablePage } from './pages';
import theme from './theme';

export default function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/timetable" component={TimetablePage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
