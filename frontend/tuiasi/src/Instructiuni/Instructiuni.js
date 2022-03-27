import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

import Menu from '../Menu/Menu';

const { useState, useEffect, Fragment } = React


export default function Instructiuni(props) {
    const today = new Date();
    const drawerWidth = 220;

    let jwt = localStorage.getItem("token");

    useEffect(() => {
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
            </Box>
        </Box>
    )
}