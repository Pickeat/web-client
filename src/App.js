import React from 'react';
import './App.css';
import { HashRouter as BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './route/SignIn';
import SignUp from './route/SignUp';
import Intro from './route/Intro';
import Product from './route/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Intro}/>
          <Route exact path="/intro" component={Intro}/>
          <Route exact path="/sign-in" component={SignIn}/>
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/product/:id" component={Product}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
