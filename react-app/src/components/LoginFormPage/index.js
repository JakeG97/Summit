import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";

import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoClick = () => {
    dispatch(login("demo@aa.io", "password"));
    history.push("/");
  };

  return (
    <div className="login-main">
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <label className="login-form-label" htmlFor="email">Sign in with account email</label>
          <input className={errors.length ? "signup-form-label error-border" : "signup-form-label"} id="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label className="login-form-label" htmlFor="password">Password</label>
          <input className={errors.length ? "signup-form-label error-border" : "signup-form-label"} id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          <label className="remember-me">
            <input type="checkbox"></input>
            Remember me
          </label>
          <button type="submit">Sign in</button>
          <ul className="login-form-errors" >
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <Link to="/demo" className="cant-sign-in" onClick={handleDemoClick}>Help, I can't sign in</Link>
        </form>
        <aside className="guest-login">
          <h2 className="login-form-label">Sign in as guest</h2>
          <div>
          <i class="fa fa-user"></i>
            <p>Just testing things out? Feel free to give our demo user a try!</p>
          </div>
          <button onClick={handleDemoClick}>Let's do it!</button>
        </aside>
      </div>
    </div>
  );
}

export default LoginFormPage;
