import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
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
import { getUserDetails } from './services/usersService';
import { tools, themes, UserTools } from './hooks/useUser';
import About from './components/About';
import { CardProvider } from './context/CardContext';
import FavCards from './components/FavCards';
import MyCards from './components/MyCards';
import CardData from './components/CardData';








function App() {
  let [lightMode, setlightMode] = useState<boolean>(
    localStorage.getItem('LightMode') == "true" ? true : false
  );

  let [searchInput, setSearchInput] = useState<string>("");

  let [flag, setFlag] = useState<boolean>()

  let handleTheme = (flag: boolean) => {
    if (flag) {
      setlightMode(false)
      localStorage.setItem('LightMode', "false")
    } else {
      setlightMode(true)
      localStorage.setItem('LightMode', "true")
    }
  }

  useEffect(() => {

  }, [flag])


  return (
    <Provider store={store} >

      <div className="App" style={lightMode ? { color: themes.dark.color, background: themes.dark.background } : { color: themes.light.color, background: themes.light.background }} >

        <ToastContainer />
        <UserTools.Provider value={tools}>
          <CardProvider>
            <Router>
              <Navbar setInputRef={setSearchInput} inputRef={searchInput} setTheme={handleTheme} lightMode={lightMode} setFlag={setFlag} flag={flag} />
              <Routes>
                <Route path='/' element={<Cards searchInput={searchInput as string} />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/my-cards' element={<MyCards />}></Route>
                <Route path='/card-data/:cardId' element={<CardData />}></Route>
                <Route path='/fav-cards' element={<FavCards searchInput={searchInput as string} />}></Route>
                <Route path='*' element={<PageNotFound />}></Route>
              </Routes>
              <Footer />
            </Router>
          </CardProvider>
        </UserTools.Provider>
      </div>

    </Provider>);
}

export default App;
