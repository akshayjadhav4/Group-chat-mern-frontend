import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Message from "../Message/Message";
import api from "../../api/index";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";

function Chat() {
  // getting (roomId)param from url
  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");

  // storing messages
  const [messages, setMessages] = useState([]);

  // input for new messages
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await api.post("/api/messages/new", {
      roomId: roomId,
      message: input,
      name: "Random User",
      timeStamp: new Date().toUTCString(),
    });
    setInput("");
  };

  //loading all messages from db
  useEffect(() => {
    api
      .get("/api/messages/sync", {
        params: {
          roomId: roomId,
        },
      })
      .then((response) => setMessages(response.data));
  }, [roomId]);

  // getting real-time messages
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe(roomId);
    channel.bind(
      "inserted",
      (newMessages) => setMessages([...messages, newMessages]) //adding new messages to messages
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, roomId]);

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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
