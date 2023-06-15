import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import ProfileButton from "./ProfileButton"

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)
    return (sessionUser) ? (
        <ul>
            <ProfileButton />
            <Link to="/logout">Logout</Link>
        </ul>
    ) : (
        <ul>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </ul>
    )
}

export default Navigation