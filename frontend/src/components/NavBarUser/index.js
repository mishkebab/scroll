import './navBarUser.css'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'


const NavBarUser = () => {
    

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
            <ul>
            </ul>
        </div>
    )
}

export default NavBarUser