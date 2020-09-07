import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat }) {
  const createNewRoom = () => {
    const roomName = prompt("Please enter name for room");
    if (roomName) {
      // database work
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room Name</h2>
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
