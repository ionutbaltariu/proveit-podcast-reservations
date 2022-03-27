import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography, TextField, Button, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import Menu from '../Menu/Menu';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@mui/material/Container';
import { ToastContainer, toast } from 'react-toastify';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import './Tichete.css'
import { useNavigate } from 'react-router-dom';

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

const { useState, useEffect, Fragment } = React

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

export default function Tichete(props) {
    const today = new Date();
    const drawerWidth = 220;

    const [descriere, setDescriere] = useState();
    const [priority, setPriority] = React.useState('mica');

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    let navigate = useNavigate();
    const [token, setToken] = useState();

    if (!token) {
        navigate('/login');
    }
    
    useEffect(() => {
        let jwt = localStorage.getItem('token');
        setToken(jwt);

        if (jwt) {
            fetch("http://172.20.98.67:7070/api/validate", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            })
                .then(response => response.json())
                .then(json => {
                    localStorage.setItem('idUser', json["idUser"]);
                })
        }

    }, [])



    const handleSubmit = (event) => {
        event.preventDefault();        
        fetch("http://172.20.98.67:7070/api/tichete/", {
            body: JSON.stringify({
                "idUser": localStorage.getItem('idUser'),
                "descriere": descriere,
                "prioritate": priority,
            }),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            console.log(response);
            if(response.status !== 201){
                notifyError("A apărut o eroare la adăugarea tichetului.")
            }
            else{
                notifyInfo("Problema a fost comunicată");
                event.target.reset();
            }
            
            // notifyError("test")
            // if("message" in response) {
            // }
        })
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <ToastContainer style={{ width: "500px" }} />
            <Menu pageName="Semnalează o problemă"></Menu>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, minHeight: '100vh' }}
            >
                <ThemeProvider theme={theme} >
                    <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' }}>
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
                                    borderTop: `4px solid orange`,
                                }}
                            >{/*  */}
                                <Avatar sx={{ m: 1, bgcolor: 'orange' }}>
                                    <ReportProblemIcon color="white" />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Trimitere tichet
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, mb: 2, width: '100%' }}>

                                    <InputLabel id="prioritate" style={{ textAlign: 'left' }}>Descriere problemă</InputLabel>
                                    <TextareaAutosize
                                        minRows={3}
                                        maxRows={8}
                                        label="Descriere"
                                        aria-label="maximum height"
                                        placeholder="Descrieti problema in cateva randuri. Zona in care scrieti textul se va mari."
                                        style={{ width: '100%', minWidth: "100%", maxWidth: "100%" }}
                                        onChange={e => {setDescriere(e.target.value)}}
                                    />
                                    <InputLabel id="prioritate" style={{ textAlign: 'left' }}>Prioritate</InputLabel>
                                    <Select
                                        id="select-prioritate"
                                        value={priority}
                                        style={{ width: '100%', height: '35px' }}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="mica">Mica</MenuItem>
                                        <MenuItem value="medie">Medie</MenuItem>
                                        <MenuItem value="mare">Mare</MenuItem>
                                    </Select>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            marginTop: 3, mb: 0, background: 'orange'
                                        }}
                                    >
                                        Trimitere tichet
                                    </Button>
                                </Box>
                            </Box>
                        </Container>
                    </div>
                </ThemeProvider>


            </Box>
        </Box>
    )
}