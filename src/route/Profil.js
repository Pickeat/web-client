import React, {useEffect, useState} from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import getUserPublicInfoApi from '../api/getUserPublicInfoApi';
import setUserPublicInfoApi from '../api/setUserPublicInfoApi';
import Avatar from "@material-ui/core/Avatar";
import Logo from "../assets/logo.png";
import Typography from "@material-ui/core/Typography";
import {PickeatTextField} from "../components/PickeatTextField";
import Background from "../components/Background";
import backgroundSrc from "../assets/wallpaper-login.jpg";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles(theme => ({
    main: {
        paddingTop: '5rem',
        boxSizing: 'border-box',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftSection: {
        height: '100%',
        width: '20%',
        display: 'flex',
        flexDirection: 'column',
    },
    menuSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    rightSection: {
        height: '100%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    mainContentSection: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    menuButtonContainer: {
        width: '100%',
        height: '75px'
    },
    menuButton: {
        border: 'solid 1px #d6d6d6',
        borderTop: 'none',
        width: '100%',
        height: '100%',
        textTransform: 'none',
        fontFamily: 'Colfax-Regular',
        fontSize: '14px',
        justifyContent: 'normal'
    },
    menuButtonText: {
        position: 'absolute',
        left: '22%',
        lineHeight: '0px',
    },
    menuButtonSelected: {
        position: 'absolute',
        left: '85%',
        width: '7%'
    }
}));

export default function Profil(props) {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [currentUserData, setCurrentUserData] = useState();


    useEffect(() => {
        getUserPublicInfoCall()
    }, []);

    const getUserPublicInfoCall = () => {
        setIsLoading(true);
        getUserPublicInfoApi().then((response) => {
            setCurrentUserData(response);
            setIsLoading(false);
            console.log(currentUserData)
        });
    }

    const setUserPublicInfoCall = (newName, newDescription) => {
        setUserPublicInfoApi(newName, newDescription).then((response) => {

        });
    }


    const buildPaper = () => {
        if (isLoading) {
            return (
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress/>
                </div>
            );
        } else {
            return (
                <>
                    <Avatar className={classes.avatar}>
                        <img style={{ maxWidth: '100%', maxHeight: '100%'}} alt="PickEat Logo" src={Logo}/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Info : {currentUserData['name']}
                    </Typography>
                    <form className={classes.form}>
                        <PickeatTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label={currentUserData.name}
                            name="labelname"
                            autoComplete="name"
                            autoFocus
                            value={newName}
                            onChange={(event => setNewName(event.target.value))}
                        />
                        <PickeatTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="desciption"
                            label={currentUserData.description}
                            desciption="labeldesciption"
                            autoComplete="desciption"
                            autoFocus
                            value={newDescription}
                            onChange={(event => setNewDescription(event.target.value))}
                        />
                        <Button
                            style={{width: '50%'}}
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setUserPublicInfoCall(newName, newDescription)
                            }}
                            className="pickeatBtn"
                        >
                            Edit
                        </Button>
                    </form>
                </>
            )
        }
    }


    return (
        <div className={classes.main}>
            <Background src={backgroundSrc}/>
            <Paper elevation={24} className={classes.container}>
                {buildPaper()}
            </Paper>
        </div>
    );
}
