import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { changeURLMiddleware } from "../middleware/changeURL";
import rootReducer from "../reducers";
// import { loggingMiddleware } from "../middleware/logActions";
import { keepScatterplotStateInSync } from "../middleware/scatterplot";

const middleware = [
  thunk,
  keepScatterplotStateInSync,
  changeURLMiddleware,
  // loggingMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const store = createStore(rootReducer, composedEnhancers);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  // console.log("hot reducer reload");
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers/index'); 
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
