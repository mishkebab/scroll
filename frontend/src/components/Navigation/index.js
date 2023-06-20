import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"
import * as sessionActions from '../../store/session';
import './navBar.css'

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        
    }

    return (sessionUser) ? (
        <div class="nav-bar">
            <ul>
                <a class="nav-bar-link" href="https://www.google.com">Portfolio</a>
                <a class="nav-bar-link" href="https://www.linkedin.com/in/mishabansal/">LinkedIn</a>
                <a class="nav-bar-link" href="https://github.com/mishkebab">GitHub</a>
            </ul>
            <ul>
                <Link to="/">
                    <button class="nav-demo" onClick={logout} id="nav-logout">Logout</button>
                </Link>
            </ul>
        </div>
    ) : (
        <div class="nav-bar">
            <ul>
                <a class="nav-bar-link" href="https://www.google.com">Portfolio</a>
                <a class="nav-bar-link" href="https://www.linkedin.com/in/mishabansal/">LinkedIn</a>
                <a class="nav-bar-link" href="https://github.com/mishkebab">GitHub</a>
            </ul>
            <ul>
                <a class="nav-bar-link" href="/login">Log in</a>
                <a id="nav-signup" href="/signup">Sign up Here</a>
                <Link to="/">
                    <button class="nav-demo">Try a Demo</button>
                </Link>
            </ul>
        </div>
    )
}

export default Navigation