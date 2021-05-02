import React, {useEffect, useState} from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import {Button} from "@material-ui/core";
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
import defaultImage from "../assets/wallpaper-login.jpg";
import Modal from "../components/Modal";
import DispoModal from "../components/DispoModal";

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
        width: '40%',
        display: 'flex',
        flexDirection: 'column',
    },
    userInfoContainer: {
        display: 'flex',
        height: '70%',
        paddingLeft: '5%',
        paddingTop: '5%',
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
    const [userBirthday, setUserBirthday] = useState();
    const [userGender, setUserGender] = useState();
    const [currentName, setCurrentName] = useState();
    const [currentDescription, setCurrentDescription] = useState();
    const [userOwnProductList, setUserOwnProductList] = useState([]);
    const [userReservedProductList, setReservedUserProductList] = useState([]);
    const [userProductList, setUserProductList] = useState([]);
    const [showDispoModal, setShowDispoModal] = useState(false);


    useEffect(() => {
        getUserPublicInfoCall();
        getUserOwnProductListCall();
        getUserReservedProductListCall();
    }, []);

    const getUserPublicInfoCall = () => {
        setIsUserInfoLoading(true);
        getUserPublicInfoApi().then((response) => {
            setUserName(response.name);
            setUserDescription(response.description);
            setCurrentName(response.name);
            setCurrentDescription(response.description);
            setUserProfilePicture(response.image);
            setIsUserInfoLoading(false);
            setUserGender(response.gender);
            setUserBirthday(response.age);
        });
    };

    const setUserPublicInfoCall = (newName, newDescription, userBirthday, userGender) => {
        setUserPublicInfoApi(newName, newDescription, "", userBirthday, userGender).then((response) => {
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
        getUserReservedProductListApi().then((response) => {
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
                <div className={classes.userInfoContainer}>
                    <div className={classes.showUserInfoContainer}>
                        <img style={{
                            width: '100%',
                            height: 'auto',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px'
                        }}
                             src={(userProfilePicture ? `https://minio.pickeat.fr/minio/download/users/${userProfilePicture}?token=` : "https://img2.freepng.fr/20180319/aeq/kisspng-computer-icons-google-account-user-profile-iconfin-png-icons-download-profile-5ab0301e0d78f3.2971990915214960940552.jpg")}/>
                        <ImageUploader
                            withIcon={false}
                            withLabel={false}
                            buttonText="Change image profil"
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
                                id="birthdate"
                                label="birthdate"
                                desciption="birthdate"
                                autoComplete="birthdate"
                                value={userBirthday}
                                onChange={(event => setUserBirthday(event.target.value))}
                                autoFocus
                            />
                            <PickeatTextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id="gender"
                                label="gender"
                                desciption="gender"
                                autoComplete="gender"
                                value={userGender}
                                onChange={(event => setUserGender(event.target.value))}
                                autoFocus
                            />
                            <Button
                                style={{width: '50%'}}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setUserPublicInfoCall(userName, userDescription, userBirthday, userGender);
                                    getUserPublicInfoCall();
                                }}
                                className="pickeatBtn"
                            >
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            );
        }
    }

    const buildProductCard = (product, index) => {
        if (product.status === "deleted")
            return ;
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
        } else if (!isUserReservationProductsLoading && userOwnProductList?.length === 0) {
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
            <Button className="pickeatBtn" onClick={() => {setShowDispoModal(true)}}>Availabilities</Button>
            <DispoModal show={showDispoModal} width="50%" title={"Choose your availabilities"} onClose={() => {setShowDispoModal(false)}}/>
            <div className={classes.leftSection}>
                {buildUserInfo()}
            </div>
            <div className={classes.rightSection}>
                <div className={classes.productListContainer}>
                    <div className={classes.announceListTitle}>
                        <Typography style={{fontFamily: 'Colfax-medium'}}>
                            User's Announces
                        </Typography>
                    </div>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {buildUserOwnProducts()}
                    </Grid>
                </div>
                <div className={classes.productListContainer}>
                    <div className={classes.announceListTitle}>
                        <Typography style={{fontFamily: 'Colfax-medium'}}>
                            User's Reservations
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
