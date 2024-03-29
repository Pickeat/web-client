import React from 'react';

import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  main: {},
}));

export default function StatusIndicator(props) {
  const classes = useStyles();
  const statusTextDictPicker = {
    available: 'Le produit est disponible',
    'waiting-for-reservation': 'En attente de la confirmation du donneur',
    reserved: 'En attente de la validation de l \'échange',
    given: 'En attente de votre notation',
    noted: 'Produit archivé',
    deleted: 'Produit archivé',
  };
  const statusTextDictGiver = {
    available: 'Le produit est disponible',
    'waiting-for-reservation': 'En attente de votre confirmation',
    reserved: 'En attente de la validation de l \'échange',
    given: 'En attente de la notation du receveur',
    noted: 'Produit archivé',
    deleted: 'Produit archivé',
  };

  const buildStatusText = (isOwner, status) => {
    if (isOwner) {
      return statusTextDictGiver[status];
    } else {
      return statusTextDictPicker[status];
    }
  };

  return (
    <div className={classes.main}>
      <span className="textMedium">{buildStatusText(props.isOwner, props.status)}</span>
      <br />
      {props.status === 'waiting-for-reservation' &&
        props.reserveTime &&
        `Date and time asked: ${new Date(props.reserveTime).toLocaleString()}`}
    </div>
  );
}
