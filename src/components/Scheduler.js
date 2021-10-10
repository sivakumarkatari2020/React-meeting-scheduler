import React from 'react';
import { useHistory} from 'react-router';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {Box,FormControl,TextField,Grid,InputBase,InputLabel,Select,MenuItem,Button, Typography, } from '@mui/material';
import { useStyles } from './Globals/styles';
import 'react-day-picker/lib/style.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

function UserDetails() {


    const styles = useStyles();

    const [searchName,setsearchName] = React.useState('');
    const [data,setData] = React.useState(false);
    const [values,setValues] = React.useState({
        employees: [],
        fromDate: '',
        toDate: '',
        officeHoursStart: '',
        officeHoursEnd: '',
        MeetingLength: 30,
    });

    return (
        <Box className={styles.inner}>
            <Typography variant="h4" className={styles.headerText}>Check for time slots</Typography>
            <FormControl 
                className={
                    styles.formControl
                }
            >   
                <InputLabel>Start Date</InputLabel>
                <DayPickerInput className={styles.inputField}
                    value={values.fromDate}
                    onDayChange={day => setValues({...values,fromDate: day})} />
            </FormControl>
            <FormControl 
                className={
                    styles.formControl
                }
            >
                <InputLabel>End Date</InputLabel>
                <DayPickerInput className={styles.inputField}
                    onDayChange={day => setValues({...values,toDate: day})} />
            </FormControl>
            <FormControl 
                className={styles.formControl}
                >
                <Grid container spacing={1} alignItems="flex-end" className={styles.inputBox}>
                    <Grid item xs={10}>
                        <InputBase 
                            id="input-search" 
                            placeholder=""
                            inputProps={{ 'aria-label': 'naked' }}
                            className={styles.input}
                            onChange={(e) => setsearchName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <AddRoundedIcon />
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl variant="filled" className={styles.formControl}>
                <InputLabel id="select-meeting-length">Select Desired Meeting Length</InputLabel>
                <Select
                    labelId="select-country-label"
                    id="select-country"
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
            <FormControl className={styles.formControl}>
                <TextField
                    id="input-hours-start"
                    name="officeHoursStart"
                    value={values.officeHoursStart}
                    onChange={(e)=>setValues({...values,officeHoursStart: e.target.value})}
                    label="Office Hours Started"
                    variant="outlined"
                    className={styles.input}
                />
            </FormControl>
            <FormControl className={styles.formControl}>
                <TextField
                    id="input-hours-end"
                    name="officeHoursEnd"
                    value={values.officeHoursEnd}
                    onChange={(e)=>setValues({...values,officeHoursEnd: e.target.value})}
                    label="Office Hours Ended"
                    variant="outlined"
                    className={styles.input}
                />
            </FormControl>
            <Button>
                Check
            </Button>
        </Box>
    )   
}

export default UserDetails
