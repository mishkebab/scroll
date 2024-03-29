import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const SET_USER_CHANNEL = 'session/setUserSub';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => {
    // debugger
    return {
    type: SET_CURRENT_USER,
    payload: user
    };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

export const setCurrentUserChannels = (channel) => {
    return {
        type: SET_USER_CHANNEL,
        channel
    }
}

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const fetchUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch(setCurrentUser(data));
    return response;
}


export const login = ({ email, password }) => async dispatch => {
    // debugger
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const signup = ({ email, password, display_name, title }) => async dispatch => {
    // debugger
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password, display_name, title })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const update = ({ userId, display_name, title }) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({ display_name, title })
    });
    const data = await response.json();
    dispatch(setCurrentUser(data.user));
    return response;
};

export const logout = () => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE",
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};

export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

const initialState = { 
user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
    // debugger
    switch (action.type) {
    case SET_CURRENT_USER:
        return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
        return { ...state, user: null };
    case SET_USER_CHANNEL:
        const newState = {...state};
        newState.user.channels[action.channel.id] = action.channel;
        return newState;
    default:
        return state;
    }
};

export default sessionReducer;