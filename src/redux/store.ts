import { combineReducers } from "redux";
import { cardsReducer } from "./PostsState";
import { configureStore } from "@reduxjs/toolkit";
import { UsersReducer } from "./UsersState";

const reducer = combineReducers({ cardsState: cardsReducer, usersState: UsersReducer });
const store = configureStore({ reducer });

export default store