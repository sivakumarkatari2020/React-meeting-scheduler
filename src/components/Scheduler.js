import React from 'react';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Autocomplete from '@mui/material/Autocomplete';
import {Box,FormControl,TextField,InputLabel,Select,MenuItem,Button, Typography, } from '@mui/material';
import {AppBar,Toolbar,IconButton,MenuList} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './Globals/styles';
import 'react-day-picker/lib/style.css';
import { Redirect,NavLink } from 'react-router-dom';

function Scheduler(props) {

    const {values,setValues} = props;
    const styles = useStyles();

    const [employeeData,setEmployeeData] = React.useState([]);
    const [isNavOpen,setNavOpen] = React.useState(false);

    //Getting employee data from local files
    React.useEffect(()=>{
        //original endpoint
        //"/employees?q=An"
        axios.get("./employee.json")
            .then((result)=>{
                setEmployeeData(result.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[])

    const submitHandle = () => {
        if(values.fromDate && values.toDate && values.MeetingLength > 0){
            <Redirect exact from='/scheduler' to='/suggestions' />
        }else{
            alert("Fill values first")
        }
    }

    return (
        <Box className={styles.outer}>
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
            <Box className={styles.inner}>
                <Typography variant="h4" className={styles.headerText}>Check for time slots</Typography>
                <FormControl 
                    className={
                        styles.inputControl
                    }
                >   
                    <DayPickerInput className={styles.dateField}
                        value={values.fromDate || ''}
                        onDayChange={day => setValues({...values,fromDate: day})} 
                        placeholder="Select Start Date"/>
                </FormControl>
                <FormControl 
                    className={
                        styles.inputControl
                    }
                >
                    <DayPickerInput className={styles.dateField}
                        value={values.toDate || ''}
                        onDayChange={day => setValues({...values,toDate: day})} 
                        placeholder="Select End Date"/>
                </FormControl>
                <Autocomplete
                    className={styles.formControlBig}
                    multiple
                    id="tags-outlined"
                    options={employeeData || ['none']}
                    getOptionLabel={(option) => {
                        return option.name
                    }}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select employees"
                            placeholder="Search for a user"
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
                    <TextField
                        id="input-hours-start"
                        name="officeHoursStart"
                        value={values.officeHoursStart || ''}
                        onChange={(e)=>setValues({...values,officeHoursStart: e.target.value})}
                        label="Office Hours Started"
                        variant="outlined"
                        className={styles.input}
                    />
                </FormControl>
                <FormControl className={styles.inputControl}>
                    <TextField
                        id="input-hours-end"
                        name="officeHoursEnd"
                        value={values.officeHoursEnd || ''}
                        onChange={(e)=>setValues({...values,officeHoursEnd: e.target.value})}
                        label="Office Hours Ended"
                        variant="outlined"
                        className={styles.input}
                    />
                </FormControl>
                <Button
                to="/calendar"
                component={NavLink}
                className={styles.reserveButton}
                >
                <Typography variant={'paragraph'}>Submit</Typography>
            </Button>
            </Box>
        </Box>
    )   
}

export default Scheduler
