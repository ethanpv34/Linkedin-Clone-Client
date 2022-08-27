import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, deletePost, getPosts, reset } from "../features/posts/postSlice";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import InputOption from "./InputOption";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import { Avatar } from "@mui/material";
import Post from "./Post";
import FlipMove from "react-flip-move";
import { posts } from '../constants/posts';
import axios from "axios";

function Feed() {
  const [input, setInput] = useState("");
  const [bruteForcePostsFromServer, setBruteForcePostsFromServer] = useState([]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());

  //   return () => {
  //     dispatch(reset())
  //   }
  // }, [dispatch]);

  useEffect(() => {
    bruteForceRetrieve();
  }, []);

  const bruteForceRetrieve = () => {
    axios.get("https://linkedin-backend-heroku.herokuapp.com/api/posts").then((res) => {
      setBruteForcePostsFromServer(res.data);
    });
  };

  const handleCreatePost = (e) => {
    if(!input) return;
    e.preventDefault();
    const data = {
      message: input,
      description: user.email.split('@')[0]
    };
    dispatch(createPost(data));
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={handleCreatePost}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button type="submit">
              Post
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/* Posts from server*/}
      <FlipMove>
        {bruteForcePostsFromServer?.slice(0).reverse().map((post) => (
          <>
            <Post 
              key={post.id}              
              name={post.name}
              description={post.description}
              message={post.message}
              photoUrl={null}
              avatar={false}              
            />
          </>
        ))}
      </FlipMove>
      {/* Posts */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            name={post.name}
            description={post.description}
            message={post.message}
            photoUrl={post.photoUrl}
            avatar={true}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
