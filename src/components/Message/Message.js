import React from "react";
import "./Message.css";
function Message({ message }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="message">
      <p
        className={`message__body ${
          user.displayName === message.name && "message__body--sender"
        }`}
      >
        <span className="message__name">{message.name}</span>
        {message.message}
        <span className="message__timestamp">{message.timeStamp}</span>
      </p>
    </div>
  );
}

export default Message;
