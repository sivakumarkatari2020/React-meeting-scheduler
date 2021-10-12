import React from 'react';
import {NavLink} from 'react-router-dom';
import {useStyles} from './styles.js';
import {Box,Typography,Stack,Button} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import NavigationBar from './NavigationBar.js';

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
                    <Typography variant={'paragraph'} align={'center'}>View this week's schedule</Typography>
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
                    <Typography variant={'paragraph'} align={'center'}>Schedule a new meeting</Typography>
                </Button>
            </Box>
        </Box>
    )
}

function HomePage() {

    const styles = useStyles();


    return (
        <Box className={styles.page} sx={{ flexGrow: 1 }}>
            <NavigationBar />
            <Header />
            <Body />
        </Box>
    )
}

export default HomePage
