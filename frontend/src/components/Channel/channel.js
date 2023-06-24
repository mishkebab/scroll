import SideBar from "../SideBar/sideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channels";

const Channel = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { channelId } = useParams();
    useEffect(() => {
        dispatch(fetchChannel(workspaceId, channelId))
    }, [])
    
    const channel = useSelector(state => Object.values(state.channels).filter(channel => channel.id == channelId))
    const messages = useSelector(state => Object.values(state.messages))

    // const { userId } = useParams();
    // const sessionUser = useSelector(state => state.session.user)

    console.log(channel)
    // Object.values(channel[0]).map(item => console.log(item))
    // const messages = Object.values(channel[0].messages)

    return (
        <div>
            <ul>
                {messages.map(message => 
                    <p>{message.content}</p>
                )}
            </ul>        
        </div>
    )
}

export default Channel