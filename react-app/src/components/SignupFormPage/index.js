import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let errors = [];
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Must be a valid email');
    }
  
    const captchaCheckbox = document.querySelector('input[type="checkbox"]');
    if (!captchaCheckbox.checked) {
      errors.push('User must prove he is not a robot');
    }
  
    const agreementCheckbox = document.querySelector('.agreement-wrapper input[type="checkbox"]');
    if (!agreementCheckbox.checked) {
      errors.push('User must prove they are an adult that can follow rules');
    }
  
    if (password !== confirmPassword) {
      errors.push('Confirm Password field must be the same as the Password field');
    }
  
    if (username.length > 20) {
      errors.push('Username must be 20 characters or less');
    }
  
    if (errors.length > 0) {
      setErrors(errors);
      return;
    }
  
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, profilePicture, password, confirmPassword));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };
  
  
  
  

  return (
    <div className="signup-main">
      <section className="signup-background"></section>
      <section className="signup-form-box">
        {errors.length > 0 && (
          <ul className="signup-errors">
            {errors.map((error) => (
              <li key={error}>{error}.</li>
            ))}
          </ul>
        )}
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <label htmlFor="email">Email Address</label>
          <input
            className={
              errors.length
                ? "signup-label error-border"
                : "signup-form-label"
            }
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">Username</label>
          <input
            className={
              errors.length
                ? "signup-label error-border"
                : "signup-form-label"
            }
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="(max 20 charaters)"
          />
          <label htmlFor="profile_picture">Profile Picture</label>
          <input
            className={
              errors.length
                ? "signup-label error-border"
                : "signup-form-label"
            }
            id="profile_picture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            placeholder="(Optional)"
          />
          <label htmlFor="password">Password</label>
          <input
            className={
              errors.length
                ? "signup-label error-border"
                : "signup-form-label"
            }
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={
              errors.length
                ? "signup-label error-border"
                : "signup-form-label"
            }
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <div className="captcha-wrapper">
            <label>
              <input type="checkbox"></input>
              I'm not a robot... I'm Hal
            </label>
            <div className="captcha-logo-wrapper">
              <i className="fa-solid fa-shield-check"></i>
              <h3>reCAPTCHA</h3>
              <h4>Privacy - Terms</h4>
            </div>
          </div>
          <label className="agreement-wrapper">
            <input type="checkbox"></input>
            I am 13 years of age or older and agree to the terms of the Summit Subscriber Agreement and the{" "}
            <span style={{ display: "block" }}>Gularte Privacy Policy.</span>
          </label>
          <button type="submit">Continue</button>
        </form>
      </section>
    </div>
  ); 
}

export default SignupFormPage;
