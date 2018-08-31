import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import App from "./Component/App";
import Reducers from "./Reducer";
import reduxThunk from "redux-thunk";

const store = createStore(Reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
console.log(process.env.REACT_APP_STRIPE_KEY);
console.log(process.env.NODE_ENV);
