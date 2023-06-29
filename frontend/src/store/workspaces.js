import csrfFetch from "./csrf";

const SET_WORKSPACES = 'workspaces/setWorkspaces';
const SET_WORKSPACE = 'workspaces/setWorkspace';


const setWorkspaces = (workspaces) => {
    return {
    type: SET_WORKSPACES,
    payload: workspaces
    };
};

const setWorkspace = (workspace) => {
    return {
    type: SET_WORKSPACE,
    payload: workspace
    };
};

export const fetchWorkspaces = () => async (dispatch) => {
    const response = await csrfFetch('/api/workspaces/')
    const data = await response.json();
    console.log(data)
    dispatch(setWorkspaces(data))
}

export const fetchWorkspace = (workspaceId) => async(dispatch) => {
    const response = await csrfFetch(`/api/workspaces/${workspaceId}`)
    const data = await response.json();
    dispatch(setWorkspace(data))
}

const workspacesReducer = (state={}, action) => {
    switch (action.type) {
        case SET_WORKSPACES:
            return action.payload
        case SET_WORKSPACE:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state
    }
}

export default workspacesReducer;