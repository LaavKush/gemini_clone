// Dropdown.jsx
import React, { useContext } from "react";
import "./dropdown.css";
import { FaUser, FaStar, FaLink } from "react-icons/fa";
import { Context } from "../../Context/Context";

const Dropdown = () => {
  const { darkMode, toggleDarkMode } = useContext(Context);

  return (
    <div className={`dropdown-wrapper ${darkMode ? "dark" : ""}`}>
      <div className="dropdown">
        <div className="dropdown-item">
          <FaUser className="icon" />
          <span>Saved info</span>
          <span className="dot" />
        </div>

        <div className="dropdown-item">
          <FaStar className="icon" />
          <span>Apps</span>
          <span className="dot" />
        </div>

        <div className="dropdown-item">
          <FaLink className="icon" />
          <span>Your public links</span>
        </div>

        <div className="dropdown-item" onClick={(e) => e.stopPropagation()}>
          <span className="icon-toggle-label">Dark theme</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <span className="slider" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
