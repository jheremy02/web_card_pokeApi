import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';
import Hero from './components/Hero';
import About from './components/About';

import { useState } from "react";
import DarkModeContext from "./components/DarkModeContext";

function App() {

  const [isDarkMode,setDarkMode]=useState(true);

  function handleModeDark () {
    setDarkMode(!isDarkMode)
  }


  return (
    <div className={`App ${isDarkMode?"dark":""}`}>
     
     <DarkModeContext.Provider value={{isDarkMode, handleModeDark}}>
        <Header></Header>
        <Hero></Hero>
        <About></About>
        <Characters></Characters>
      </DarkModeContext.Provider>
     
    </div>
  );
}

export default App;
