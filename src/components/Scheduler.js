import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from '@mui/lab/DatePicker';
import {Box,FormControl,TextField,InputLabel,Select,MenuItem,Button, Typography, } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { NavLink } from 'react-router-dom';
import Loader from './Loader.js';
import NavigationBar from './NavigationBar';
import {useStyles} from './formStyles';

toast.configure();

function Scheduler(props) {

    const {values,setValues} = props;
    const styles = useStyles();

    const isVerified = values.fromDate && values.toDate && values.MeetingLength && values.officeHoursStart && values.officeHoursEnd;

    const [employeeData,setEmployeeData] = React.useState([]);
    const [isSubmit,setSubmit] = React.useState(false);

    const notifyQueryLength = () => {
        toast.info('Enter atleast 2 charecters!',{
            autoClose: 2000,
        });
    }

    const notifyFillForm = (msg) => {
        toast.warn(msg,{
            autoClose: 2000,
        });
    }

    const employDataNotify = () => {
        toast.error('No Employee Found!',{
            autoClose: 3000,
        })
    }

    const notifyRequestFailure = (msg) => {
        toast.error(msg);
    }

    const submitHandle = () => {
        if(values.fromDate && values.toDate && values.MeetingLength > 0 && values.employees.length > 0){
            console.log(values);
            setSubmit(true);
        }else{
            setSubmit(false);
            notifyFillForm("Fill the form to continue!");
        }
    }

    const getEmployee = (query) => {
        if(query.length > 1){
            axios.get(`https://stark-castle-84894.herokuapp.com/employees?q=${query}`)
                .then((result)=>{
                    if(result.data.matches.length < 1){
                        employDataNotify();
                    }else{
                        setEmployeeData(result.data.matches);
                    }
                })
                .catch((err)=>{
                    notifyRequestFailure(err.message);
                })
        }else if(query.length === 1){
            notifyQueryLength();
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select Start Date"
                                    value={values.fromDate || ''}
                                    onChange={(newValue) => {
                                        setValues({...values,fromDate: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                        <FormControl 
                            className={
                                styles.inputControl
                            }
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select End Date"
                                    value={values.toDate || ''}
                                    onChange={(newValue) => {
                                        setValues({...values,toDate: newValue});
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
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
                            onChange={(event, value) => setValues({...values,employees: value})} // prints the selected value
                        />
                        <FormControl variant="filled" className={styles.inputControl}>
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
                        {
                            isVerified
                            ?   <Button
                                    to="/suggestions"
                                    component={NavLink}
                                    className={styles.reserveButton}
                                    onClick={submitHandle}
                                    >
                                    <Typography variant={'paragraph'}>Submit</Typography>
                                </Button>
                            :   <Button 
                                    onClick={submitHandle}
                                    className={styles.reserveButton}
                                >Submit</Button>
                        }
                    </Box>
                    </>
            }
        </Box>
    )   
}

export default Scheduler
