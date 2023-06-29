import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDM } from "../../store/dms";
import consumer from "../../consumer";
import { editMessage, setMessage } from "../../store/messages";
import { IoIosArrowDown } from "react-icons/io"

const DirectMessage = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { dmId } = useParams();

    useEffect(() => {
        dispatch(fetchDM(workspaceId, dmId))
    }, [dispatch, dmId])
    
    const dm = useSelector(state => Object.values(state.dms).filter(dm => dm.id == dmId))
    const messages = useSelector(state => Object.values(state.messages))
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        const sub = consumer.subscriptions.create(
            { channel: 'DmChannel', id: dmId },
            {
                received: ({ message }) => {
                    console.log('Received message: ', message);
                    dispatch(setMessage(message));
                }
            }
        )
        return () => sub?.unsubscribe();
    }, [dmId, dispatch])

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

    if (dm.length === 0){
        return null;
    };

    console.log(dm)

    return (
        <div class="channel-show">
            <div class="channel-header">
                <div class="channel-subheader">
                    <button class="channel-name">
                        <h1 class="channel-name-header">{(dm[0].users.filter(user => user.id !== sessionUser.id).map(user => user.displayName)).join(", ")}</h1>
                        < IoIosArrowDown />
                    </button>
                </div>
            </div>
            <ul class="message-feed-list">
                {messages.map(message => 
                    <li class="message-feed-item">
                        <div class="message-feed-author-image">
                            <strong class="message-feed-author-initial">{message.author.display_name[0]}</strong>
                        </div>
                        <div class="message-feed-item-content">
                            <div class={`message-feed-item-content-top-wrapped ${isHidden[message.id] ? 'hidden' : ''} `}>
                                <div class="message-feed-item-content-top">
                                    <span class="message-feed-author">{message.author.display_name}</span>
                                    <span class="message-feed-time">{message.created_at}</span>
                                </div>
                                {sessionUser.id == message.author.id ? (
                                    <button class={`message-edit-button ${isHidden[message.id] ? 'hidden' : ''} `} onClick={() => {toggleVisibility(message.id); setNewMessage(message.content)}}>Edit</button>
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
                                <button class="message-send-button" type="submit" onClick={() => {setNewMessage(message.content); toggleVisibility(message.id)}}>Cancel</button>
                                <button class="message-send-button" type="submit" onClick={() => {toggleVisibility(message.id);handleSubmit(message.id)}}>Save</button>
                            </div>
                        </div>
                    </li>
                )}
            </ul>         
        </div>
    )
}

export default DirectMessage