import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";

const Workspace = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    useEffect(() => {
        dispatch(fetchChannels())
    }, [])
    
    const sessionUser = useSelector(state => state.session.user)
    const allChannels = useSelector(state => state.channels)
    const showChannels = Object.values(allChannels).filter(channel => (channel.workspaceId == workspaceId) && (channel.owner_id == userId))
    console.log(showChannels)

    return (
        <>
            <h1>{sessionUser.displayName}</h1>
        </>
    )
}

export default Workspace;