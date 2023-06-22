import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupForm from './components/SignupPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/homePage';
import NavBarUser from './components/NavBarUser';
import UserDashboard from './components/UserDashboard';
import Workspace from './components/Workspace/workspace';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/user/:userId/:workspaceId">
          <NavBarUser />
          <Workspace />
        </Route>
      </Switch>
    </>
  );
}

export default App;