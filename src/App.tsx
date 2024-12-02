import React, { useState } from 'react';
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





function App() {
  let [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('dark') == "true" ? true : false
  );

  let handleTheme = (flag: boolean) => {
    if (flag) {
      setDarkMode(false)
      localStorage.setItem('dark', "false")
    } else {
      setDarkMode(true)
      localStorage.setItem('dark', "true")
    }
  }

  return (
    <Provider store={store} >
      <div className="App" style={darkMode ? { color: themes.dark.color, background: themes.dark.background } : { color: themes.light.color, background: themes.light.background }} >
        <ToastContainer />
        <Router>
          <Navbar setTheme={handleTheme} darkMode={darkMode} />
          <Routes>
            <Route path='/' element={<Cards />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>

            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </Provider>);
}

export default App;
