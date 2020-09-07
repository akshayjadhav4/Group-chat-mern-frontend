import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Pusher from "pusher-js";
import api from "./api/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
    channel.bind(
      "inserted",
      (newMessages) => setMessages([...messages, newMessages]) //adding new messages to messages
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Router>
          {/* Sidebar */}
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              {/* Chat */}
              <Chat messages={messages} />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
