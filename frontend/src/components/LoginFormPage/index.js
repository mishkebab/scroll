import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import SlackIcon from "./../../assets/slack-icon.png"
import './loginForm.css'
import { useEffect } from 'react';
import DemoModal from '../DemoModal/DemoModal';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
      console.log("render")
    })

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                let data;
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                } catch {
                data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    const loginDemo = () => {
      dispatch(sessionActions.login({ email: "hermione@hogwarts.edu", password:"password" }));
    }

  return (
    <div class="form-container">
      <div class="signup-logo">
          <img src={SlackIcon} />
          <span class="slack-logo-name-home">scroll</span>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} id="login-form">
          <h1 className="form-heading">Sign in to Scroll</h1>
          <p className="form-subheading">We suggest using the <strong>email address you use at work.</strong></p>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <div className="login-page">
            <hr></hr>
          </div>
          <label>
            <input
              className="signup-form-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@work-email.com"
              required
            />
          </label>
          <br />
          <label>
            <input
              className="signup-form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </label>
          <br />
          <button type="submit" className="signup-form-button">Sign In With Email</button>
        </form>
        <span className="span-or">or</span>
        <DemoModal class="signup-form-button"/>
      </div>
    </div>
  );
}

export default LoginFormPage;