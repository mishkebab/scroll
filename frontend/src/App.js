import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupForm from './components/SignupPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupForm />
      </Route>
    </Switch>
  );
}

export default App;