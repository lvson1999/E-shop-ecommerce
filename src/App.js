import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import MenuAcc from './components/Account/MenuAcc';
import Update from './components/Account/MemberAccount/Update';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import MenuLeft from './components/Layout/MenuLeft';
import {UserContext} from './UserContext';
import { useState } from 'react';

function App(props) {
  let params1 = useLocation();
  const [data, setData] = useState("")
  let themes = 123;
  function testContext(tongqty) {
    // console.log(tongqty);
    setData(tongqty);
  }

  // console.log(data)

  // let input = localStorage.setItem("input", JSON.stringify(data))

  return (
    <>
      <UserContext.Provider value={{
        themes: themes, 
        testContext: testContext,
        data: data
      }}>
        <Header/>
          <section>
            <div className='container'>
              <div className='row'>
                {params1['pathname'].includes("cart") ? "" : (params1['pathname'].includes("account") ? <MenuAcc /> : <MenuLeft />)}
                {/* <MenuLeft/> */}
                {props.children}
              </div>
            </div>
          </section>
        <Footer/>
      </UserContext.Provider>
      
    </>
  );
}

export default App;
