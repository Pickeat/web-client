import React, {useEffect, useState} from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button, Modal} from "@material-ui/core";
import getUserPublicInfoApi from '../api/getUserPublicInfoApi';
import setUserPublicInfoApi from '../api/setUserPublicInfoApi';
import getUserProductListApi from '../api/getUserOwnProductListApi';
import getUserReservedProductListApi from '../api/getUserOwnProductListApi';
import updateUserPictureApi from "../api/updateUserPicture";
import Typography from "@material-ui/core/Typography";
import {PickeatTextField} from "../components/PickeatTextField";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../components/ProductCard";
import ImageUploader from "react-images-upload";
import Background from "../components/Background";
import DispoModal from "../components/DispoModal";
import getMyReservedAnnounces from "../api/getMyReservedAnnounces";
import SaveIcon from '@material-ui/icons/Save';
import Rating from "@material-ui/lab/Rating";
import getUserMeApi from "../api/getUserMeApi";

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
        // height: '100%',
        width: '40%',
        // display: 'flex',
        // flexDirection: 'column',
    },
    userInfoContainer: {
        display: 'flex',
        // height: '100%',
        marginLeft: '5%',
        marginTop: '4%',
        paddingTop: '25%',
        paddingBottom: '30%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    showUserInfoContainer: {
        display: 'flex',
        width: '30%',
        borderRadius: '16px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: '#d3d3d3',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    formUserInfoContainer: {
        display: 'flex',
        width: '45%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    menuSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    announceListTitle: {
        fontFamily: 'Colfax-medium',
        height: '5%',
        display: 'flex',
    },
    profilePaper: {
      paddingTop: '20%',
        height: '70%',
    },
    gridContainer: {
        overflowY: 'scroll',
        height: '95%'
    },
    nothingToShow: {
        fontFamily: 'Colfax-Medium',
        fontSize: '25px',
        textAlign: 'center',
        color: 'white',
    },
    rightSection: {
        height: '100%',
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
    },
    productCard: {
        height: '100%',
        width: '100%',
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
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '30%',
    },
    productCardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        minWidth: '400px',
        height: '55%',
        width: '100%',
    },
    productListContainer: {
        margin: '2%',
        display: 'flex',
        width: '50%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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

    const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);
    const [isUserOwnProductsLoading, setIsUserOwnProductsLoading] = useState(true);
    const [isUserReservationProductsLoading, setIsUserReservationProductsLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [userProfilePicture, setUserProfilePicture] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [currentName, setCurrentName] = useState();
    const [currentNote, setCurrentNote] = useState(0);
    const [userAge, setUserAge] = useState();
    const [userGender, setUserGender] = useState();
    const [currentDescription, setCurrentDescription] = useState();
    const [userOwnProductList, setUserOwnProductList] = useState([]);
    const [userReservedProductList, setReservedUserProductList] = useState([]);
    const [showDispoModal, setShowDispoModal] = useState(false);
    const [userAvailability, setUserAvailability] = useState([]);



    useEffect(() => {
        getUserPublicInfoCall();
        getUserOwnProductListCall();
        getUserReservedProductListCall();
    }, []);

    const getUserPublicInfoCall = () => {
        setIsUserInfoLoading(true);
        getUserMeApi().then((response) => {
            console.log(response);
            setUserName(response.name);
            setCurrentNote(response.note);
            setUserDescription(response.description);
            setCurrentName(response.name);
            setCurrentDescription(response.description);
            setUserProfilePicture(response.image);
            setIsUserInfoLoading(false);
            setUserAvailability(response.availability);
            setUserAge(response.age);
            setUserGender(response.gender);
        });
    };

    const setUserPublicInfoCall = (newName, newDescription, age, gender) => {
        setUserPublicInfoApi(newName, newDescription, "", age, gender).then((response) => {
            getUserPublicInfoCall();
        });
    };

    const onDrop = (newPicture) => {
        updateUserPictureApi(newPicture).then((response) => {
            console.log("success");
        });
    }
    const getUserOwnProductListCall = () => {
        setIsUserOwnProductsLoading(true);
        getUserProductListApi().then((response) => {
            console.log("Own product");
            console.log(response);
            setUserOwnProductList(response);
            setIsUserOwnProductsLoading(false);
        });
    };
    const getUserReservedProductListCall = () => {
        setIsUserReservationProductsLoading(true);
        getMyReservedAnnounces(['given', 'reserved', 'waiting-for-reservation']).then((response) => {
            console.log("reserved product");
            console.log(response);
            setReservedUserProductList(response);
            setIsUserReservationProductsLoading(false);
        });
    };

    const buildUserInfo = () => {

        if (isUserInfoLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </div>
            );
        } else {
            return (
                <Paper className={classes.userInfoContainer}>
                    <div className={classes.showUserInfoContainer}>
                        <img style={{
                            width: '100%',
                            // height: 'auto',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px'
                        }}
                             src={(userProfilePicture ? `https://minio.pickeat.fr/minio/download/users/${userProfilePicture}?token=` : "https://img2.freepng.fr/20180319/aeq/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301e0d78f3.2971990915214960940552.jpg")}
                             alt={'profile_picture'}/>
                        <ImageUploader
                            withIcon={false}
                            withLabel={false}
                            buttonText="Change picture"
                            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                            maxFileSize={5242880}
                            singleImage={true}
                            onChange={onDrop}
                        />
                        <Typography style={{
                            paddingTop: '5%',
                            paddingRight: '5%',
                            paddingLeft: '5%',
                            textTransform: 'capitalize'
                        }}>
                            {currentName},
                        </Typography>
                        <Typography style={{paddingTop: '5%', paddingRight: '5%', paddingLeft: '5%'}}>
                            {currentDescription}
                        </Typography>
                    </div>
                    <div className={classes.formUserInfoContainer}>
                        <Typography component="h1" variant="h5">
                            User Info :
                        </Typography>
                        <span className="textMedium"
                              style={{fontSize: '20px', marginTop: '20px'}}>{(currentNote ? `${(currentNote).toFixed(1)}/5` : 'No note yet')}</span>
                        <Rating name="read-only" precision={0.1} value={currentNote} readOnly/>
                        <form className={classes.form}>
                            <PickeatTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="name"
                                label="name"
                                name="labelname"
                                autoComplete="name"
                                autoFocus
                                value={userName}
                                onChange={(event => setUserName(event.target.value))}
                            />
                            <PickeatTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="desciption"
                                label="description"
                                desciption="labeldesciption"
                                autoComplete="desciption"
                                autoFocus
                                multiline
                                value={userDescription}
                                onChange={(event => setUserDescription(event.target.value))}
                            />
                            <PickeatTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="age"
                                label="age"
                                desciption="age"
                                autoComplete="age"
                                autoFocus
                                multiline
                                value={userAge}
                                onChange={(event => setUserAge(event.target.value))}
                            />
                            <PickeatTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="gender"
                                label="gender"
                                desciption="gender"
                                autoComplete="gender"
                                autoFocus
                                multiline
                                value={userGender}
                                onChange={(event => setUserGender(event.target.value))}
                            />
                            <Button
                                style={{width: '50%'}}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setUserPublicInfoCall(userName, userDescription, userAge, userGender);
                                    getUserPublicInfoCall();
                                }}
                                className="pickeatBtn"
                            >
                                <SaveIcon/>
                            </Button>
                        </form>
                        <div className={classes.btnContainer} style={{alignItems: 'flex-end', marginTop: '10px'}}>
                            <Button
                                style={{width: 'auto'}}
                                className="pickeatBtn" onClick={() => {
                                setShowDispoModal(true)
                                }}>Edit Availabilities</Button>
                        </div>
                        <DispoModal show={showDispoModal} width="50%" title={"Choose your availabilities"} onClose={() => {
                            setShowDispoModal(false)
                        }}/>
                    </div>
                </Paper>
            );
        }
    }

    const buildProductCard = (product, index) => {
        if (product.status === "deleted")
            return;
        return (
            <ProductCard data={product}/>
        )
    }

    const buildUserOwnProducts = () => {
        if (isUserOwnProductsLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </div>
            );
        } else if (!isUserOwnProductsLoading && userOwnProductList?.length === 0) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div className={classes.nothingToShow}>
                        You have not yet proposed any product
                    </div>
                </div>
            );
        } else {
            return userOwnProductList?.map((product, index) => {
                return (
                    <Grid item key={'product-' + index} className={classes.productCardContainer}>
                        <Paper elevation={2} className={classes.productCard}>
                            {buildProductCard(product, index)}
                        </Paper>
                    </Grid>
                );
            });
        }
    }

    const buildUserReservationProducts = () => {
        if (isUserReservationProductsLoading) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress/>
                </div>
            );
        } else if (!isUserReservationProductsLoading && userReservedProductList?.length === 0) {
            return (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div className={classes.nothingToShow}>
                        You have not reserved any product yet
                    </div>
                </div>
            );
        } else {
            return userReservedProductList?.map((product, index) => {
                return (
                    <Grid item key={'product-' + index} className={classes.productCardContainer}>
                        <Paper elevation={2} className={classes.productCard}>
                            {buildProductCard(product, index)}
                        </Paper>
                    </Grid>
                );
            });
        }
    }

    return (
        <div className={classes.main}>
            <Background/>
            <div className={classes.leftSection}>
                {buildUserInfo()}
            </div>
            <div className={classes.rightSection}>
                <div className={classes.productListContainer}>
                    <div className={classes.announceListTitle}>
                        <Typography style={{fontFamily: 'Colfax-medium'}}>
                            Your Announces
                        </Typography>
                    </div>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {buildUserOwnProducts()}
                    </Grid>
                </div>
                <div className={classes.productListContainer}>
                    <div className={classes.announceListTitle}>
                        <Typography style={{fontFamily: 'Colfax-medium'}}>
                            Your Reservations
                        </Typography>
                    </div>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {buildUserReservationProducts()}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
