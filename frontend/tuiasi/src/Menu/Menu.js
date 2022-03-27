import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuList from '../MenuList/MenuList';
import PropTypes from 'prop-types';

export default function Menu({ pageName }) {
    const drawerWidth = 220;

    return (
        <div>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        {pageName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <img src={require('../assets/logo.png')} style={{
                    padding: '10%'
                }}/>
                <Divider />
                <MenuList></MenuList>

            </Drawer>
        </div>
    )
}

Menu.propTypes = {
    pageName: PropTypes.string
}