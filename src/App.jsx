// App.jsx
import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import "./index.css";
import ContextProvider from "./Context/Context";

const App = () => {
  return (
    <ContextProvider>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <Main />
    </ContextProvider>
  );
};

export default App;
