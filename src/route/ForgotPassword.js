import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {PickeatTextField} from '../components/PickeatTextField';
import forgotPasswordApi from "../api/forgotPasswordApi";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        width: '40%',
    },
    avatar: {
        backgroundColor: 'transparent',
        height: 'auto',
        width: '15%',
        marginBottom: '2%'
    },
    form: {
        width: '70%', // Fix IE 11 issue.
        height: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-evenly",
    },
}));

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);


    const buildPaper = () => {
        if (!emailSent) {
            return (
                <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Mot de passe oublié</h2>
                </div>
          
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                value={email}
                                onChange={(event => setEmail(event.target.value))}
                                />
                            </div>
                        </div>
                        <div className='pt-2'>
                        <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  forgotPasswordCall(email)
              }}
              >
                Changer mon mot de passe
              </button>
                        </div>

                    </form>
                    </div>
                </div>
                </div>
            )
        } else {
            return (
                <>
                    <Avatar className={classes.avatar}>
                        <img style={{maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Email Sent !
                    </Typography>
                </>
            )
        }
    }

    const forgotPasswordCall = (email) => {
        setEmailSent(true);
        forgotPasswordApi(email).then((response) => {
            console.log(response);
        });
    };

    return (
       buildPaper()
    );
}
