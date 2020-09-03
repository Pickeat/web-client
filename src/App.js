import React from 'react';
import './App.css';
import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './route/SignIn';
import Intro from './route/Intro';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/intro" component={Intro}/>
          <Route exact path="/sign-in" component={SignIn}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
