import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Pusher from "pusher-js";
import api from "./api/index";
function App() {
  const [messages, setMessages] = useState([]);
  //loading all messages from db
  useEffect(() => {
    api
      .get("/api/messages/sync")
      .then((response) => setMessages(response.data));
  }, []);

  // getting real-time messages
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) =>
      setMessages([...messages, newMessages]) //adding new messages to messages
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
