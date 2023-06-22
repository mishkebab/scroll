const SET_MESSAGES = "/messages/setMessages"
const SET_MESSAGE = "/messages/setMessage"

const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages
})

const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message
})


export const fetchMessages = () => async(dispatch) => {
    const res = await fetch('/api/messages')
    const data = await res.json();
    dispatch(setMessages(data));
}

export const createMessage = (messageData) => async(dispatch) => {
    const res = await fetch('/api/messages', {
        method: "POST",
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

const messagesReducer = (state={}, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return action.payload
        case SET_MESSAGE:
            return { ...state, [action.payload.id]: action.payload}
        default:
            return state
    }
}

export default messagesReducer;