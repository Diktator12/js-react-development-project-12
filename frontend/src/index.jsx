/* eslint-disable functional/no-expression-statement */
import ReactDOM from 'react-dom/client';
import init from './i18next.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './app/store.js';
import App from './App.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

app();