import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./App";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './scripts';

const store = createStore(rootReducer, {});

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
