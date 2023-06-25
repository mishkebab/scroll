import { useState } from "react";
import { createMessage } from "../../store/messages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./chat.css"

const Chat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    const { channelId } = useParams();
    const { dmId } = useParams();
    
    let messageableType;
    let messageableId;
    
    if (channelId) {
        messageableType = "Channel";
        messageableId = channelId;
    } else {
        messageableType= "DirectMessage";
        messageableId = dmId;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {message: {content: message, author_id: userId, messageable_type: messageableType, messageable_id: messageableId}}
        dispatch(createMessage(newMessage))
    }

    return (
        <div class="user-message-container">
                <textarea
                    class="message-input"
                    placeholder="write a message" 
                    value={message} 
                    onChange={e => setMessage(e.currentTarget.value)}>
                </textarea>
                <button class="message-send-button" type="submit" onClick={handleSubmit}>Send</button>
        </div>
    )
}

export default Chat;