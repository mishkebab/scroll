import { useSelector } from 'react-redux'
import './userDashboard.css'


const UserDashboard = () => {
    const sessionUser = useSelector(state => state.session.user)
    const workspaces = useSelector(state => state.workspaces)
    
    

    return (
        <div class="user-dashboard-main">
            <div class="user-dashboard-sidebar">
                <h1>{workspaces}</h1>
                <div class="user-dashboard-sidebar-header">
                    <a>
                        <button>New Msg</button>
                    </a>
                </div>
            </div>
            <div class="user-dashboard-center">
            </div>
            <div class="user-dashboard-user-show">
            </div>
        </div>
    )
}

export default UserDashboard