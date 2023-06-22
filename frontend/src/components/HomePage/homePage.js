import './homePage.css'
import { useEffect } from 'react';
import HomePageImage from "./../../assets/sample_homepage.jpeg"
import WelcomeGIF from "./../../assets/welcome-waving.gif"
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as SlackSVG } from '../../assets/slack-icon.svg';
import { Link } from 'react-router-dom';
import { fetchWorkspaces } from '../../store/workspaces';

const HomePage = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(fetchWorkspaces())
    }, [])
    
    const workspaces = useSelector(state => state.workspaces)
   
    return (sessionUser) ? (
        <div className="home-page">
            <div className="splash-page-main-logged-in">
                <div className="splash-main-header-container">
                    <img className="waving-gif" src={WelcomeGIF} />
                    <h1 className="splash-main-header">Welcome back</h1>
                </div>
                <div className="welcome-user-info-container">
                    <div className="welcome-user-info-title">{`Workspaces for ${sessionUser.email}`}</div>
                    <div className="welcome-user-subheader">
                        <div className="welcome-user-choose-workspace">
                            <SlackSVG />
                            <div className="welcome-user-details">
                                <span>{sessionUser.fullName}</span>
                                <span>{sessionUser.title}</span>
                            </div>
                            <ul>
                                {/* {workspaces.map(workspace =>
                                    <Link to={`/user/${sessionUser.id}/${workspace.id}`}>{workspace.name}</Link>
                                )} */}
                            </ul>
                        </div>
                        <a className="welcome-user-launch-button" href="/user-dashboard">Launch Scroll</a>
                    </div>
                </div>
            </div>
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
                        <button className="splash-main-buttons" id="splash-demo">Try A Demo</button>
                        <a className="splash-main-buttons" id="splash-signup" href="/signup">Sign up Here</a>
                    </div>
                </section>
                <section className="splash-page-main-right">
                    <img src={HomePageImage} />
                </section>
            </section>
        </div>
    )
}

export default HomePage;

// 