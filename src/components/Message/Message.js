import React from "react";
import "./Message.css";
function Message({ isSender }) {
  return (
    <div className="message">
      <p className={`message__body ${isSender && "message__body--sender"}`}>
        <span className="message__name">Akshay</span>
        This is a message
        <span className="message__timestamp">{new Date().toUTCString()}</span>
      </p>
    </div>
  );
}

export default Message;
