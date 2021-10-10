import React from 'react';
import moment from 'moment';
import {Inject,ScheduleComponent,Day,WorkWeek,Month,Agenda} from '@syncfusion/ej2-react-schedule';
//import { EventSettingsModel } from '@syncfusion/ej2-schedule';
import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data'

function Calendar() {

    //const localData = EventSettingsModel({
    //    dataSource: [{
    //        EndTime: new Date(2021,0,11,6,30),
    //        StartTime: new Date(2021,0,11,4,0),
    //    },
    //    {
    //        EndTime: new Date(2021,0,12,8,30),
    //        StartTime: new Date(2021,0,12,7,0),
    //    },
    //    {
    //        EndTime: new Date(2021,0,13,6,30),
    //        StartTime: new Date(2021,0,13,4,0),
    //    },
    //    {
    //        EndTime: new Date(2021,0,14,8,30),
    //        StartTime: new Date(2021,0,14,8,0),
    //    }]
    //})

    return (
        <ScheduleComponent currentView='Month' selectedDate={moment()}>
            <Inject services={[Day,WorkWeek,Month,Agenda]} />
        </ScheduleComponent>
    )
}

export default Calendar
