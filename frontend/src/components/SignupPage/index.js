import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './SignupForm.css'

function SignupForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [display_name, setDisplayName] = useState('')
    const [errors, setErrors] = useState([])

    if (sessionUser) return <Redirect to="/" />

    const handleSubmit = (e) => {
        // debugger
        e.preventDefault();

        setErrors([]);
        return dispatch(sessionActions.signup({ email, password, display_name, title }))
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

    const loginDemo = () => {
        dispatch(sessionActions.login({ email: "hermione@hogwarts.edu", password:"password" }));
    }

    return (
        <>
            <div class="form-container">
                <h1 class="form-heading">Sign up for Scroll</h1>
                <p class="form-subheading">We suggest using the <strong>email address you use at work.</strong></p>
                <form class="form-container" onSubmit={handleSubmit}>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <label>
                        <input class="signup-form-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@work-email.com" required/>
                    </label>
                    <label>
                        <input class="signup-form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" required/>
                    </label>
                    <label>
                        <input class="signup-form-input" value={display_name} onChange={(e) => setDisplayName(e.target.value)} placeholder="display name" required/>
                    </label>
                    <label>
                        <input class="signup-form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title (optional)"/>
                    </label>
                    <button type="submit" class="signup-form-button">Sign up with Email</button>
                </form>
                <span class="span-or">or</span>
                <button class="signup-form-button" onClick={loginDemo}>Try a Demo</button>
            </div>
        </>
    )
}

export default SignupForm