import { Avatar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import "./Post.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import InputOption from "./InputOption";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const Post = forwardRef(({ name, description, message, photoUrl, avatar }, ref) => {

  const [isLiked, setIsLiked] = useState(false);

  return (
    <div ref={ref} className="post">
      <div className="post__header">
        {avatar ? 
        <Avatar src={photoUrl}>{name[0]}</Avatar> :
        <Avatar></Avatar>}
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>

      <div className="post__buttons">
        <div onClick={() => setIsLiked(!isLiked)}>
          { isLiked ? <InputOption Icon={ThumbUpAltIcon} title="Like" color="blue" action={null} /> : <InputOption Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray" action={null} />}
        </div>
        <InputOption Icon={ChatOutlinedIcon} title="Comment" color="gray" action={null} />
        <InputOption Icon={ShareOutlinedIcon} title="Share" color="gray" action={null} />
        <InputOption Icon={SendOutlinedIcon} title="Send" color="gray" action={null} />
      </div>
    </div>
  );
});

export default Post;