import csrfFetch from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
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

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}


export const login = ({ email, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

export const signup = ({ email, password, full_name, title }) => async dispatch => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ email, password, full_name, title })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
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
    switch (action.type) {
    case SET_CURRENT_USER:
        return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
        return { ...state, user: null };
    default:
        return state;
    }
};

export default sessionReducer;