import { useSelector } from 'react-redux'
import './userDashboard.css'


const UserDashboard = () => {
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div class="user-dashboard-main">
            <div class="user-dashboard-sidebar">
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