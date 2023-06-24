import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";
import { fetchDMs } from "../../store/dms";

const SideBar = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(fetchChannels(workspaceId))
    }, [])

    useEffect(() => {
        dispatch(fetchDMs(workspaceId))
    }, [])
    
    const sessionUser = useSelector(state => state.session.user)
    const channels = useSelector(state => Object.values(state.channels))
    const dms = useSelector(state => Object.values(state.dms))

    return (
        <>
            <h1>{sessionUser.displayName}</h1>
            <ul>
                {channels.map(channel => 
                    <a href={`/user/${userId}/${workspaceId}/${channel.id}`}>{channel.name}</a>
                )}
            </ul>
            <ul>
                {dms.map(dm => 
                    <a href={`/user/${userId}/${workspaceId}/${dm.id}`}>{dm.users[0].name}</a>
                )}
            </ul>
        </>
    )
}

export default SideBar;