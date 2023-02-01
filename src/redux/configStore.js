import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";

const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
