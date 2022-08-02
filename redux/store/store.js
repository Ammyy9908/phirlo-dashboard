import {createStore,compose, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {createLogger} from "redux-logger"
import AppReducer from "../reducers/_appReducer"

import { composeWithDevTools } from "redux-devtools-extension";

// CREATE A LOGGER

const logger = createLogger();
const middlewares = [thunk, logger];

const configureStore = ()=>{
   const store = createStore(
      combineReducers({
         appReducer:AppReducer
      })
      ,
      composeWithDevTools(applyMiddleware(...middlewares))
   )
   return store
}

export default configureStore;