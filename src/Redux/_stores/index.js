import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../_reducers'
import logger from "redux-logger";
import thunk from "redux-thunk";

const Store = configureStore({reducer:rootReducer,middleware:[thunk,logger]})
export default Store