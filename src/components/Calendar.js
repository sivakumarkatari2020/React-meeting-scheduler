import React from 'react';
import moment from 'moment';
import { Box } from '@mui/material';
import {useStyles} from './Globals/styles';
import {AppBar,Toolbar,IconButton,MenuList, MenuItem,Typography} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from 'react-router-dom';
import {Inject,ScheduleComponent,Day,WorkWeek,Month,Agenda,ResourcesDirective,ResourceDirective} from '@syncfusion/ej2-react-schedule';
//import axios from 'axios';

function Calendar() {

    const styles = useStyles();
    const [isNavOpen,setNavOpen] = React.useState(false);

    //sample data 
    const [localData,setlocalData] =  React.useState([{
            id: 1,
            subject: "First schedule",
            EndTime: new Date(2021,9,10,11,30),
            StartTime: new Date(2021,9,10,10,0),
            ResourceID: 1,
        },
        {
            id: 2,
            subject: "second schedule",
            EndTime: new Date(2021,9,12,13,30),
            StartTime: new Date(2021,9,12,13,0),
            ResourceID: 2,
        },
        {
            id: 3,
            subject: "third schedule",
            EndTime: new Date(2021,9,13,4,30),
            StartTime: new Date(2021,9,13,3,30),
            ResourceID: 3,
        },
        {
            id: 4,
            subject: "Fourth schedule",
            EndTime: new Date(2021,9,14,14,30),
            StartTime: new Date(2021,9,14,14,0),
            ResourceID: 4,
        }])

    const resourceDataSource = [
        {Name: 'John',Id:1,color:'#ea7a57'},
        {Name: 'Ron',Id:2,color:'#357CD2'},
        {Name: 'Billie',Id:3,color:'#7fa900'},
        {Name: 'lillie',Id:4,color:'#000000'},
    ]

    //Original data should be fetched here
    //React.useEffect(()=>{
    //    axios.get("url")
    //        .then((result)=>setlocalData(result.data))
    //        .catch((err)=>{
    //            return err
    //        })
    //},[])

    return (
        <Box className={styles.page}>
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
            <ScheduleComponent currentView='Month' selectedDate={moment()} eventSettings={{dataSource: localData}}>
                <ResourcesDirective >
                    <ResourceDirective field='ResourceID' title='Resource Name' name='Resources' textField='Name' idField='id' colorField='Color'></ResourceDirective>
                </ResourcesDirective>
                <Inject services={[Day,WorkWeek,Month,Agenda]} />
            </ScheduleComponent>
        </Box>
    )
}

export default Calendar
