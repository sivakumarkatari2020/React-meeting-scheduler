import React from 'react';
import {NavLink} from 'react-router-dom';
import {useStyles} from './Globals/styles.js';
import {Box,AppBar,Toolbar,IconButton,Typography,Stack,Button, MenuList, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import EventIcon from '@mui/icons-material/Event';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function Header(){

    const styles = useStyles();

    return(
        <Stack className={styles.header}>
            <Typography variant="h2" color="inherit" component="header">
                Meeting Scheduler
            </Typography>
        </Stack>
    )
}

function Body(){

    const styles = useStyles();

    return(
        <Box className={styles.body} centerRipple="true">
            <Box className={styles.card}>
                <Button className={styles.iconBox}>
                    <EventIcon className={styles.iconLG}/>
                </Button>
                <Button
                    to="/calendar"
                    component={NavLink}
                    className={styles.button}
                >
                    <Typography variant={'paragraph'}>View this week's schedule</Typography>
                </Button>
            </Box>
            <Box className={styles.card} >
                <Button className={styles.iconBox}>
                    <AddRoundedIcon className={styles.iconLG}/>
                </Button>
                <Button
                    to="/scheduler"
                    component={NavLink}
                    className={styles.button}
                >
                    <Typography variant={'paragraph'}>Schedule a new meeting</Typography>
                </Button>
            </Box>
        </Box>
    )
}

function HomePage() {

    const styles = useStyles();

    const [isNavOpen,setNavOpen] = React.useState(false);

    return (
        <Box className={styles.page} sx={{ flexGrow: 1 }}>
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
                    </MenuList>
                    : ''
                }
            </Box>
            <Header />
            <Body />
        </Box>
    )
}

export default HomePage
