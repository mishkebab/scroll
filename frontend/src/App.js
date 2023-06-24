import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupForm from './components/SignupPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/homePage';
import NavBarUser from './components/NavBarUser';
import Workspace from './components/Workspace/workspace';
import Channel from './components/Channel/channel';
import Chat from './components/Chat/chat';
import SideBar from './components/SideBar/sideBar';
import DirectMessage from './components/DirectMessage/dm';

function App() {
  return (
    <>
      <Switch>
        <Route path="/user/:userId/:workspaceId/:channelId">
          <NavBarUser />
          <SideBar />
          <Channel />
          <Chat />
        </Route>
        <Route path="/user/:userId/:workspaceId/:dmId">
          <NavBarUser />
          <SideBar />
          <DirectMessage />
          <Chat />
        </Route>
        <Route path="/user/:userId/:workspaceId">
          <NavBarUser />
          <Workspace />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route exact path="/">
          <Navigation />
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}

export default App;