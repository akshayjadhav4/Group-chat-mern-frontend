import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarChat from "../SidebarChat/SidebarChat";
import Pusher from "pusher-js";
import api from "../../api/index";
import { useStateValue } from "../../contextApi/StateProvider";
import { auth } from "../../firebase/firebase";
import { actionTypes } from "../../contextApi/reducer";
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  //loading all rooms from db
  useEffect(() => {
    api.get("/api/room/all").then((response) => setRooms(response.data));
  }, []);

  var [{ user }, dispatch] = useStateValue();
  user = JSON.parse(localStorage.getItem("userInfo"));

  // getting real-time rooms
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("rooms");
    channel.bind(
      "inserted",
      (newRoom) => setRooms([...rooms, newRoom]) //adding new room to rooms
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.length > 0 ? (
          rooms.map((room) => <SidebarChat room={room} key={room._id} />)
        ) : (
          <p className="sidebar__message">No Room found.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
