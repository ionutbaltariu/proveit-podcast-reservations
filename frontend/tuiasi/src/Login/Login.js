import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { blue } from '@material-ui/core/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import background from '.././assets/bg.svg';


function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        StepDevs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

export default function Login({ setToken }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div style={{ backgroundImage: `url(${background})`, minHeight: '100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <ThemeProvider theme={theme} >
        <div>
          <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgb(255, 255, 255)',
                padding: '25px',
                borderRadius: '5px',
                boxShadow: 'rgb(0 0 0 / 30%) 2px 1px 6px 0px',
                borderTop: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AccountCircleIcon color="primary"/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Autentificare
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb:2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Adresa de email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Parola"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ 
                    marginTop: 3, mb: 3 
                  }}
                >
                  Autentificare
                </Button>
                {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid> */}
              </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Box>
          </Container>
        </div>
      </ThemeProvider>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}