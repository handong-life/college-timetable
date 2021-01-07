import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ThemeProvider } from '@material-ui/core/styles';
import { HomePage, TimetablePage, NotFoundPage } from './pages';
import theme from './theme';
import { Axios } from './lib/axios';
import { storage } from './utils/storage';

export default function App() {
  const [cookies, setCookies, removeCookies] = useCookies('user');
  const [authenticated, setAuthenticated] = useState(false);

  const logout = () => {
    storage.remove('accessToken');
    setAuthenticated(false);
  };

  useEffect(() => {
    if (cookies.accessToken) {
      storage.set('accessToken', cookies.accessToken);
      removeCookies('accessToken');
    }

    Axios()
      .get('/auth')
      .then((res) => setAuthenticated(res.data.authenticated));
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" render={() => <HomePage authenticated={authenticated} />} />
            <Route
              exact
              path="/handong"
              render={() => <TimetablePage {...{ authenticated, logout }} />}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
