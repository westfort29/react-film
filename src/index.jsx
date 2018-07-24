import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./App";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
