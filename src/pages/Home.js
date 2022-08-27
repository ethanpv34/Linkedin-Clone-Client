import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import '../App.css';
import { reset } from '../features/user/userSlice';


const Home = () => {

    const { user, isLoading } = useSelector((state) => state.user);
    // const user = JSON.parse(localStorage.getItem("user"));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            console.log('User logged out')
            navigate("/login")
        };

        return () => {
            dispatch(reset())
        };

    }, [user, navigate, dispatch]);

    if(isLoading) {
        return (
            <h1>Loading...</h1>
        )
    };

    return (
        <div className="app">
            <Header />
            <div className="app__body">             
                <Sidebar />
                <Feed />
                <Widgets />
            </div>
        </div>
    )
};

export default Home;