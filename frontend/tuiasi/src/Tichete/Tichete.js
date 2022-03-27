import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Box, Typography, TextField, Button, TextareaAutosize, InputLabel, Select, MenuItem } from '@mui/material';
import Menu from '../Menu/Menu';
import { blue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Tichete.css'

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
            <Menu pageName="Semnalează o problemă"></Menu>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                <div className="register-card">
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextareaAutosize
                            maxRows={8}
                            label="Descriere"
                            aria-label="maximum height"
                            placeholder="Descrieti problema in cateva randuri. Zona in care scrieti textul se va mari."
                            style={{ width: '100%' }}
                        />
                        <InputLabel id="prioritate">Prioritate</InputLabel>
                        <Select
                            labelId="prioritate"
                            id="select-prioritate"
                            value="mica"
                            label="Age"
                            // onChange={handleChange}
                        >
                            <MenuItem value="mica">Mica</MenuItem>
                            <MenuItem value="medie">Medie</MenuItem>
                            <MenuItem value="mare">Mare</MenuItem>
                        </Select>
                    </Box>
                    <Button
                        style={{
                            marginBottom: '1%'
                        }}
                        variant="contained"
                        // onClick={() => register()}
                        disableElevation>
                        Trimite
                    </Button>
                </div>
            </Box>
        </Box>
    )
}