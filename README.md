# Scroll

Scroll, a clone of the popular messaging app Slack, allows users from a workspace to live chat with each other through direct messages or through channels. 

<a href="https://misha-scroll-a1d0e552b8c2.herokuapp.com/" target="_blank" >Live Site</a>

<hr/>

# Technologies Used

* JavaScript
* React
* Redux
* Ruby on Rails
* PostgreSQL
* ActionCable (for WebSockets)
* HTML5
* SCSS

Scroll's core application is built around the WebSocket Communication Protocol to provide live updates to users without refreshing the page. The backend is built using Ruby on Rails and the database uses PostgreSQL. The front end is built using React.js, Redux for the global state management of the application, HTML5, and SCSS. 

<hr/>

# Features

## Live Chat with WebSocket Communication Protocol

* Logged in users that are subscribed to a specific channel or conversation will receive live updates of the changes that occur in it without having to refresh the page.

## User Authentication:

* Users can create an account and login/logout with their credentials.
* Users can choose to login with a Demo User account, which will provide them with access to all of the application's features.
* Users cannot use the application without first logging in.
* User authentication uses Rails' session object to store in the database a session token to authenticate users after logging in.

## Messages:

* Users can communicate with other users in real time through messages
* Users can create messages
* Users can edit their own messages
* Users can delete their own messages

## Channels:

* Users can create channels
* Users can join channels that other users have created
* Users can leave channels

## Direct Message/Conversations: 

* Users can create one-to-one or group direct message conversations with selected team members from the same workspace and chat with them

## Workspaces:

* Users can choose which workspace to work on

<hr/>


