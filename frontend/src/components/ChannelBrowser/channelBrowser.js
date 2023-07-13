import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import './channelBrowser.css'
import { useEffect, useState } from "react";
import { fetchChannels } from "../../store/channels";
import csrfFetch from "../../store/csrf";


const ChannelBrowser = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [hideSuggestions, setHideSuggestions] = useState(true);

    
    const channels = useSelector(state => Object.values(state.channels))
    const sessionUser = useSelector(state => state.session.user)
    const user_channels = useSelector(state => Object.values(state.session.user.channels))
    const user_channel_ids = user_channels.map(channel => channel.id)

    useEffect(() => {
            dispatch(fetchChannels(workspaceId))
    }, [sessionUser])
    
    if (channels.length === 0 || user_channels.length === 0){
        return null;
    };
    // setSuggestions(channels);
    // console.log(channels[0].users.length)
    
    const joinChannel = async (channelId) => {
        const newChannelSub = {"channel_sub": {user_id: userId, channel_id: channelId}}
        await csrfFetch('/api/channel_subscriptions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newChannelSub)
        })
        history.push(`/user/${userId}/${workspaceId}/channel/${channelId}`)
    }

    const leaveChannel = async (channelId) => {
        await csrfFetch(`/api/channel_subscriptions/${channelId}`, {
            method: "DELETE",
        })
        history.push(`/user/${userId}/${workspaceId}/`)
    }

    return (
        <div class="channel-browser-main">
            <div class="channel-browser-header">
                <h1>Channel Browser</h1>
            </div>

            <div className={`${['suggestions']} ${hideSuggestions && ['hidden']}`}>
                {suggestions.map((suggestion) => (
                    <div className={suggestion}>
                        {suggestion['title']}
                    </div>
                ))}
            </div>
            <ul class="channel-browser-items">
                {channels.map(channel => 
                        <li class="channel-browser-item">
                            <a class="channel-browser-link-to-channel" href={`/user/${userId}/${workspaceId}/channel/${channel.id}`}>
                                <div class="channel-browser-label-container">
                                    <span class="channel-browser-item-title"># {channel.name}</span>
                                    <span class="channel-browser-item-subtitle">{channel.users.length} members</span>
                                </div>
                            </a>
                            {user_channel_ids.includes(channel.id) ? <button className="message-send-button" onClick={() => leaveChannel(channel.id)}>Leave</button> : <button className="message-send-button" onClick={() => joinChannel(channel.id)}>Join</button>}
                        </li>
                )}
            </ul>
        </div>
    )
}

export default ChannelBrowser;