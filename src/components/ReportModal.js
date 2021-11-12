import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
    width: '100%',
    paddingTop: '20px',
    paddingBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputSection: {
    width: '100%',
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
    width: '100%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function ReportModal(props) {
  const { onReport, onClose } = props;
  const classes = useStyles();
  const [isReportLoading, setIsReportLoading] = useState(false);
  const [reportMessage, setReportMessage] = useState('');

  const reportUser = () => {
    setIsReportLoading(true);
    onReport(reportMessage).then((success) => {
      setIsReportLoading(false);
      onClose();
      setReportMessage('');
    });
  };

  function buildModalContent() {
    return (
      <div className={classes.inputSection}>
        <TextField
          inputProps={{ style: { '--tw-ring-shadow': 'none' } }}
          variant="outlined"
          size="medium"
          maxRows={10}
          minRows={3}
          multiline
          value={reportMessage}
          onChange={(event) => {
            setReportMessage(event.target.value);
          }}
          className={classes.textField}
        />
      </div>
    );
  }

  return (
    <Modal
      show={props.show}
      width={'50%'}
      title={'What is wrong with this user ?'}
      onClose={onClose}
    >
      <div className={classes.modalContent}>{buildModalContent()}</div>
      <div className={classes.modalFooter}>
        <Button style={{ marginRight: '20px' }} onClick={onClose} className={classes.closeBtn}>
          Close
        </Button>
        <Button
          onClick={() => {
            reportUser();
          }}
          className={'pickeatBtn'}
        >
          {isReportLoading ? <CircularProgress style={{ color: 'white' }} /> : 'Report'}
        </Button>
      </div>
    </Modal>
  );
}

ReportModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onReport: PropTypes.func.isRequired,
};
