import csrfFetch from "./csrf"
import { setMessages } from "./messages"

const SET_DM = "dms/setDM"
const SET_DMS = "dms/setDMs"

const setDM = (dm) => ({
    type: SET_DM,
    dm
})

const setDMs = (dms) => ({
    type: SET_DMS,
    dms
})

export const fetchDM = (workspaceId, dmId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/dms/${dmId}`)
    const data = await res.json()
    console.log(data)
    dispatch(setDM(data.dm))
    dispatch(setMessages(data.messages))
}

export const fetchDMs = (workspaceId) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/dms`)
    const data = await res.json()
    dispatch(setDMs(data))
}

export const createDM = (workspaceId, dmData) => async(dispatch) => {
    const res = await csrfFetch(`/api/workspaces/${workspaceId}/dms`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dmData)
    })
    if (res.ok) {
        // debugger
        const newDM = await res.json();
        dispatch(setDM(newDM))
    }
}

const dmsReducer = (state={}, action) => {
    switch (action.type) {
        case SET_DMS:
            return action.dms
        case SET_DM:
            return { ...state, [action.dm.id]: action.dm }
        default:
            return state
    }
}

export default dmsReducer;