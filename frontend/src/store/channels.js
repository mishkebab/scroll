import csrfFetch from "./csrf"
import { setMessages } from "./messages"

const SET_CHANNEL = "channels/setChannel"
const SET_CHANNELS = "channels/setChannels"

const setChannel = (channel) => ({
    type: SET_CHANNEL,
    channel
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

export const fetchChannels = (workspaceId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/channels`)
    const data = await res.json()
    dispatch(setChannels(data))
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