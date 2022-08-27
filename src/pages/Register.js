import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { register, reset } from "../features/user/userSlice";
import "./Login.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const { user, isSuccess, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user || isSuccess) {
      navigate("/")
    };
    return () => {
      dispatch(reset())
    };
  }, [user, isSuccess, dispatch, navigate]);

  const registerUser = (e) => {
    if(!email || !name || !password) return;
    e.preventDefault();
    const data = {
      fullName: name,
      email,
      password
    };
    dispatch(register(data));
  };

  if(isLoading) {
    return (
      <h1>Loading...</h1>
    )
  };
  
  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
      />

      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          type="text"
        />

        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          placeholder="Profile pic URL (optional)"
          type="text"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />

        <button type="submit" onClick={registerUser}>
          Sign Up
        </button>
      </form>

      <p>
        Already a member?{" "}
        <span className="login__register">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
}

export default Register;