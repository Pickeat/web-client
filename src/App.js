import React from 'react';
import './App.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {HashRouter as BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
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
import RateYourGiver from "./route/RateYourGiver";
import DeleteAccount from "./route/DeleteAccount";
import Chat from "./route/Chat";
import IntroMobile from "./route/IntroMobile";
import {
    BrowserView,
    MobileView,
} from "react-device-detect";

toast.configure({
    autoClose: 4000,
    draggablePercent: 60,
    position: toast.POSITION.BOTTOM_CENTER,
    style: {zIndex: 9999, fontFamily: 'Colfax-Medium'},
});

const PrivateRoute = ({component: Component, ...rest}) => (
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
            <MobileView>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={IntroMobile}/>
                        <Route exact path="/intro" component={IntroMobile}/>
                    </Switch>
                </BrowserRouter>
            </MobileView>
            <BrowserView>
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
                            <Route exact path="/delete_account/:token" component={DeleteAccount}/>
                            <Route exact path="/reset_password/:token" component={ResetPassword}/>
                            <Route exact path="/reset-password" component={ResetPassword}/>
                            <PrivateRoute exact path="/add-product" component={AddProduct}/>
                            <PrivateRoute exact path="/product-list" component={ProductList}/>
                            <PrivateRoute exact path="/product/:id" component={Product}/>
                            <PrivateRoute exact path="/rate-your-giver/:id" component={RateYourGiver}/>
                            <PrivateRoute exact path="/chat" component={Chat}/>
                            <PrivateRoute exact path="/settings" component={Settings}/>
                            <PrivateRoute exact path="/profile" component={Profil}/>
                        </Switch>
                    </div>
                </BrowserRouter>
            </BrowserView>
        </div>
    );
}

//TODO: Faire les req API de Reservation sur la page product

export default App;
