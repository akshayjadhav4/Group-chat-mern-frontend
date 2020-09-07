import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import api from "../../api/index";

function SidebarChat({ addNewChat, room }) {
  const createNewRoom = async () => {
    const roomName = prompt("Please enter name for room");
    if (roomName) {
      await api.post("/api/room/new", {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>{room.name}</h2>
        <p>This is the last message</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createNewRoom}>
      <div className="sidebarChat__info">
        <h2>Add New Room </h2>
      </div>
    </div>
  );
}

export default SidebarChat;
