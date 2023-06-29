import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
// import './channelBrowser.css'
import { useEffect } from "react";
import { fetchDMs } from "../../store/dms";

const DMIndexPage = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(fetchDMs(workspaceId))
    }, [])

    const sessionUser = useSelector(state => state.session.user)
    const dms = useSelector(state => Object.values(state.dms))

    if (dms.length === 0){
        return null;
    };

    return (
        <div class="channel-browser-main">
            <div class="channel-browser-header">
                <h1>Direct messages</h1>
            </div>
            <ul class="channel-browser-items">
                {dms.map(dm => 
                        <li class="channel-browser-item">
                            <a class="channel-browser-link-to-channel" href={`/user/${userId}/${workspaceId}/dm/${dm.id}`}>
                                <div class="channel-browser-label-container">
                                    <span class="channel-browser-item-title"># {(dm.users.filter(user => user.id !== sessionUser.id).map(user => user.displayName)).join(", ")}</span>
                                </div>
                            </a>
                        </li>
                )}
            </ul>
        </div>
    )
}

export default DMIndexPage;