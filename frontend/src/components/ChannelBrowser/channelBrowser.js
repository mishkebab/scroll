import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import './channelBrowser.css'
import { useEffect, useState } from "react";
import { fetchChannels } from "../../store/channels";
import axios from 'axios';

const ChannelBrowser = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [hideSuggestions, setHideSuggestions] = useState(true);

    useEffect(() => {
            dispatch(fetchChannels(workspaceId))
    }, [])

    const channels = useSelector(state => Object.values(state.channels))

    const user_channels = useSelector(state => Object.values(state.session.user.channels))
    console.log(user_channels)

    const user_channel_ids = user_channels.map(channel => channel.id)
    console.log(user_channel_ids)

    if (channels.length === 0 || user_channels.length === 0){
        return null;
    };
    // console.log(user_channels)
    // setSuggestions(channels);
    // console.log(channels[0].users.length)

    return (
        <div class="channel-browser-main">
            <div class="channel-browser-header">
                <h1>Channel Browser</h1>
            </div>
            <div className="bump">
                <input
                    type="text"
                    className="bump"
                    placeholder="Search channels..."
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value);
                    }}
                />
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
                            {user_channel_ids.includes(channel.id) ? <button>Leave</button> : <button>Join</button>}
                        </li>
                )}
            </ul>
        </div>
    )
}

export default ChannelBrowser;