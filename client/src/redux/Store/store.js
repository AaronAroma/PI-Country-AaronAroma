// store.js
import { createStore, applyMiddleware } from "redux";
import reducer from "../Reducer/reducer.js";
import thunkMiddleware from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;