import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/user/userSlice';
import "./Login.css";
import { useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, isSuccess, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user || isSuccess) {
      navigate('/')
    };

    return () => {
      dispatch(reset())
    };
  }, [user, isSuccess, dispatch, navigate]);

  const handleLogin = (e) => {
    if (!email || !password) return;
    e.preventDefault();
    const data ={
      email,
      password
    };
    dispatch(login(data));
    setEmail('');
    setPassword('');
  }

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

        <button type="submit" onClick={handleLogin}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register">
          <Link to="/register">Register Now</Link>
        </span>
      </p>
    </div>
  );
}

export default Login;