// Sidebar.jsx
import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
import Dropdown from "../dropdown/dropdown";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    darkMode,
  } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${darkMode ? "dark" : ""}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={darkMode ? assets.menu_icon_dark : assets.menu_icon}
          alt="Menu Icon"
        />

        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                onClick={() => loadPrompt(item)}
                className="recent-entry"
                key={index}
              >
                <img
                  src={darkMode ? assets.message_icon_dark : assets.message_icon}
                  alt="Message Icon"
                />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bottom">
        <div className="bottom-item">
          <img
            src={darkMode ? assets.question_icon_dark : assets.question_icon}
            alt="Question Icon"
          />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item">
          <img
            src={darkMode ? assets.history_icon_dark : assets.history_icon}
            alt="History Icon"
          />
          {extended && <p>Activity</p>}
        </div>

        <div
          className="bottom-item dropdown-container"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img
            src={darkMode ? assets.setting_icon_dark : assets.setting_icon}
            alt="Settings Icon"
          />
          {extended && <p>Settings</p>}
          {showDropdown && <div className="dropdown-wrapper"><Dropdown /></div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
