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
import ForgotPassword from "./route/ForgotPassword";
import ResetPassword from "./route/ResetPassword";
import ConfirmAccount from "./route/ConfirmAccount";
import ProductList from "./route/ProductList";
import Settings from './route/Settings';
import Profil from './route/Profil';
import AddProduct from "./route/AddProduct";

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
            <Route exact path="/forgot-password" component={ForgotPassword}/>
            <Route exact path="/confirm_account/:token" component={ConfirmAccount}/>
            <Route exact path="/reset-password/:token" component={ResetPassword}/>
            <Route exact path="/reset-password" component={ResetPassword}/>
            <PrivateRoute exact path="/add-product" component={AddProduct}/>
            <PrivateRoute exact path="/product-list" component={ProductList}/>
            <PrivateRoute exact path="/product/:id" component={Product}/>
            <PrivateRoute exact path="/settings" component={Settings}/>
            <PrivateRoute exact path="/profile" component={Profil}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

//TODO: faire marcher la req avec la photo post product
//TODO: ajouter la location du produits à la création envoyer location{lng, lat}
//TODO: ajouter un objet location{lng, lat} et un radius qui est en metres dans getProductList
//TODO: voir pour les disponibilités

export default App;
