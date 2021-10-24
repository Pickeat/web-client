import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { PickeatTextField } from '../components/PickeatTextField';
import Background from '../components/Background';
import signUpApi from '../api/signUpApi';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingTop: '5rem',
    boxSizing: 'border-box',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: 'auto',
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avatar: {
    backgroundColor: 'transparent',
    marginTop: '35px',
    width: '100px',
    height: '100px',
  },
  titleContainer: {
    marginTop: '22px',
  },
  form: {
    marginTop: '10px',
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    backgroundColor: '#c4d82f',
    '&:hover': {
      backgroundColor: '#8bb535',
    },
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');

  const signUpApiCall = (email, password, confirmPassword, phone, age, name) => {
    signUpApi(email, password, confirmPassword, phone, age, name).then((response) => {
      console.log(response);
      if (!response) return;
      props.history.push('/sign-in');
    });
  };

  return (
    <div className={classes.main}>
      <Paper elevation={24} className={classes.container}>
        {/*<Avatar className={classes.avatar}>*/}
        {/*  <img style={{ maxWidth: '100%', maxHeight: '100%' }} alt="PickEat Logo" src={Logo} />*/}
        {/*</Avatar>*/}
        <div className={classes.titleContainer}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </div>
        <form className={classes.form}>
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <PickeatTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="age"
            label="Age"
            type="age"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
          <Button
            style={{ marginTop: '20px', marginBottom: '20px', width: '50%' }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              signUpApiCall(email, password, confirmPassword, phone, age, name);
            }}
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
}
