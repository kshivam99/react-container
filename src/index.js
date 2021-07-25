import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TabsProvider } from "./reducer/tabsReducer";

ReactDOM.render(
  <React.StrictMode>
    <TabsProvider>
    <App />
    </TabsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
