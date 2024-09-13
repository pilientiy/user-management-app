import React from 'react';
import ReactDOM from 'react-dom/client'; // Імпортуємо createRoot з react-dom/client
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Імпортуємо Provider
import { store } from './store';         // Імпортуємо сховище

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Створюємо корінь
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
