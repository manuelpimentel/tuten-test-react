import React from 'react';
import './App.css';
import NavBar from './components/shared/navBar';
import Home from './components/pages/home';

function App() {
    return (
        <React.Fragment>
            <NavBar />
            <Home />
        </React.Fragment>
    );
}

export default App;
