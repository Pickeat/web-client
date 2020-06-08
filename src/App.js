import React from 'react';
import './App.css';
import {HashRouter, Route} from 'react-router-dom';
import SignIn from "./route/SignIn";

function App() {
    return (
        <HashRouter>
            <Route path="/sign-in" component={SignIn}/>
        </HashRouter>
    )
}

export default App;
