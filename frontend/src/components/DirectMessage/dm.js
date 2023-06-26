import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDM } from "../../store/dms";

const DirectMessage = () => {
    const dispatch = useDispatch();
    const { dmId } = useParams();
    const { workspaceId } = useParams();
    useEffect(() => {
        dispatch(fetchDM(workspaceId, dmId))
    }, [])
    
    // const dm = useSelector(state => Object.values(state.dms).filter(channel => channel.id == channelId))
    // console.log(dm)

    const messages = useSelector(state => Object.values(state.messages))

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

export default DirectMessage