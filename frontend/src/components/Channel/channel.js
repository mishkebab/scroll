import SideBar from "../SideBar/sideBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channels";
import "./channel.css"
import { editMessage } from "../../store/messages";
import { deleteMessage } from "../../store/messages";
import consumer from "../../consumer";

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
        dispatch(fetchChannel(workspaceId, channelId));
    }, [])

    useEffect(() => {
        let sub;
        if (channel) {
            sub = consumer.subscriptions.create({
                channel: 'ChatChannel',
                channel_id: channel.id
            }, {
                received: payload => {
                    switch(payload.type) {
                        case 'SET_MESSAGE':
                            console.log(`message received: ${payload.message}`)
                    }
                }
            });
        }
        return () => sub?.unsubscribe();
    }, [channel])

    // const { userId } = useParams();
    const sessionUser = useSelector(state => state.session.user)

    const [isHidden, setIsHidden] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const toggleVisibility = (messageId) => {
        setIsHidden((prevState) => ({
            ...prevState,
            [messageId]: !prevState[messageId]
        }))
    };

    // Object.values(channel[0]).map(item => console.log(item))
    // const messages = Object.values(channel[0].messages)

    const handleSubmit = (messageId) => {
        const updatedMessage = {id: messageId, content: newMessage}
        dispatch(editMessage(updatedMessage))
    }

    return (
        <div>
            <ul class="message-feed-list">
                {messages.map(message => 
                    <li class="message-feed-item">
                        <div class="message-feed-author-image">
                            <strong class="message-feed-author-initial">{message.author.display_name[0]}</strong>
                        </div>
                        <div class="message-feed-item-content">
                            <div class={`message-feed-item-content-top-wrapped ${isHidden ? 'hidden' : ''} `}>
                                <div class="message-feed-item-content-top">
                                    <span class="message-feed-author">{message.author.display_name}</span>
                                    <span class="message-feed-time">{message.created_at}</span>
                                </div>
                                {sessionUser.id == message.author.id ? (
                                    <button class="message-edit-button" onClick={() => {toggleVisibility(message.id); setNewMessage(message.content)}}>Edit</button>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <div class={`message-feed-text-container ${isHidden[message.id] ? 'hidden' : ''} `}>
                                <span class="message-feed-text">{message.content}</span>
                                <div></div>
                            </div>
                            <div class={`user-message-container ${isHidden[message.id] ? '' : 'hidden'} `}>
                                <textarea
                                    class={`message-input`}
                                    value={newMessage} 
                                    onChange={e => setNewMessage(e.currentTarget.value)}>
                                </textarea>
                                <button class="message-send-button" type="submit" onClick={() => handleSubmit(message.id)}>Send</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>        
        </div>
    )
}

export default Channel