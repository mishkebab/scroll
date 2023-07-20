import csrfFetch from "./csrf"
import { setMessages } from "./messages"
import { setCurrentUserChannels } from "./session"

const SET_CHANNEL = "channels/setChannel"
const SET_CHANNELS = "channels/setChannels"

const setChannel = (channel) => ({
    type: SET_CHANNEL,
    channel: channel
})

const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels
})

export const fetchChannel = (workspaceId, channelId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels/${channelId}`)
    const data = await res.json()
    dispatch(setChannel(data.channel))
    dispatch(setMessages(data.messages))
}

export const fetchUserChannel = (workspaceId, channelId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels/${channelId}`)
    const data = await res.json()
    dispatch(setCurrentUserChannels(data.channel))
}

// export const fetchUserChannels = (workspaceId) => async(dispatch) => {
//     const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`)
//     const data = await res.json()
//     dispatch(setChannels(data))
// }

export const fetchChannels = (workspaceId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`)
    const data = await res.json()
    dispatch(setChannels(data))
}

export const createChannel = (workspaceId, channelData) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(channelData)
    })
    if (res.ok) {
        // debugger
        const newChannel = await res.json();
        dispatch(setChannel(newChannel.channel))
    }
}

const channelsReducer = (state={}, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return action.payload
        case SET_CHANNEL:
            return { ...state, [action.channel.id]: action.channel }
        default:
            return state
    }
}

export default channelsReducer;