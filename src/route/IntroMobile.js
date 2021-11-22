import React, {useEffect} from 'react';
import logo from "../assets/logo.png";

export default function IntroMobile(props) {
    return (
        <div>
            <div className="flex flex-col h-screen justify-around items-center">
                <div className="w-32">
                    <img width="100%" src={logo} alt={'logo'}/>
                </div>
                <div className="textRegular text-center bg-green-900 text-white">
                    Hello ! Welcome on Pickeat website, you can either download our app on Android by clicking on this link or enjoy the website by going on your computer
                </div>
                <div className="w-48">
                    <a href='https://download-apk.pickeat.fr/'>
                        <img
                            style={{maxWidth: '100%', maxHeight: '100%'}}
                            alt='Get it on Google Play'
                            src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'
                        />
                    </a>
                </div>
                <div className="textRegular text-center bg-green-900 text-white">
                    The app is not available yet on IOS, coming soon !
                </div>
            </div>
        </div>
    );
}
