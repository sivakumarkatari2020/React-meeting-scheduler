import React from 'react';
import {Box,Typography,AppBar,Toolbar,IconButton,MenuList, MenuItem} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from 'react-router-dom';
import { useStyles } from './styles.js';

function NavigationBar() {

    const styles = useStyles();

    const [isNavOpen,setNavOpen] = React.useState(false);

    return (
        <Box className={styles.wrapper}>
                <AppBar position="static" className={styles.AppBar}>
                    <Toolbar variant="dense" className={styles.AppBar} onClick={()=>{setNavOpen(!isNavOpen)}}>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            {
                                isNavOpen
                                ?  <ClearIcon />
                                :  <MenuIcon /> 
                            }
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            Buffer & Bag AB
                        </Typography>
                    </Toolbar>
                </AppBar>
                {
                    isNavOpen
                    ? <MenuList className={styles.menuList}>
                        <MenuItem 
                            component={NavLink}
                            to="/calendar"
                        >
                            Calendar
                        </MenuItem>
                        <MenuItem 
                            component={NavLink}
                            to="/scheduler"
                        >
                            scheduler
                        </MenuItem>
                        <MenuItem 
                            component={NavLink}
                            to="/home"
                        >
                            Home
                        </MenuItem>
                    </MenuList>
                    : ''
                }
            </Box>
    )
}

export default NavigationBar
