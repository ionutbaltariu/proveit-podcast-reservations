import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EventIcon from '@material-ui/icons/Event';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';

import { useNavigate } from "react-router-dom";


export default function MenuList() {
    const routeTo = (path) => navigate(path);
    let navigate = useNavigate();

    const routeToAppointments = routeTo.bind(null, '/dashboard');
    const routeToProfile = routeTo.bind(null, '/profil');
    const routeToAdministrators = routeTo.bind(null, '/administratori');
    const routeToTickets = routeTo.bind(null, '/raportare-problema');
    const routeToHelp = routeTo.bind(null, '/instructiuni');

    return (
        <List>
            <ListItem button>
                <ListItemIcon><AccountBoxIcon style={{ color: '#2196f3' }} /></ListItemIcon>
                <ListItemText primary="Profil" onClick={routeToProfile} />
            </ListItem>

            <ListItem button>
                <ListItemIcon><InfoIcon style={{ color: '#2196f3' }} /></ListItemIcon>
                <ListItemText primary="Instrucțiuni" onClick={routeToHelp} />
            </ListItem>

            <ListItem button>
                <ListItemIcon><EventIcon style={{ color: '#2196f3' }} /></ListItemIcon>
                <ListItemText primary="Rezervări" onClick={routeToAppointments} />
            </ListItem>

            <ListItem button>
                <ListItemIcon><SettingsApplicationsIcon style={{ color: '#2196f3' }} /></ListItemIcon>
                <ListItemText primary="Administratori" onClick={routeToAdministrators} />
            </ListItem>

            <ListItem button>
                <ListItemIcon><ErrorIcon style={{ color: '#ff6565' }} /></ListItemIcon>
                <ListItemText primary="Semnalează o problemă" onClick={routeToTickets} />
            </ListItem>

            <ListItem button>
                <ListItemIcon><ExitToAppIcon style={{ color: '#ff6565' }} /></ListItemIcon>
                <ListItemText primary="Deconectare" onClick={() => {
                    localStorage.removeItem("token");
                    navigate('/login');
                    }}/>
            </ListItem>
        </List>
    )
}