import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import { useStateValue } from "./contextApi/StateProvider";
function App() {
  var [{ user }] = useStateValue();
  user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            {/* Sidebar */}
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                {/* Chat */}
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
