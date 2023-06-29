import './navBarUser.css'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import SlackIcon from "./../../assets/slack-icon.png"
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logout } from '../../store/session'

const NavBarUser = () => {
    const [open, setOpen] = useState(false);
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div class="user-nav-bar">
            <ul class="user-nav-bar-icons-menu">
                <button class="user-nav-bar-icon">
                    < FaLinkedin />
                </button>
                <button class="user-nav-bar-icon">
                    < FaGithub />
                </button>
            </ul>
            <div>
                <button onClick={() => setOpen(!open)} class="slack-logout-button">
                    <img src={SlackIcon} />
                </button>
                {open ? (
                    <div right class="logout-menu">
                        <div class="message-feed-author-image">
                            <strong class="message-feed-author-initial">{sessionUser.displayName[0]}</strong>
                        </div>
                        <div class="logout-menu-user-information">
                            <div class="channel-name-header">{sessionUser.displayName}</div>
                            <div class="channel-description">{sessionUser.title}</div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default NavBarUser