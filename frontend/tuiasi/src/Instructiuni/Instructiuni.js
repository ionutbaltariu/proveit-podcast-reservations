import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu/Menu';

const { useState, useEffect, Fragment } = React


export default function Instructiuni(props) {
    const today = new Date();
    const drawerWidth = 220;

    let navigate = useNavigate();
    const [token, setToken] = useState();

    if (!token) {
        navigate('/login');
    }


    useEffect(() => {
        let jwt = localStorage.getItem('token');
        setToken(jwt);

        fetch("http://172.20.98.67:7070/api/validate", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                localStorage.setItem('idUser', json["idUser"]);
            })
    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <Menu pageName="Instrucțiuni"></Menu>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <Typography>
                    Pentru a introduce o programare, navigati la pagina "Rezervari". Apoi apasati pe semnul "+" din cadrul zilei in care doriti sa faceti programarea.
                </Typography>
                <video width="1024" height="644" controls>
                    <source src={require('../assets/prezentare.mp4')} type="video/mp4"/>
                        Your browser does not support the video tag.
                </video>
            </Box>
        </Box>
    )
}