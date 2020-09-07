import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "../Message/Message";
function Chat({ messages }) {
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen 05:15PM</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <Message message={message} key={message._id} />
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit" onClick={() => {}}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
