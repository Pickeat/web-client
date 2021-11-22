import React, { useEffect, useState } from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { PickeatTextField } from '../components/PickeatTextField';
import updateUserPhoneApi from '../api/updateUserPhone';
import updateUserMailApi from '../api/updateUserMailApi';
import updateUserPasswordCallApi from '../api/updateUserPasswordApi';
import deleteUserAccountApi from '../api/deleteAccountApi';
import resentMailConfirmAccountApi from '../api/resentMailConfirmAccountApi';
import getUserPrivateInfoApi from '../api/getUserPrivateInfoApi';
import setUserPrivateInfoApi from '../api/setUserPrivateInfoApi';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  main: {
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
    borderRight: 'solid 1px #d6d6d6',
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
    height: '75px',
  },
  menuButton: {
    border: 'solid 1px #d6d6d6',
    borderTop: 'none',
    borderRight: 'none',
    width: '100%',
    height: '100%',
    textTransform: 'none',
    fontFamily: 'Colfax-Regular',
    fontSize: '14px',
    justifyContent: 'normal',
  },
  menuButtonText: {
    fontFamily: 'Colfax-Medium',
    margin: 8,
    textAlign: 'left',
  },
  menuButtonSelected: {
    position: 'absolute',
    left: '85%',
    width: '7%',
  },
}));

const foodBlacklistFilters = [
  { name: 'gluten', label: 'Gluten' },
  { name: 'non_vegan', label: 'Pas vegan' },
];
const foodPreferencesFilters = [
  { name: 'vegan', label: 'Vegan' },
  { name: 'gluten_free', label: 'Sans Gluten' },
  { name: 'halal', label: 'Halal' },
  { name: 'casher', label: 'Casher' },
  { name: 'veggie', label: 'Veggie' },
];

export default function Settings(props) {
  const [userPhone, updateUserPhone] = useState('');
  const [userMail, updateUserMail] = useState('');
  const [userOldPassword, updateUserOldPassword] = useState('');
  const [userNewPassword, updateUserNewPassword] = useState('');
  const [userPassword, deleteUserAccount] = useState('');
  const [userLanguage, setUserLanguage] = useState('');
  const [userFoodPreferences, setUserFoodPreferences] = useState([]);
  const [userFoodBlacklist, setUserFoodBlacklist] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getUserPrivateInfoApi().then((res) => {
      setUserLanguage(res.language);
      setUserFoodPreferences(res.food_preferences);
      setUserFoodBlacklist(res.food_blacklist);
    });
  }, []);

  const updateUserPhoneCall = (newPhone) => {
    updateUserPhoneApi(newPhone).then((response) => {});
  };

  const updateUserMailCall = (newMail) => {
    updateUserMailApi(newMail).then((response) => {});
  };

  const updateUserPasswordCall = (oldPassword, newPassword) => {
    updateUserPasswordCallApi(oldPassword, newPassword).then((response) => {});
  };

  const deleteUserAccountCall = (userPassword) => {
    deleteUserAccountApi(userPassword).then((response) => {});
  };

  const resentUserConfirmationCall = () => {
    resentMailConfirmAccountApi().then((response) => {
      if (response) toast.success('Un nouveau mail a été envoyé');
    });
  };

  const updateLanguageCall = () => {
    setUserPrivateInfoApi({ language: userLanguage }).then((response) => {
      if (response) toast.success('Le language a été modifié avec succès');
    });
  };

  const updateFoodPreferences = () => {
    setUserPrivateInfoApi({
      food_preferences: userFoodPreferences,
      food_blacklist: userFoodBlacklist,
    }).then((response) => {
      if (response) toast.success('Les préférences alimentaires ont été modifiées avec succès');
    });
  };

  const componentList = [
    {
      key: 0,
      label: 'Modifier son mot de passe',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Renseignez votre mot de passe actuel pour le modifier:
          </Typography>
          <form className={classes.form}>
            <PickeatTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="oldpassword"
              label="Ancien mot de passe"
              type="password"
              name="labelname"
              autoComplete="current-password"
              autoFocus
              value={userOldPassword}
              onChange={(event) => updateUserOldPassword(event.target.value)}
            />
            <PickeatTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="newpassword"
              type="password"
              label="Nouveau mot de passe"
              name="labelname"
              autoComplete="current-password"
              autoFocus
              value={userNewPassword}
              onChange={(event) => updateUserNewPassword(event.target.value)}
            />
          </form>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              updateUserPasswordCall(userOldPassword, userNewPassword);
            }}
            className="pickeatBtn"
          >
            Modifier son mot de passe
          </Button>
        </div>
      ),
    },
    {
      key: 1,
      label: 'Modifier son adresse email',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Nouvelle adresse email:
          </Typography>
          <form className={classes.form}>
            <PickeatTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="mail"
              label="Email"
              name="labelname"
              autoComplete="mail"
              autoFocus
              value={userMail}
              onChange={(event) => updateUserMail(event.target.value)}
            />
          </form>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              updateUserMailCall(userMail);
            }}
            className="pickeatBtn"
          >
            Sauvegarder
          </Button>
        </div>
      ),
    },
    {
      key: 2,
      label: 'Modifier son numéro de téléphone',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Nouveau numéro de téléphone:
          </Typography>
          <form className={classes.form}>
            <PickeatTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="phone"
              label="Numéro de téléphone"
              name="labelname"
              autoComplete="phone"
              autoFocus
              value={userPhone}
              onChange={(event) => updateUserPhone(event.target.value)}
            />
          </form>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              updateUserPhoneCall(userPhone);
            }}
            className="pickeatBtn"
          >
            Sauvegarder
          </Button>
        </div>
      ),
    },

    {
      key: 3,
      label: 'Confirmer son compte',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Cliquez sur ce bouton pour renvoyer un lien de confirmation
          </Typography>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24, marginTop: 12 }}
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              resentUserConfirmationCall();
            }}
            className="pickeatBtn"
            color={'inherit'}
          >
            Renvoyer un mail
          </Button>
        </div>
      ),
    },
    {
      key: 4,
      label: 'Supprimer son compte',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Entrez votre mot de passe pour supprimer votre compte:
          </Typography>
          <form className={classes.form}>
            <PickeatTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="currentPassword"
              label="Mot de passe"
              type="password"
              name="labelname"
              autoComplete="current-password"
              autoFocus
              value={userPassword}
              onChange={(event) => deleteUserAccount(event.target.value)}
            />
          </form>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24 }}
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteUserAccountCall(userPassword);
            }}
            className="pickeatBtn"
            color={'inherit'}
          >
            Supprimer son compte
          </Button>
        </div>
      ),
    },
    {
      key: 5,
      label: 'Changer sa langue',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Sélectionnez une langue:
          </Typography>
          <FormControl fullWidth style={{ margin: '12px 0' }}>
            <Select
              fullWidth
              variant="outlined"
              id="language-select"
              value={userLanguage}
              onChange={(e) => setUserLanguage(e.target.value)}
            >
              <MenuItem value={'fr'}>
                <img
                  src="/assets/languages/france.svg"
                  style={{ display: 'inline-block', marginRight: 8 }}
                />
                <span style={{ verticalAlign: 'bottom', fontSize: 18 }}>Français</span>
              </MenuItem>
              <MenuItem value={'en'}>
                <img
                  src="/assets/languages/english.svg"
                  style={{ display: 'inline-block', marginRight: 8 }}
                />
                <span style={{ verticalAlign: 'bottom', fontSize: 18 }}>Anglais</span>
              </MenuItem>
            </Select>
          </FormControl>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 8 }}
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              updateLanguageCall();
            }}
            className="pickeatBtn"
            color={'inherit'}
          >
            Changer la langue
          </Button>
          <Typography component="div" variant="caption" style={{ color: 'grey' }}>
            *Ce paramètre ne sert actuellement pas sur Pickeat, il servira lors <br />
            de l'implémentation de la traduction dans une future mise à jour
          </Typography>
        </div>
      ),
    },
    {
      key: 6,
      label: 'Changer vos préférences alimentaires',
      component: (
        <div
          className={classes.formUserInfoContainer}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component="h1" variant="h5">
            Sélectionnez vos préférences alimentaires:
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0' }}>
            <FormControl fullWidth style={{ marginRight: 8 }}>
              <InputLabel style={{ marginLeft: 16 }} id="food-preferences-checkbox-label">
                Préférences alimentaires
              </InputLabel>
              <Select
                labelId="food-preferences-checkbox-label"
                id="food-preferences-checkbox"
                multiple
                value={userFoodPreferences}
                onChange={(e) => setUserFoodPreferences(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) =>
                  selected
                    .map((f) => foodPreferencesFilters.find((ft) => ft.name === f).label)
                    .join(', ')
                }
              >
                {foodPreferencesFilters.map((filter) => (
                  <MenuItem key={filter.name} value={filter.name}>
                    <Checkbox checked={userFoodPreferences.indexOf(filter.name) > -1} />
                    <ListItemText primary={filter.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginLeft: 8 }}>
              <InputLabel style={{ marginLeft: 16 }} id="food-blacklist-checkbox-label">
                Aliments non désirables
              </InputLabel>
              <Select
                labelId="food-blacklist-checkbox-label"
                id="food-blacklist-checkbox"
                multiple
                value={userFoodBlacklist}
                onChange={(e) => setUserFoodBlacklist(e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) =>
                  selected
                    .map((f) => foodBlacklistFilters.find((ft) => ft.name === f).label)
                    .join(', ')
                }
              >
                {foodBlacklistFilters.map((filter) => (
                  <MenuItem key={filter.name} value={filter.name}>
                    <Checkbox checked={userFoodBlacklist.indexOf(filter.name) > -1} />
                    <ListItemText primary={filter.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            style={{ paddingLeft: 24, paddingRight: 24, marginBottom: 8 }}
            type="submit"
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              updateFoodPreferences();
            }}
            className="pickeatBtn"
            color={'inherit'}
          >
            Confirmer
          </Button>
          <Typography component="div" variant="caption" style={{ color: 'grey' }}>
            *Ce paramètre ne sert actuellement pas sur Pickeat, il servira lors de
            <br />
            l'implémentation des préférences alimentaires dans une future mise à jour
          </Typography>
        </div>
      ),
    },
  ];

  const buildMainContent = () => {
    const elem = componentList.find((elem) => elem.key === activePage);
    if (!elem) return <div>ERROR</div>;
    return elem.component;
  };

  return (
    <div className={classes.main}>
      <div className={classes.leftSection}>
        <div className={classes.menuSection}>
          {componentList.map((elem, index) => (
            <div key={index} className={classes.menuButtonContainer}>
              <Button onClick={() => setActivePage(elem.key)} className={classes.menuButton}>
                <div className={classes.menuButtonText}>{elem.label}</div>
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.rightSection}>
        <div className={classes.mainContentSection}>{buildMainContent()}</div>
      </div>
    </div>
  );
}
