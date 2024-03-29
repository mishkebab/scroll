import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../../store/channels";
import "./channel.css"
import { editMessage, removeMessage, setMessage } from "../../store/messages";
import { deleteMessage } from "../../store/messages";
import consumer from "../../consumer";
import { IoIosArrowDown } from "react-icons/io"
import { Modal } from "../../context/Modal";
import { RxCross2 } from "react-icons/rx"
import csrfFetch from "../../store/csrf";
import Select from 'react-select';


const Channel = () => {
    const dispatch = useDispatch();
    const { workspaceId } = useParams();
    const { channelId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");

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

    const sessionUser = useSelector(state => state.session.user)

    const [isHidden, setIsHidden] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const toggleVisibility = (messageId) => {
        setIsHidden((prevState) => ({
            ...prevState,
            [messageId]: !prevState[messageId]
        }))
    };

    const [addUser, setAddUser] = useState(false)

    const joinChannel = async () => {
        const userId = searchInput.value
        const newChannelSub = {"channel_sub": {user_id: userId, channel_id: channelId}}
        await csrfFetch('/api/channel_subscriptions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newChannelSub)
        })

        setShowModal(false)

        // dispatch(fetchUserChannel(workspaceId, channelId))

        // history.push(`/user/${userId}/${workspaceId}/channel/${channelId}`)
    }

    const handleSubmit = (messageId) => {
        const updatedMessage = {id: messageId, content: newMessage}
        dispatch(editMessage(updatedMessage))
    }


    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "transparent",
            color: "rgb(209, 210, 211)",
            // match with the menu
            borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "rgb(209, 210, 211)" : "rgb(209, 210, 211)",
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "green" : "green"
            }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0,
        })
        };

    const names = async() => {
        const response = await csrfFetch('/api/users');
        const allUsers = await response.json()
        // if(channel.length != 0) {
        //     const channelUsers = Object.values(channel[0].users).map(user => Object.values(user)[0])
        // }
        const channelUserIds = channelUsers.map(user => user.id)
        const filteredUsers = allUsers.filter(user => !channelUserIds.includes(user.value))
        setUsers(filteredUsers)
    }
    
    useEffect(() => {
        if(channel.length > 0) {
            names()
        }
    }, [channel[0]])
    

    if (channel.length === 0){ 
        return null;
    };
    
    const channelUsers = Object.values(channel[0].users).map(user => Object.values(user)[0])

    return (
        <div class="channel-show">
            <div class="channel-header">
                <div class="channel-subheader">
                    <button class="channel-name" onClick={() => setShowModal(true)}>
                        <h1 class="channel-name-header"># {channel[0].name}</h1>
                        < IoIosArrowDown />
                    </button>
                    <span class="channel-description">{channel[0].description}</span>
                </div>
                <button class="channel-members-button" onClick={() => setShowModal(true)}>{channel[0].users.length} members</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="channel-members-modal-container modal-alignment">
                            <div class="channel-name channel-modal-header">
                                <h1 class="channel-name-header">#{channel[0].name}</h1>
                                <button class="channel-modal-close" onClick={() => setShowModal(false)}>
                                    < RxCross2 />
                                </button>
                            </div>
                            <div className="channel-members-modal">
                                <button class="channel-menu-user-info add-person-button">
                                    <div class="message-feed-author-image add-person-initial">
                                            <strong class="message-feed-author-initial">+</strong>
                                    </div>
                                    <div>
                                        <strong class="channel-member-display-name" onClick={() => setAddUser(true)}>Add User to Channel</strong>
                                    </div>
                                </button>
                                <div className={`add-user-div ${addUser ? '' : 'hidden'}`}>
                                    <form >
                                        <h1 className="add-user-heading">Add User</h1>
                                        <div class="search-bar-add-user">
                                            <Select styles={customStyles} options={users} onChange={setSearchInput}/>
                                        </div>
                                        <div class="add-user-buttons">
                                            <button className="add-user-send-button" id="add-user-cancel-button" onClick={() => setAddUser(false)}>Cancel</button>
                                            <button type="submit" className="add-user-send-button" onClick={joinChannel}>Add User</button>
                                        </div>
                                    </form>
                                </div>
                                {channelUsers.map(user => 
                                <>
                                <div class="channel-menu-user-info ">
                                    <div class="message-feed-author-image channel-user-menu-initial">
                                            <strong class="message-feed-author-initial">{user.displayName[0]}</strong>
                                    </div>
                                    <div>
                                        <strong class="channel-member-display-name">{user.displayName}</strong>
                                        <div class="channel-member-description">{user.title}</div>
                                    </div>
                                </div>
                                </>
                                )}
                            </div>
                        </div>
                    </Modal>
                )}
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
                                <div class={`edit-user-message-container ${isHidden[message.id] ? '' : 'hidden'} `}>
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