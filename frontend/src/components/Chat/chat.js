import { useEffect, useState } from "react";
import { createMessage } from "../../store/messages";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannel } from "../../store/channels";
import { fetchDM } from "../../store/dms";
import "./chat.css"

const Chat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    const { channelId } = useParams();
    const { workspaceId } = useParams();
    const { dmId } = useParams();
    
    useEffect(() => {
        if (channelId) {
            dispatch(fetchChannel(workspaceId, channelId))
        }
    }, [dispatch, channelId])

    useEffect(() => {
        if (dmId) {
            dispatch(fetchDM(workspaceId, dmId))
        }
    }, [dispatch, dmId])

    const sessionUser = useSelector(state => state.session.user)
    const channel = useSelector(state => Object.values(state.channels).filter(channel => channel.id == channelId))
    const dm = useSelector(state => Object.values(state.dms).filter(dm => dm.id == dmId))

    if (channel.length === 0 && dm.length === 0) {
        return null;
    }

    let messageableType;
    let messageableId;
    let channelName;
    let dmName;
    
    if (channelId) {
        messageableType = "Channel";
        messageableId = channelId;
        if (channel.length === 0) {
            channelName = " ";
        } else {
            channelName = `#${channel[0].name}`;
        }
    } else {
        messageableType= "DirectMessage";
        messageableId = dmId;
        if (dm.length === 0) {
            dmName = " ";
        } else {
            dmName = (dm[0].users.filter(user => user.id !== sessionUser.id).map(user => user.displayName)).join(", ");
        }
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
                    placeholder={`Message ${channelName ? channelName : dmName}`}  
                    value={message} 
                    onChange={e => setMessage(e.currentTarget.value)}>
                </textarea>
                <button class="message-send-button" type="submit" onClick={handleSubmit}>Send</button>
        </div>
    )
}

export default Chat;