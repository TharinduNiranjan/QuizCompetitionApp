import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./configureStore";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register({
  onUpdate: (registration) => {
    alert("New version available!  Ready to update?");
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  },
});

// function registerSW() {
//   if (window.location.hostname === "localhost") return;
//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("/sw-prod.js").catch((e) => {
//       console.log("Registration fail: ", e);
//     });
//   }
// }
// registerSW();
