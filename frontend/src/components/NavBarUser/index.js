import './navBarUser.css'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import SlackIcon from "./../../assets/slack-icon.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import UserProfileModal from '../UserProfile/UserProfileModal'

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
                    <a class="user-nav-bar-icon" href="https://www.linkedin.com/in/mishabansal/" target="_blank"><FaLinkedin /></a>
                </button>
                <button class="user-nav-bar-icon">
                    <a class="user-nav-bar-icon" href="https://github.com/mishkebab" target="_blank">< FaGithub /></a>
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
                                <strong class="logout-name-header">{sessionUser.displayName}</strong>
                                <div class="logout-description-header">{sessionUser.title}</div>
                            </div>
                        </div>
                        <ul class="sign-out-padding">
                            <UserProfileModal />
                            <button className="nav-bar-dropdown" onClick={logout}>
                                Sign out
                            </button>
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default NavBarUser