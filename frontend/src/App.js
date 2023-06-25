import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupForm from './components/SignupPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage/homePage';
import NavBarUser from './components/NavBarUser';
import ChannelBrowser from './components/ChannelBrowser/channelBrowser';
import Channel from './components/Channel/channel';
import Chat from './components/Chat/chat';
import SideBar from './components/SideBar/sideBar';
import DirectMessage from './components/DirectMessage/dm';

function App() {
  return (
    <>
      <Switch>
        <Route path="/user/:userId/:workspaceId/channel/:channelId">
            <NavBarUser />
            <div class="user-dashboard">
              <SideBar />
              <div class="user-dashboard-center">
                <Channel />
                <Chat />
              </div>
            </div>
        </Route>
        <Route path="/user/:userId/:workspaceId/dm/:dmId">
          <NavBarUser />
          <SideBar />
          <DirectMessage />
          <Chat />
        </Route>
        <Route path="/user/:userId/:workspaceId">
            <NavBarUser />
          <div class="user-dashboard">
            <SideBar />
            <ChannelBrowser />
          </div>
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