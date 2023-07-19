import SplashVid1 from "./../../assets/splashvid1.mp4";
import SplashVid2 from "./../../assets/splashvid2.mp4";
import SplashVid3 from "./../../assets/splash3.mp4";
import "./splash.css"


const Splash = () => {
    return (
        <div className="splash-page-section-div">
            <div className="splash-page-section">
                <div className="splash-video-div">
                    <video className="splash-video-div" src={SplashVid1} autoPlay loop></video>
                </div>
                <div className="splash-video-div">
                    <h1 className="splash-bottom-header">Move faster with your tools in one place</h1>
                    <p>Automate away routine tasks with the power of generative AI and simplify your workflow with all your favorite apps ready to go in Scroll.</p>
                </div>
                <div className="splash-video-div">
                    <video className="splash-video-div" src={SplashVid3} autoPlay loop></video>
                </div>
            </div>
            <div className="splash-page-section">
                <div className="splash-video-div">
                    <h1 className="splash-bottom-header">Choose how you want to work</h1>
                    <p>In Scroll, you’ve got all the flexibility to work when, where and how it’s best for you. You can easily chat, send audio and video clips, or hop on a huddle to talk things out live.</p>
                </div>
                <div className="splash-video-div">
                    <video className="splash-video-div" src={SplashVid2} autoPlay loop></video>
                </div>
                <div className="splash-video-div">
                    <h1 className="splash-bottom-header">Bring your team together</h1>
                    <p>At the heart of Slack are channels: organized spaces for everyone and everything you need for work. In channels, it’s easier to connect across departments, offices, time zones and even other companies.</p>
                </div>
            </div>
        </div>
    )
}

export default Splash;
