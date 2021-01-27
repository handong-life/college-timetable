import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { HomePage, TimetablePage, SharePage, NotFoundPage } from './pages';
import theme from './theme';
import { useAuth } from './hooks';

export default function App() {
  const [authenticated, logout] = useAuth();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                authenticated ? (
                  <Redirect to="/handong" />
                ) : (
                  <HomePage authenticated={authenticated} />
                )
              }
            />
            <Route
              exact
              path="/handong"
              render={() =>
                !authenticated ? (
                  <Redirect to="/" />
                ) : (
                  <TimetablePage {...{ collegeName: '한동대', authenticated, logout }} />
                )
              }
            />
            <Route path="/share/:id" component={SharePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
