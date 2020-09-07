import React from "react";
import "./Message.css";
function Message({ message, isSender }) {
  return (
    <div className="message">
      <p className={`message__body ${isSender && "message__body--sender"}`}>
        <span className="message__name">{message.name}</span>
        {message.message}
        <span className="message__timestamp">{message.timeStamp}</span>
      </p>
    </div>
  );
}

export default Message;
