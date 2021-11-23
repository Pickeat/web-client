import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import * as moment from 'moment';
import { isEmpty } from '../helpers/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from '../components/Map';
import { getDistance } from 'geolib';
import { toast } from 'react-toastify';
import getProductApi from '../api/getProductApi';
import getRecommendationsApi from '../api/getRecommendationsApi';
import DefaultProductPicture from '../assets/wallpaper-login.jpg';
import defaultImage from '../assets/wallpaper-login.jpg';
import { Modal, Tooltip, Zoom } from '@material-ui/core';
import UserAvailabilities from '../components/UserAvailabilities';
import getUserMeApi from '../api/getUserMeApi';
import TextField from '@material-ui/core/TextField';
import confirmProductReservationApi from '../api/comfirmReservationProductApi';
import StatusIndicator from '../components/StatusIndicator';
import deleteAnnounceApi from '../api/deleteAnnounceApi';
import confirmExchangeApi from '../api/confirmExchangeApi';
import PickerRateSection from '../components/PickerRateSection';
import postReportUserApi from '../api/reportUserApi';
import postEditAnnounceApi from '../api/postEditAnnounce';
import ReservationSection from '../components/ReservationSection';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ReportModal from '../components/ReportModal';
import NotesModal from '../components/NotesModal';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    height: '200px',
    width: '100%',
    display: 'flex',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '180px',
    height: '100%',
  },
  logoBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: '30px',
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '100%',
  },
  deleteAnnounceText: {
    textDecoration: 'underline',
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '100%',
  },
  recommendationsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1.5%',
    paddingRight: '3.5%',
    paddingBottom: '2%',
  },
  paper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    height: '90%',
  },
  profilePictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '30%',
  },
  profileInfoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
    height: '10%',
  },
  profileRatingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '20%',
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contactBtnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  contactBtnContainerButton: {
    position: 'absolute',
    bottom: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  productDataContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',
    height: '55%',
  },
  productPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: '100%',
  },
  productInfoContainer: {
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'auto',
  },
  productTitleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
    width: '100%',
  },
  productLittleInfoContainer: {
    height: '85%',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  productLittleInfoBlock: {
    height: '25%',
  },
  productLittleInfoLabel: {
    height: '20%',
    width: '100%',
    fontSize: '20px',
  },
  productLittleInfoContent: {
    paddingLeft: '20px',
    boxSizing: 'border-box',
    height: '80%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  productLittleInfoImageLabelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    width: '50px',
    height: '100%',
  },
  productMapContainer: {
    position: 'relative',
    width: '90%',
    height: '35%',
  },
  recommendationCard: {
    width: '20%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiButton-label': {
      flexDirection: 'column',
    },
    position: 'relative',
    minWidth: 250,
    margin: '20px',
    cursor: 'pointer',
  },
  recommendationCardImgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '70%',
    height: '70%',
    backgroundColor: 'pink',
  },
  recommendationCardInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  recommendationCardUserAvatar: {
    width: '50px',
    height: '50px',
    border: 'solid 2px white',
    marginTop: '-40px',
  },
  recommendationCardBottom: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  notesButton: {
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  rating: {
    verticalAlign: 'top',
  },
  ratingLabel: {
    fontWeight: 600,
    verticalAlign: 'middle',
  },
}));

export default function Product(props) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [OwnId, setOwnId] = useState('');
  const [productDistance, setProductDistance] = useState(-1);
  const [availabilitiesModalIsOpen, setAvailabilitiesModalIsOpen] = useState(false);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productExpirationDate, setProductExpirationDate] = useState('');
  const [reportModalOpen, setReportModelOpen] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);

  const reportGiverApiCall = (message) => {
    return postReportUserApi(data.user._id, message);
  };
  useEffect(() => {
    getProductApi(id).then((res) => {
      console.log(res);
      if (!res.user) {
        toast.error("Cet utilisateur n'existe pas/plus");
        return;
      }
      setData(res);
      setProductTitle(res?.title);
      setProductDescription(res?.description);
      setProductExpirationDate(res?.expiration_date);

      getRecommendationsApi(res.location, id).then((res) => {
        setRecommendations(res);
      });
    });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (!isEmpty(data) && props.location) {
          const userLat = location?.coords?.latitude;
          const userLng = location?.coords?.longitude;
          if (!data?.location) return;
          const productLng = data?.location[0];
          const productLat = data?.location[1];

          if (userLat && userLng && productLng && productLat) {
            setProductDistance(
              getDistance(
                { latitude: userLat, longitude: userLng },
                { latitude: productLat, longitude: productLng },
              ),
            );
          }
        } else if (!productDistance) {
          setProductDistance(-1);
        }
      });
    } else {
      toast.error("La géolocalisation n'est pas prise en charge par votre navigateur.");
      setProductDistance(-1);
    }
  }, [data]);

  const setUserProductInfoCall = (id, productTitle, productDescription, productExpirationDate) => {
    console.log(id);
    postEditAnnounceApi(id, productTitle, productDescription, productExpirationDate);
  };

  const isUserOwner = () => {
    getOwnUserNameCall();
    if (!isEmpty(data) && OwnId && OwnId === data.user._id && !isEditMode) {
      return (
        <div className={classes.contactBtnContainerButton}>
          <Button
            onClick={() => {
              setIsEditMode(true);
            }}
            className="pickeatBtn"
            style={{ width: '100%', height: '40px', display: 'none'}}
          >
            Modifier le produit
          </Button>
        </div>
      );
    } else if (!isEmpty(data) && OwnId && OwnId === data.user._id && isEditMode) {
      return (
        <div className={classes.contactBtnContainerButton}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setUserProductInfoCall(id, productTitle, productDescription, productExpirationDate);
              setIsEditMode(false);
            }}
            className="pickeatBtn"
            style={{ width: '100%', height: '40px' }}
          >
            Valider les changements
          </Button>
        </div>
      );
    }
  };

  const titleBlock = () => {
    if (isEditMode) {
      return (
        <div className={classes.productTitleContainer}>
          <TextField
            inputProps={{ style: { textAlign: 'center' } }}
            className={classes.titleField}
            margin="normal"
            fullWidth
            id="title"
            label="titre"
            name="titre"
            autoComplete="title"
            autoFocus
            value={productTitle}
            onChange={(event) => setProductTitle(event.target.value)}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.productTitleContainer}>
          <span className="textMedium" style={{ fontSize: '20px' }}>
            {productTitle}
          </span>
        </div>
      );
    }
  };

  const descriptionBlock = () => {
    if (isEditMode) {
      return (
        <div className={classes.productLittleInfoBlock}>
          <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Description</div>
          <div className={classes.productLittleInfoContent}>
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="description"
              name="description"
              autoComplete="description"
              autoFocus
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.productLittleInfoBlock}>
          <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Description</div>
          <div className={classes.productLittleInfoContent}>
            <span className="textRegular" style={{ marginLeft: '10px' }}>
              {productDescription}
            </span>
          </div>
        </div>
      );
    }
  };

  const expirationDateBlock = () => {
    if (isEditMode) {
      return (
        <div className={classes.productLittleInfoBlock}>
          <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Date d'expiration</div>
          <div className={classes.productLittleInfoContent}>
            <TextField
              id="expirationDate"
              label="Date d'expiration"
              type="date"
              defaultValue={productExpirationDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.productLittleInfoBlock}>
          <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Date d'expiration</div>
          <div className={classes.productLittleInfoContent}>
            <EventIcon fontSize={'large'} />
            <span className="textRegular" style={{ marginLeft: '10px' }}>
              {moment(productExpirationDate).format('DD/MM/YYYY')}
            </span>
          </div>
        </div>
      );
    }
  };

  const labelBlock = () => {
    return (
      <div className={classes.productLittleInfoBlock}>
        <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Labels</div>
        <div className={classes.productLittleInfoContent}>
          {data?.labels?.map((label) => {
            return (
              <div
                title={label}
                key={label}
                className={classes.productLittleInfoImageLabelContainer}
              >
                <img
                  style={{ maxWidth: '80%', maxHeight: '80%' }}
                  alt={'product label'}
                  src={`/assets/food-label/${label}.png`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const distanceBlock = () => {
    return (
      <div className={classes.productLittleInfoBlock}>
        <div className={clsx('textMedium', classes.productLittleInfoLabel)}>Distance</div>
        <div className={classes.productLittleInfoContent}>
          <RoomIcon fontSize={'large'} />
          <span className="textRegular" style={{ marginLeft: '10px' }}>
            {buildProductDistance()}
          </span>
        </div>
      </div>
    );
  };

  const getOwnUserNameCall = () => {
    getUserMeApi().then((response) => {
      setOwnId(response?._id);
    });
  };

  const buildProductDistance = () => {
    if (productDistance === -1) return 'Désolé nous avons eu un problème en calculant la distance';
    return (productDistance / 1000).toFixed(1) + ' Km';
  };

  if (isEmpty(data))
    return (
      <div className={classes.main} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    );

  const buildReportSection = () => {
    if (OwnId && OwnId === data.user._id) {
      return <div></div>;
    } else {
      return (
        <div className={classes.contactBtnContainer}>
          <Button
            className="pickeatBtnSlim"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setReportModelOpen(true);
            }}
            style={{ width: '100%', height: '40px' }}
          >
            Signaler le donneur
          </Button>
          <ReportModal
            onReport={reportGiverApiCall}
            show={reportModalOpen}
            onClose={() => {
              setReportModelOpen(false);
            }}
          />
        </div>
      );
    }
  };

  const buildDeleteAnnounce = () => {
    const deleteAnnounceApiCall = () => {
      console.log(data._id);
      deleteAnnounceApi(data._id).then((response) => {
        toast.success("L'annonce a été supprimée avec succès");
        props.history.push('/product-list');
        // window.location.reload();
      });
    };
    if (OwnId && OwnId === data.user._id) {
      //Giver
      return (
        <div className={classes.contactBtnContainer}>
          <Button
            className="pickeatBtnSlim"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteAnnounceApiCall();
            }}
            style={{ width: '100%', height: '40px' }}
          >
            Retirer l'annonce
          </Button>
        </div>
      );
    }
  };

  const announceRecommendation = (data) => {
    return (
      <div
        key={data?._id}
        onClick={() => {
          history.push(`/product/${data?._id}`);
          location.reload();
        }}
        className={classes.recommendationCard}
      >
        <div className={classes.recommendationCardImgContainer}>
          <img
            alt={'product_image'}
            src={
              data.image
                ? `https://minio.pickeat.fr/minio/download/products/${data?.image}?token=`
                : defaultImage
            }
            style={{
              width: '100%',
              maxHeight: '250px',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className={classes.recommendationCardInfoContainer}>
          <Avatar
            alt="user_picture"
            src={
              data.user?.image
                ? `https://minio.pickeat.fr/minio/download/users/${data?.user?.image}?token=`
                : defaultImage
            }
            className={classes.recommendationCardUserAvatar}
          />
          <div className={classes.recommendationCardBottom}>
            <div className="textMedium" style={{ lineHeight: '22px' }}>
              {data.title}
            </div>
          </div>
          <div style={{ marginTop: '10px' }} className={classes.recommendationCardBottom}>
            {data.expiration_date && (
              <div style={{ display: 'flex' }}>
                <EventAvailableIcon />
                <div
                  style={{
                    lineHeight: '22px',
                    marginLeft: '5px',
                  }}
                >
                  {moment(data?.expiration_date).format('DD/MM/YYYY')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={classes.main}>
        <div className={classes.contentContainer}>
          <div className={classes.userContainer}>
            <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
              <div className={classes.profilePictureContainer}>
                <img
                  style={{ maxWidth: '90%', maxHeight: '90%' }}
                  alt={'giver profile picture'}
                  src={
                    data.user.image
                      ? `https://minio.pickeat.fr/minio/download/users/${data.user.image}?token=`
                      : defaultImage
                  }
                />
              </div>
              <div className={classes.profileInfoContainer}>
                <div className="textMedium" style={{ fontSize: '20px', textAlign: 'center' }}>
                  {data?.user?.name}
                </div>
                <div className="textRegular" style={{ fontSize: '15px', textAlign: 'center' }}>
                  membre {data?.user?.level}
                  <br />({moment(data?.user?.created_at).format('DD/MM/YYYY')})
                </div>
              </div>
              <div className={classes.profileRatingContainer}>
                <span className="textMedium" style={{ fontSize: '30px' }}>
                  {data?.user?.note
                    ? `${Number.parseFloat(data.user.note).toFixed(1)}/5`
                    : 'Pas encore de note'}
                </span>
                {data?.user?.note !== undefined && (
                  <NotesModal
                    id={data.user ? data.user._id : ''}
                    show={notesModalOpen}
                    onClose={() => {
                      setNotesModalOpen(false);
                    }}
                  />
                )}
                <div
                  className={data?.user?.note !== undefined ? classes.notesButton : ''}
                  onClick={() => {
                    if (data?.user?.note !== undefined) setNotesModalOpen(true);
                  }}
                >
                  <Rating
                    name="read-only"
                    precision={0.1}
                    value={data?.user?.note}
                    readOnly
                    className={classes.rating}
                  />
                  {data?.user?.number_of_notes ? (
                    <span
                      className={classes.ratingLabel}
                    >{`${data.user.number_of_notes} avis`}</span>
                  ) : null}
                </div>
              </div>
              <div style={{ width: '80%', height: '40%' }}>
                <div className={classes.statusContainer}>
                  <StatusIndicator
                    status={data.status}
                    isOwner={!isEmpty(data) && OwnId && OwnId === data.user._id}
                    reserveTime={data.datetime}
                  />
                </div>
                <div className={classes.contactBtnContainer}>
                  <Button
                    className="pickeatBtn"
                    onClick={() => {
                      setAvailabilitiesModalIsOpen(true);
                    }}
                    style={{ width: '100%', height: '40px' }}
                  >
                    Disponibilités
                  </Button>
                </div>
                <Modal
                  open={availabilitiesModalIsOpen}
                  onClose={() => setAvailabilitiesModalIsOpen(false)}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ width: '800px', height: '500px' }}>
                    <UserAvailabilities data={data.user?.availability} />
                  </div>
                </Modal>
                <ReservationSection ownId={OwnId} product={data} />
                {buildReportSection()}
                {buildDeleteAnnounce()}
              </div>
            </Paper>
          </div>
          <div className={classes.productContainer}>
            <Paper className={classes.paper} style={{ flexDirection: 'column' }} elevation={10}>
              <div className={classes.productDataContainer}>
                <div className={classes.productPictureContainer}>
                  <img
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    alt={'pickeat product'}
                    src={
                      data?.image
                        ? `https://minio.pickeat.fr/minio/download/products/${data?.image}?token=`
                        : DefaultProductPicture
                    }
                  />
                </div>
                <div className={classes.productInfoContainer}>
                  {titleBlock()}
                  <div className={classes.productLittleInfoContainer}>
                    {descriptionBlock()}
                    {expirationDateBlock()}
                    {labelBlock()}
                    {distanceBlock()}
                  </div>
                </div>
              </div>
              <Paper elevation={4} className={classes.productMapContainer}>
                {data?.location && (
                  <Map lat={data?.location[1]} lng={data?.location[0]} zoom={17} />
                )}
                {isUserOwner()}
              </Paper>
            </Paper>
          </div>
        </div>
      </div>
      {recommendations && recommendations.length > 0 && (
        <div className={classes.recommendationsContainer}>
          <Paper
            className={classes.paper}
            style={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}
            elevation={10}
          >
            <h3 style={{ fontWeight: 'bold', margin: 10, marginLeft: 20, fontSize: 20 }}>
              Annonces qui peuvent vous intéresser
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                overflow: 'auto',
                width: '100%',
                alignItems: 'flex-end',
              }}
            >
              {recommendations.map((recommendation, index) => (
                <>
                  {announceRecommendation(recommendation)}
                  {index !== recommendations.length - 1 && (
                    <div
                      style={{
                        height: 250,
                        borderLeft: '1px solid grey',
                        position: 'relative',
                        top: -45,
                      }}
                    />
                  )}
                </>
              ))}
            </div>
          </Paper>
        </div>
      )}
    </>
  );
}

// la vache vincra
//                                       /;    ;\
//                                   __  \\____//
//                                  /{_\_/   `'\____
//                                  \___   (o)  (o  }
//       _____________________________/          :--'
//   ,-,'`@@@@@@@@       @@@@@@         \_    `__\
//  ;:(  @@@@@@@@@        @@@             \___(o'o)
//  :: )  @@@@          @@@@@@        ,'@@(  `===='
//     :: : @@@@@:          @@@@         `@@@:
//  :: \  @@@@@:       @@@@@@@)    (  '@@@'
//  ;; /\      /`,    @@@@@@@@@\   :@@@@@)
// ::/  )    {_----------------:  :~`,~~;
// ;;'`; :   )                  :  / `; ;
// ;;;; : :   ;                  :  ;  ; :
// `'`' / :  :                   :  :  : :
// )_ \__;      ";"          :_ ;  \_\       `,','
//    :__\  \    * `,'*         \  \  :  \   *  8`;'*
// `^'     \ :/           `^'  `-^-'   \v/ :
