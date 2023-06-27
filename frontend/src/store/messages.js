import csrfFetch from "./csrf"

const SET_MESSAGES = "/messages/setMessages"
const SET_MESSAGE = "/messages/setMessage"
const REMOVE_MESSAGE = "/messages/removeMessage"

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    messages
})

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    message
})

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId
})

export const fetchMessages = () => async(dispatch) => {
    const res = await fetch('/api/messages')
    const data = await res.json();
    dispatch(setMessages(data));
}

export const createMessage = (messageData) => async(dispatch) => {
    const res = await csrfFetch('/api/messages', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
    // console.log(res)
    // if (res.ok) {
    //     // debugger
    //     const newMessage = await res.json();
    //     dispatch(setMessage(newMessage))
    // }
}

export const editMessage = (messageData) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
    if (res.ok) {
        const newMessage = await res.json();
        dispatch(setMessage(newMessage))
    }
}

export const deleteMessage = (messageId) => async(dispatch) => {
    const res = await csrfFetch(`/api/messages/${messageId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(removeMessage(messageId));
    }
}

const messagesReducer = (state={}, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.messages
        case SET_MESSAGE:
            return { ...state, [action.message.id]: action.message}
        case REMOVE_MESSAGE:
            const newState = {...state}
            delete newState[action.messageId]
            return newState
        default:
            return state
    }
}

export default messagesReducer;