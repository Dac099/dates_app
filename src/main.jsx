import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { ConnectionsContext } from './context/connections';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConnectionsContext>
      <App />
    </ConnectionsContext>
  </React.StrictMode>,
)
