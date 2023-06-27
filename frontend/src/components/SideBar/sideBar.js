import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannels } from "../../store/channels";
import { fetchDMs } from "../../store/dms";
import { fetchWorkspace } from "../../store/workspaces";
import PlusButton from "../../assets/plus-button.png"
import DownArrow from "../../assets/down-arrow.png"
import './sideBar.css'


const SideBar = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { userId } = useParams();
    const [channelOpen, setChannelOpen] = useState(false);
    const [dmOpen, setDMOpen] = useState(false);

    const toggleChannelVisibility = () => {
        setChannelOpen(!channelOpen)
    };

    const toggleDMVisibility = () => {
        setDMOpen(!dmOpen)
    };

    useEffect(() => {
        dispatch(fetchWorkspace(workspaceId))
    }, [])

    useEffect(() => {
        dispatch(fetchChannels(workspaceId))
    }, [])

    useEffect(() => {
        dispatch(fetchDMs(workspaceId))
    }, [])

    const handleChannelOpen = () => {
        setChannelOpen(!channelOpen);
    }


    const handleDMOpen = () => {
        setDMOpen(!dmOpen);
    }
    
    const sessionUser = useSelector(state => state.session.user)
    const workspace = useSelector(state => Object.values(state.workspaces))
    const channels = useSelector(state => Object.values(state.channels))
    const dms = useSelector(state => Object.values(state.dms))

    return (
        <div class="user-sidebar">
            {/* <h1 class="sidebar-workspace-name">{workspace[0].name}</h1> */}
            <div class="sidebar-list">
                <div class="sidebar-list-header">
                    <button onClick={toggleChannelVisibility}>
                        <img src={DownArrow} />
                    </button>
                    <span>Channels</span>
                    <div class="sidebar-button-image-container hidden">
                        <img src={PlusButton}/>
                    </div>
                </div>
                <ul className="sidebar-menu"> 
                        {channels.map(channel => 
                            <a class={`sidebar-list-item-container ${channelOpen ? 'hidden' : ''} `} href={`/user/${userId}/${workspaceId}/channel/${channel.id}`}>
                                <li class="sidebar-list-item">
                                    <span class="sidebar-hashtag">#</span>
                                    <span class="sidebar-item-name">{channel.name}</span>
                                </li>
                            </a>
                        )}
                </ul>
            </div>
            <div class="sidebar-list">
                <div class="sidebar-list-header">
                    <button onClick={toggleDMVisibility}>
                        <img src={DownArrow} />
                    </button>

                    <span>Direct messages</span>
                    <div class="sidebar-button-image-container hidden">
                            <img src={PlusButton}/>
                    </div>
                </div>
                <ul className="sidebar-menu"> 
                    {dms.map(dm => 
                        <a class={`sidebar-list-item-container ${dmOpen ? 'hidden' : ''} `} href={`/user/${userId}/${workspaceId}/dm/${dm.id}`}>
                            <li class="sidebar-list-item">
                                <span class="sidebar-hashtag">#</span>
                                <span class="sidebar-item-name">{Object.values(dm.users.filter(user => user.id != sessionUser.id).map(user => user.name)).join(", ")}</span>
                            </li>
                        </a>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default SideBar;