import React from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Autocomplete from '@mui/material/Autocomplete';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Box,FormControl,TextField,InputLabel,Select,MenuItem,Button, Typography, } from '@mui/material';
import { useStyles } from './styles.js';
import 'react-day-picker/lib/style.css';
import { useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Loader from './Loader.js';

function Scheduler(props) {

    const history = useHistory();

    const {values,setValues} = props;
    const styles = useStyles();

    const [employeeData,setEmployeeData] = React.useState([]);
    const [isSubmit,setSubmit] = React.useState(false);

    const submitHandle = () => {
        if(values.fromDate && values.toDate && values.MeetingLength > 0){
            setSubmit(true);
            history.push("/suggestions");
        }else{
            setSubmit(false);
            alert("Fill values first")
        }
    }

    const getEmployee = (query) => {
        if(query.length > 1){
            axios.get(`https://stark-castle-84894.herokuapp.com/employees?q=${query}`)
                .then((result)=>{
                    setEmployeeData(result.data.matches);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    }

    return (
        <Box className={styles.outer}>
            {
                isSubmit
                ? <Loader />
                :   <>
                    <NavigationBar />
                    <Box className={styles.inner}>
                        <Typography variant="h4" className={styles.headerText}>Check for time slots</Typography>
                        <FormControl 
                            className={
                                styles.inputControl
                            }
                        >   
                            <DayPickerInput className={styles.dateField}
                                value={values.fromDate || ''}
                                onDayChange={day => setValues({...values,fromDate: dateFormat(day,"yyyy-mm-dd")})} 
                                placeholder="Select Start Date"/>
                        </FormControl>
                        <FormControl 
                            className={
                                styles.inputControl
                            }
                        >
                            <DayPickerInput className={styles.dateField}
                                value={values.toDate || ''}
                                onDayChange={day => setValues({...values,toDate: dateFormat(day,"yyyy-mm-dd")})} 
                                placeholder="Select End Date"/>
                        </FormControl>
                        <Autocomplete
                            className={styles.formControlBig}
                            multiple
                            id="tags-outlined"
                            options={employeeData || ["name:loading..."]}
                            getOptionLabel={(option) => {
                                return option.name
                            }}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select employees"
                                    placeholder="Search for a user"
                                    onChange={(e)=>getEmployee(e.target.value)}
                                />
                            )}
                        />
                        <FormControl variant="filled" className={styles.InputControl}>
                            <InputLabel id="select-meeting-length">Select Desired Meeting Length</InputLabel>
                            <Select
                                labelId="select-meeting-length"
                                id="select-meetingLength"
                                name="country"
                                value={values.MeetingLength}
                                onChange={(e)=>setValues({...values,MeetingLength:e.target.value})}
                                className={styles.selectList}
                            >
                                <MenuItem value={30}>30 min</MenuItem>
                                <MenuItem value={60}>1 Hour</MenuItem>
                                <MenuItem value={90}>1 and Half Hour</MenuItem>
                                <MenuItem value={120}>2 Hours</MenuItem>
                                <MenuItem value={150}>2 and Half Hours</MenuItem>
                                <MenuItem value={180}>3 Hours</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={styles.inputControl}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    ampmInClock
                                    views={['hours','minutes']}
                                    id="inpt-hours-start"
                                    name="officeHoursStart"
                                    label="Office Hours Started"
                                    value={values.officeHoursStart || ''}
                                    onChange={(newValue) => {
                                        setValues({...values,officeHoursStart: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl className={styles.inputControl}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    ampmInClock
                                    views={['hours','minutes']}
                                    id="inpt-hours-end"
                                    name="officeHoursEnd"
                                    label="Office Hours End on"
                                    value={values.officeHoursEnd || ''}
                                    onChange={(newValue) => {
                                        setValues({...values,officeHoursEnd: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <Button
                        className={styles.reserveButton}
                        onClick={submitHandle}
                        >
                        <Typography variant={'paragraph'}>Submit</Typography>
                    </Button>
                    </Box>
                    </>
            }
        </Box>
    )   
}

export default Scheduler
