import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { HomePage, SharePage, NotFoundPage, LoginPage } from './pages';
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
              path="/login"
              render={() => (authenticated ? <Redirect to="/" /> : <LoginPage />)}
            />
            <Route
              exact
              path="/"
              render={() => {
                if (!authenticated) return <Redirect to="/login" />;
                return <HomePage {...{ authenticated, logout }} />;
              }}
            />
            <Route path="/share/:id" component={SharePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}
