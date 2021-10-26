import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import reserveProductApi from '../api/reserveProductApi';

const useStyles = makeStyles((theme) => ({
  modalFooter: {
    display: 'flex',
    width: '100%',
    height: '70px',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTop: 'solid 1px #c1c1c1',
  },
  modalContent: {
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  closeBtn: {
    fontFamily: 'Colfax-Medium, serif !important',
    textTransform: 'none !important',
    backgroundColor: 'red !important',
    color: 'white',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '190px',
  },
}));

export default function ReserveModal(props) {
  const productId = props.productId;
  const classes = useStyles();
  const [isReserveLoading, setIsReserveLoading] = useState(false);
  const [reserveTime, setReserveTime] = useState('');

  const reserveProduct = () => {
    setIsReserveLoading(true);
    reserveProductApi(productId, reserveTime).then((success) => {
      setIsReserveLoading(false);
      window.location.reload();
    });
  };

  function buildModalContent() {
    return (
      <div className={classes.inputSection}>
        <TextField
          value={reserveTime}
          onChange={(event) => {
            setReserveTime(event.target.value);
          }}
          type="datetime-local"
          className={classes.textField}
        />
      </div>
    );
  }

  return (
    <Modal
      show={props.show}
      width={'50%'}
      title={'Choisissez la date et l\'heure de l\'échange'}
      onClose={props.onClose}
    >
      <div className={classes.modalContent}>{buildModalContent()}</div>
      <div className={classes.modalFooter}>
        <Button
          style={{ marginRight: '20px' }}
          onClick={props.onClose}
          className={classes.closeBtn}
        >
          Fermer
        </Button>
        <Button
          onClick={() => {
            reserveProduct();
          }}
          className={'pickeatBtn'}
        >
          {isReserveLoading ? <CircularProgress style={{ color: 'white' }} /> : 'Reserver'}
        </Button>
      </div>
    </Modal>
  );
}

ReserveModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};
