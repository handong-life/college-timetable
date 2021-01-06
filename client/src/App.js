import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from '@material-ui/core/styles';
import { HomePage, TimetablePage, NotFoundPage } from './pages';
import theme from './theme';
import { SERVERURL } from './commons/constants';
import axios from 'axios';

export default function App() {
  const [cookies, setCookies, removeCookies] = useCookies('user');
  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated);

  const logout = () => {
    axios.get(`${SERVERURL}/api/auth/logout`).then((res) => {
      removeCookies('user');
      setAuthenticated(false);
    });
  };

  useEffect(() => {
    setAuthenticated(cookies.user != undefined);
  }, [cookies]);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <HomePage authenticated={authenticated} />} />
            <Route
              exact
              path="/timetable"
              render={() => <TimetablePage {...{ authenticated, logout }} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
