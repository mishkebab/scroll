import SideBar from "../SideBar/sideBar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channels";
import "./channel.css"

const Channel = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { channelId } = useParams();
    useEffect(() => {
        dispatch(fetchChannel(workspaceId, channelId))
    }, [])
    
    const channel = useSelector(state => Object.values(state.channels).filter(channel => channel.id == channelId))
    const messages = useSelector(state => Object.values(state.messages))

    useEffect(() => {
        dispatch(fetchChannel(workspaceId, channelId))
    }, [])

    // const { userId } = useParams();
    // const sessionUser = useSelector(state => state.session.user)

    // Object.values(channel[0]).map(item => console.log(item))
    // const messages = Object.values(channel[0].messages)

    return (
        <div>
            <ul class="message-feed-list">
                {messages.map(message => 
                    <li class="message-feed-item">
                        <div class="message-feed-author-image">
                            <strong class="message-feed-author-initial">{message.author.display_name[0]}</strong>
                        </div>
                        <div class="message-feed-item-content">
                            <div class="message-feed-item-content-top-wrapped">
                                <span class="message-feed-author">{message.author.display_name}</span>
                            </div>
                            <div class="message-feed-text-container">
                                <span class="message-feed-text">{message.content}</span>
                                <div></div>
                            </div>
                        </div>
                    </li>
                )}
            </ul>        
        </div>
    )
}

export default Channel