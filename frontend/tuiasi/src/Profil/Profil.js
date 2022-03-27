import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Menu from '../Menu/Menu';


const { useState, useEffect, Fragment } = React

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1976d2',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Profil(props) {
    const today = new Date();
    const drawerWidth = 220;

    let jwt = localStorage.getItem("token");

    const [profileData, setProfileData] = useState([]);
    const [podcastData, setPodcastData] = useState([]);

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

                fetch("http://172.20.98.67:7070/api/users/" + json.idUser, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setProfileData(data)
                    })


                fetch("http://172.20.98.67:7070/api/podcast/programari?idUser=" + json.idUser, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${jwt}`
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log("Rezervari anterioare", data)
                        setPodcastData(data)
                    })


            })
    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <Menu pageName="Profil"></Menu>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

                <div>
                    <h1>Date personale</h1>
                    <b>Email</b>: {profileData.email}
                    <br></br>
                    <b>Facultate</b>: {profileData.facultate}
                    <br></br>
                    <b>Telefon</b>: {profileData.telefon}
                </div>

                <h1>Rezervări anterioare</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>De la</StyledTableCell>
                                <StyledTableCell align="left">Pana la</StyledTableCell>
                                <StyledTableCell align="left">Scop</StyledTableCell>
                                <StyledTableCell align="left">Stare</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {podcastData.map((row) => (
                                <StyledTableRow key={row.idProgramare}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.dataStart}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.dataStop}</StyledTableCell>
                                    <StyledTableCell align="left">{row.scop}</StyledTableCell>
                                    <StyledTableCell align="left">{row.stare}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}