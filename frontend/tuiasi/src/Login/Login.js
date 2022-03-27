import React, { useState, useEffect }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { blue } from '@mui/material/colors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import background from '.././assets/bg.svg';
import 'react-toastify/dist/ReactToastify.css';

const notifyError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const notifyInfo = (message) => toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

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
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        let jwt = localStorage.getItem("token");

        // fetch("http://172.20.98.67:7070/api/validate", {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${jwt}`
        //     },
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         console.log(json)

        //     })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://172.20.98.67:7070/api/authenticate", {
            body: JSON.stringify({ "username": username, "password": password }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
        })
            .then((response) => response.json()
                .then((resp) => {
                    // console.log(resp["token"])
                    if (resp["token"]) {
                        localStorage.setItem("token", resp["token"]);
                        setToken(resp["token"]);
                    }
                    else {
                        notifyError("Date invalide.");
                    }
                })
            );
    }

    return (
        <div style={{ backgroundImage: `url(${background})`, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToastContainer style={{ width: "500px" }} />
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
                        >{/*  */}
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <AccountCircleIcon color="white" />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Autentificare
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 2 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresa de email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={e => setUserName(e.target.value)}
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
                                    onChange={e => setPassword(e.target.value)}
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