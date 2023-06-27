import { useEffect, useState } from "react";
import { createMessage } from "../../store/messages";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel } from "../../store/channels";
import "./chat.css"

const Chat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    const { channelId } = useParams();
    const { workspaceId } = useParams();
    const { dmId } = useParams();
    const channel = useSelector(state => Object.values(state.channels).filter(channel => channel.id == channelId))
    const dm = useSelector(state => Object.values(state.dms).filter(dm => dm.id == dmId))
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchChannel(workspaceId, channelId))
    }, [dispatch, channelId])
    
    let messageableType;
    let messageableId;
    let channelName;
    let dmName;
    
    if (channelId) {
        messageableType = "Channel";
        messageableId = channelId;
        // channelName = `#${channel[0].name}`;
    } else {
        messageableType= "DirectMessage";
        messageableId = dmId;
        // dmName = Object.values(dm.users.filter(user => user.id !== sessionUser.id).map(user => user.name)).join(", ")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {"message": {content: message, author_id: userId, messageable_type: messageableType, messageable_id: messageableId}}
        dispatch(createMessage(newMessage)).then(() => {
            setMessage('');
        })
    }

    return (
        <div class="user-message-container">
                <textarea
                    class="message-input"
                    // placeholder={`Message ${channelName ? channelName : dmName}`}  
                    value={message} 
                    onChange={e => setMessage(e.currentTarget.value)}>
                </textarea>
                <button class="message-send-button" type="submit" onClick={handleSubmit}>Send</button>
        </div>
    )
}

export default Chat;