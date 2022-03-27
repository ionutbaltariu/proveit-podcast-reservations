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
import { useNavigate } from 'react-router-dom';



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

const rows = {};

export default function Profil(props) {
    const today = new Date();
    const drawerWidth = 220;
    let navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [token, setToken] = useState();

    if (!token) {
        navigate('/login');
    }


    useEffect(() => {
        let jwt = localStorage.getItem('token');
        setToken(jwt);

        if (jwt) {
            fetch("http://172.20.98.67:7070/api/users/coordinators", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
            })
                .then(response => response.json())
                .then(json => {
                    json.forEach(programare => {
                        console.log(programare);
                    })

                    setRows(json)

                })
        }

    }, [])


    return (
        <Box sx={{ display: 'flex' }}>
            <Menu pageName="Administratori"></Menu>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Facultate</StyledTableCell>
                                <StyledTableCell align="left">Email</StyledTableCell>
                                <StyledTableCell align="left">Telefon</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.idUser}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.facultate}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                                    <StyledTableCell align="left">{row.telefon}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}