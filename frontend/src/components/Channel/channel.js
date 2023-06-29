import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channels";
import "./channel.css"
import { editMessage, removeMessage, setMessage } from "../../store/messages";
import { deleteMessage } from "../../store/messages";
import consumer from "../../consumer";
import { IoIosArrowDown } from "react-icons/io"

const Channel = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { channelId } = useParams();

    useEffect(() => {
        dispatch(fetchChannel(workspaceId, channelId))
    }, [dispatch, channelId])
    
    const channel = useSelector(state => Object.values(state.channels).filter(channel => channel.id == channelId))
    const messages = useSelector(state => Object.values(state.messages))


    useEffect(() => {
        const sub = consumer.subscriptions.create(
            { channel: 'ChatChannel', id: channelId },
            {
                received: ({ type, message, id }) => {
                    switch (type) {
                        case 'RECEIVE_MESSAGE':
                            dispatch(setMessage(message));
                            break;
                        case 'DESTROY_MESSAGE':
                            dispatch(removeMessage(id))
                            break;
                        default:
                            console.log('Unhandled broadcast: ', type);
                            break;
                    }
                }
            }
        )
        return () => sub?.unsubscribe();
    }, [channelId, dispatch])

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

    const handleSubmit = (messageId) => {
        const updatedMessage = {id: messageId, content: newMessage}
        dispatch(editMessage(updatedMessage))
    }

    if (channel.length === 0){
        return null;
    };

    return (
        <div class="channel-show">
            <div class="channel-header">
                <div class="channel-subheader">
                    <button class="channel-name">
                        <h1 class="channel-name-header"># {channel[0].name}</h1>
                        < IoIosArrowDown />
                    </button>
                    <span class="channel-description">{channel[0].description}</span>
                </div>
                <button class="channel-members-button">{channel[0].users.length} members</button>
            </div>
            <ul class="message-feed-list">
                {messages.map(message => 
                    <li class="message-feed-item">
                        <div class="message-feed-author-image">
                            <strong class="message-feed-author-initial">{message.author.display_name[0]}</strong>
                        </div>
                        <div class="message-feed-item-content">
                            <div>
                                <div class={`message-feed-item-content-top-wrapped ${isHidden[message.id] ? 'hidden' : ''} `}>
                                    <div class="message-feed-item-content-top">
                                        <span class="message-feed-author">{message.author.display_name}</span>
                                        <span class="message-feed-time">{message.created_at}</span>
                                    </div>
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
                                    <button class="message-send-button" type="submit" onClick={() => {setNewMessage(message.content); toggleVisibility(message.id)}}>Cancel</button>
                                    <button class="message-send-button" type="submit" onClick={() => {toggleVisibility(message.id);handleSubmit(message.id)}}>Save</button>
                                </div>
                            </div>
                            {sessionUser.id == message.author.id ? (
                            <div class="message-edit-delete-buttons">
                                <button class={`message-edit-button ${isHidden[message.id] ? 'hidden' : ''} `} onClick={() => {toggleVisibility(message.id); setNewMessage(message.content)}}>Edit</button>
                                <button class={`message-edit-button ${isHidden[message.id] ? 'hidden' : ''} `} onClick={() => dispatch(deleteMessage(message.id))}>Delete</button>
                            </div>
                            ) : (
                            <div></div>
                            )}
                        </div>
                    </li>
                )}
            </ul>        
        </div>
    )
}

export default Channel