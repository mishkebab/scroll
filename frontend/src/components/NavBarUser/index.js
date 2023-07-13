import './navBarUser.css'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import SlackIcon from "./../../assets/slack-icon.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

const NavBarUser = () => {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        history.push("/")
    }

    if (sessionUser === null) {
        return null;
    }

    return (
        <div class="user-nav-bar">
            <ul class="user-nav-bar-icons-menu">
                <button class="user-nav-bar-icon">
                    <a class="user-nav-bar-icon" href="https://www.linkedin.com/in/mishabansal/"><FaLinkedin /></a>
                </button>
                <button class="user-nav-bar-icon">
                    <a class="user-nav-bar-icon" href="https://github.com/mishkebab">< FaGithub /></a>
                </button>
            </ul>
            <div>
                <button onClick={() => setOpen(!open)} class="slack-logout-button">
                    <img src={SlackIcon} />
                </button>
                {open ? (
                    <div class="logout-menu">
                        <div class="logout-menu-user-info">
                            <div class="message-feed-author-image">
                                <strong class="message-feed-author-initial">{sessionUser.displayName[0]}</strong>
                            </div>
                            <div class="logout-menu-user-information">
                                <div class="logout-name-header">{sessionUser.displayName}</div>
                                <div class="logout-description-header">{sessionUser.title}</div>
                            </div>
                        </div>
                        <ul class="nav-bar-logout-signup-buttons">
                            <button className="nav-demo" onClick={logout} id="nav-logout">
                                Logout
                            </button>
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default NavBarUser

                        // {/* <div class="logout-button-dropdown-container"> */}
                        // {/* </div> */}

                    //     <Link to="/" onClick={logout}>
                    //     Log Out
                    //     <button class="message-send-button logout-button-dropdown" onClick={logout}>Log Out</button>
                    // </Link>