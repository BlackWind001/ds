import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const viewport = document.querySelector('meta[name="viewport"]');
const root = document.getElementById('root');

if (viewport && root) {
  const viewportWidth = root.getBoundingClientRect().width;

  if (viewportWidth < 1024) {
    viewport.setAttribute('content', 'width=1024, viewport-fit=contain');
  }
}

ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
