import React from 'react';
import moment from 'moment';
import { Box } from '@mui/material';
import {useStyles} from './styles.js';
import NavigationBar from './NavigationBar';
import {Inject,ScheduleComponent,Day,WorkWeek,Month,Agenda,ResourcesDirective,ResourceDirective} from '@syncfusion/ej2-react-schedule';
//import axios from 'axios';

function Calendar() {

    const styles = useStyles();

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

    return (
        <Box className={styles.page}>
            <NavigationBar />
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
