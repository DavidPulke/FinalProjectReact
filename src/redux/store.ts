import { combineReducers } from "redux";
import { cardsReducer } from "./PostsState";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({ cardsState: cardsReducer });
const store = configureStore({ reducer });

export default store