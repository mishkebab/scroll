import './homePage.css'
import HomePageImage from "./../../assets/sample_homepage.jpeg"
import WelcomeGIF from "./../../assets/welcome-waving.gif"
import { useSelector } from 'react-redux'
import { ReactComponent as SlackSVG } from '../../assets/slack-icon.svg';

const HomePage = () => {
    const sessionUser = useSelector(state => state.session.user)

    return (sessionUser) ? (
        <div class="home-page">
            <div class="splash-page-main-logged-in">
                <div class="splash-main-header-container">
                    <img class="waving-gif" src={WelcomeGIF} />
                    <h1 class="splash-main-header">Welcome back</h1>
                </div>
                <div class="welcome-user-info-container">
                    <div class="welcome-user-info-title">{`Scroll for ${sessionUser.email}`}</div>
                    <div class="welcome-user-subheader">
                        <div class="welcome-user-details-container">
                            <SlackSVG />
                            <div class="welcome-user-details">
                                <span>{sessionUser.fullName}</span>
                                <span>{sessionUser.title}</span>
                            </div>
                        </div>
                        <a class="welcome-user-launch-button">Launch Scroll</a>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div class="home-page">
            <section class="splash-page-main">
                <section class="splash-page-main-left">
                    <h1 class="splash-main-header">
                        Made for people.
                        <br /> 
                        <span class="orange">
                        Built for productivity.
                        </span>
                    </h1>
                    <p class="splash-subheader"> 
                    Connect the right people, find anything you need and automate the rest. That’s work in Scroll, your productivity platform.
                    </p>
                    <div class="splash-main-buttons">
                        <button class="splash-main-buttons" id="splash-demo">Try A Demo</button>
                        <a class="splash-main-buttons" id="splash-signup" href="/signup">Sign up Here</a>
                    </div>
                </section>
                <section class="splash-page-main-right">
                    <img src={HomePageImage} />
                </section>
            </section>
        </div>
    )
}

export default HomePage;