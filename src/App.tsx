import React, { createContext, useContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';

let themes = {
  light: {
    color: "#fff",
    background: "#191919"
  },
  dark: {
    color: "#000",
    background: "#fff"
  }
}

let tools = {
  themes: themes,
  user: { loggedIn: localStorage.token !== undefined ? true : false }
}


export const UserTools = createContext(tools)


function App() {
  let [lightMode, setlightMode] = useState<boolean>(
    localStorage.getItem('dark') == "true" ? true : false
  );

  let [loggedIn, setLoggedIn] = useState<boolean>(localStorage.token !== null ? true : false)

  let handleTheme = (flag: boolean) => {
    if (flag) {
      setlightMode(false)
      localStorage.setItem('LightMode', "false")
    } else {
      setlightMode(true)
      localStorage.setItem('LightMode', "true")
    }
  }

  return (
    <Provider store={store} >
      <div className="App" style={lightMode ? { color: themes.dark.color, background: themes.dark.background } : { color: themes.light.color, background: themes.light.background }} >
        <ToastContainer />
        <UserTools.Provider value={tools}>
          <Router>
            <Navbar setTheme={handleTheme} lightMode={lightMode} />
            <Routes>
              <Route path='/' element={<Cards />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='*' element={<PageNotFound />}></Route>
            </Routes>
            <Footer />
          </Router>
        </UserTools.Provider>
      </div>
    </Provider>);
}

export default App;
