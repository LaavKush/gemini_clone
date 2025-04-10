import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App.jsx';
import './index.css';
import ContextProvider from './Context/Context.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
