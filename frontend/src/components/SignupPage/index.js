import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [fullName, setFullName] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ email, password, title, fullName }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <label>
                Email
                <input value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                Password
                <input value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <label>
                Full Name
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
            </label>
            <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} required/>
            </label>
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignupForm