import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import PropTypes from 'prop-types';
import { Button, CircularProgress, List, ListItem, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import makeStyles from '@material-ui/core/styles/makeStyles';
import getDetailedNotes from '../api/getDetailedNotes';

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
    padding: '8px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesSection: {
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
  notesList: {
    width: '100%',
  },
  noteContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rating: {},
  pickerName: {
    fontWeight: 600,
  },
  noteDate: {
    color: 'grey',
    fontWeight: 300,
    marginLeft: 'auto',
  },
  noteHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  noteComment: {
    padding: '8px 0',
  },
}));

export default function NotesModal(props) {
  const { id, show, onClose } = props;
  const classes = useStyles();
  const [notes, setNotes] = useState(false);

  useEffect(() => {
    if (show && (notes === false || notes === null)) {
      getDetailedNotes(id)
        .then((res) => {
          setNotes(res);
        })
        .catch((err) => {
          setNotes(null);
        });
    }
  }, [show]);

  function buildModalContent() {
    return (
      <div className={classes.notesSection}>
        {notes === null ? (
          "Une erreur est survenue, impossible de récupérer les notes de l'utilisateur"
        ) : notes === false ? (
          <CircularProgress />
        ) : notes.length === 0 ? (
          'Aucune note disponible pour cet utilisateur'
        ) : (
          <List className={classes.notesList}>
            {notes.map((note, index) => {
              const noteDate = new Date(note.created_at);
              const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
              const date = noteDate.toLocaleDateString('fr-FR', options);
              return (
                <div key={index}>
                  {index > 0 && <Divider variant="middle" />}
                  <ListItem className={classes.noteContainer}>
                    <div className={classes.noteHeader}>
                      <Rating
                        precision={0.1}
                        value={note.note}
                        readOnly
                        className={classes.rating}
                      />
                      <span className={classes.pickerName}>
                        {note.picker_name ? note.picker_name : 'Anonyme'}
                      </span>
                      <span className={classes.noteDate}>{date}</span>
                    </div>
                    <div className={classes.noteComment}>{note.comment}</div>
                  </ListItem>
                </div>
              );
            })}
          </List>
        )}
      </div>
    );
  }

  return (
    <Modal show={show} width={'50%'} title={'Notes en détail'} onClose={onClose}>
      <div className={classes.modalContent}>{buildModalContent()}</div>
      <div className={classes.modalFooter}>
        <Button style={{ marginRight: '20px' }} onClick={onClose} className={classes.closeBtn}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

NotesModal.propTypes = {
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
