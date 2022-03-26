import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, TextField, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const notify = () => toast.error('Credentials are not valid.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


    return (
        <div className="login-wrapper">
            <ToastContainer />
            <div className='login-card'>
                <Typography variant="h5" gutterBottom component="div" align='center' paddingBottom={2}>
                    Autentificare
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch', height: '7ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="username_input"
                        label="Username"
                        onChange={e => setUserName(e.target.value)}
                    />
                    <br></br>
                    <TextField
                        id="password_Input"
                        label="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <br></br>
                </Box>
                <Button
                    style={{
                        marginBottom: '1%'
                    }}
                    variant="contained"
                    disableElevation>
                    Login
                </Button>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
}