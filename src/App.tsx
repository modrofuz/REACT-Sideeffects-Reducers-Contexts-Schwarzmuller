import React, {useEffect, useState} from 'react';

import './App.css';
import {Home} from "./components/Home/Home";
import {Login} from "./components/Login/Login";
import {MainHeader} from "./components/MainHeader/MainHeader";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isLoggedUser = localStorage.getItem('isLoggedIn') === '1';
    useEffect(() => {
        if (isLoggedUser) {
           setIsLoggedIn(isLoggedUser);
        }
    },[isLoggedUser])


    function onLogoutHandler() {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', '0');

    }

    function onLoginHandler(formContent: any/*email: string, password: string*/) {
        console.log(formContent);
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true)
    }

    return (
        <>
            <MainHeader isAuthenticated={isLoggedIn} onLogout={onLogoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={onLoginHandler}/>}
                {isLoggedIn && <Home onLogout={onLogoutHandler}/>}
            </main>
        </>
    );
}

export default App;
