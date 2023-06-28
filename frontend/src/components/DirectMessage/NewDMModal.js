import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import './channelBrowser.css'
import { useEffect } from "react";
import { fetchChannels } from "../../store/channels";

const ChannelBrowser = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();

    useEffect(() => {
        dispatch(fetchChannels(workspaceId))
    }, [])

    const channels = useSelector(state => Object.values(state.channels))
    // console.log(channels[0].users.length)

    return (
        <div class="channel-browser-main">
            <div class="channel-browser-header">
                <h1>Channel Browser</h1>
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
                        </li>
                )}
            </ul>
        </div>
    )
}

export default ChannelBrowser;