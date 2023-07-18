import './homePage.css'
import { useEffect, useState } from 'react';
import HomePageImage from "./../../assets/sample_homepage.jpeg"
import HomePageAnimation from "./../../assets/slack-home-page-animation.webm"
import WelcomeGIF from "./../../assets/welcome-waving.gif"
import Hogwarts from "./../../assets/harry-potter.jpeg"
import LondonBus from "./../../assets/london-tower-bridge.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { fetchWorkspaces } from '../../store/workspaces';
import * as sessionActions from '../../store/session';
import DemoModal from '../DemoModal/DemoModal';
import { useHistory } from 'react-router-dom'

const HomePage = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const workspaces = useSelector(state => Object.values(state.workspaces))
    
    useEffect(() => {
        dispatch(fetchWorkspaces())
    }, [])

    const loginDemo = () => {
        dispatch(sessionActions.login({ email: "hermione@hogwarts.edu", password:"password" }));
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        history.push("/")
    }

    
    return (sessionUser && workspaces) ? (
        <div className="home-page">
            <div className="splash-page-main-logged-in">
                <div className="splash-main-header-container">
                    <img className="waving-gif" src={WelcomeGIF} />
                    <h1 className="splash-main-header">Welcome back</h1>
                </div>
                <div className="welcome-user-info-container">
                    <div className="welcome-user-info-title">{`Workspaces for ${sessionUser.email}`}</div>
                    <div className="welcome-user-choose-workspace">
                        <ul class="workspace-item-menu">
                            {workspaces.map(workspace =>
                                <li class="workspace-item">
                                    <div class="workspace-image-container">
                                        <img class="workspace-image" src={workspace.id == 1 ? Hogwarts : LondonBus} />
                                    </div>
                                    <div class="workspace-info-container">
                                        <span class="workspace-name-main-page">{workspace.name}</span>
                                        <span class="workspace-info-members-main-page">{workspace.users?.length} members</span>
                                    </div>
                                    <a className="welcome-user-launch-button" href={`/user/${sessionUser.id}/${workspace.id}`}>Launch Scroll</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <span class="not-seeing-your-workspace">
                Not seeing your workspace?  
                <button onClick={logout} class="try-different-email-link">Try using a different email...</button>
            </span>
        </div>
    ) : (
        <div className="home-page">
            <section className="splash-page-main">
                <section className="splash-page-main-left">
                    <h1 className="splash-main-header">
                        Made for people.
                        <br /> 
                        <span className="orange">
                        Built for productivity.
                        </span>
                    </h1>
                    <p className="splash-subheader"> 
                    Connect the right people, find anything you need and automate the rest. That’s work in Scroll, your productivity platform.
                    </p>
                    <div className="splash-main-buttons">
                        <DemoModal class="splash-main-buttons splash-demo"/>
                        <a className="splash-main-buttons" id="splash-signup" href="/signup">Sign up Here</a>
                    </div>
                </section>
                <section className="splash-page-main-right">
                    <video src={HomePageAnimation} autoPlay loop></video>
                </section>
            </section>
        </div>
    )
    
}

export default HomePage;

// 