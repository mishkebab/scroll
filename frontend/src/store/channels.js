import csrfFetch from "./csrf"

const SET_CHANNELS = "channels/setChannels"

const setChannels = (channels) => ({
    type: SET_CHANNELS,
    payload: channels
})

export const fetchChannels = () => async(dispatch) => {
    const res = await csrfFetch('/api/channels')
    const data = await res.json()
    dispatch(setChannels(data))
}

const channelsReducer = (state={}, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return action.payload
        default:
            return state
    }
}

export default channelsReducer;