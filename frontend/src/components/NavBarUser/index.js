import './navBarUser.css'
import { Link } from 'react-router-dom'

const NavBarUser = () => {
    return (
        <div class="user-nav-bar">
            <ul>
                <a class="nav-bar-link" href="https://www.google.com">Portfolio</a>
                <a class="nav-bar-link" href="https://www.linkedin.com/in/mishabansal/">LinkedIn</a>
                <a class="nav-bar-link" href="https://github.com/mishkebab">GitHub</a>
            </ul>
            <ul>
            </ul>
        </div>
    )
}

export default NavBarUser