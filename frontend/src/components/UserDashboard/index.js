import { useSelector } from 'react-redux'
import './userDashboard.css'


const UserDashboard = () => {
    const sessionUser = useSelector(state => state.session.user)
    const workspaces = sessionUser.workspaces
    const channels = sessionUser.channels
    console.log(workspaces)

    return (
        <h1>{sessionUser.displayName}</h1>
    )
}

export default UserDashboard