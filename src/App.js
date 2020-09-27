import React from 'react';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import SignIn from './route/SignIn';
import SignUp from './route/SignUp';
import Intro from './route/Intro';
import Product from './route/Product';
import isAuth from './helpers/isAuth';

toast.configure({
  autoClose: 4000,
  draggablePercent: 60,
  position: toast.POSITION.BOTTOM_CENTER,
  style: { zIndex: 9999, fontFamily: 'Colfax-Medium' },
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuth()) {
        return <Redirect to="/sign-in"/>;
      } else {
        return (
          <div>
            <Component {...props}/>
          </div>
        );
      }
    }}
  />
);

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavigationBar/>
        <div>
          <Switch>
            <Route exact path="/" component={Intro}/>
            <Route exact path="/intro" component={Intro}/>
            <Route exact path="/sign-in" component={SignIn}/>
            <Route exact path="/sign-up" component={SignUp}/>
            <PrivateRoute exact path="/product/:id" component={Product}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
