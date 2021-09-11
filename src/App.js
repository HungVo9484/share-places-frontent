import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from './shared/themes/theme';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'Open Sans', sans-serif;
  }

  body {
    margin: 0;
    background: ${(p) => p.theme.background};
  }

  .slide-in-left-enter {
    transform: translateX(-100%);
  }

  .slide-in-left-enter-active {
    transform: translateX(0);
    opacity: 1;
    transition: all 200ms;
  }

  .slide-in-left-exit {
    transform: translateX(0%);
    opacity: 1;
  }

  .slide-in-left-exit-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 200ms;
  }

  .center {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MainNavigation />
        <main>
          <Switch>
            <Route path='/' exact>
              <Users />
            </Route>
            <Route path='/:userId/places' exact>
              <UserPlaces />
            </Route>
            <Route path='/places/new' exact>
              <NewPlace />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </ThemeProvider>
    </Router>
  );
};

export default App;
