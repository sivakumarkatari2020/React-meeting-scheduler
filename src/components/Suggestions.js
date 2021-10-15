import { Box,Typography,FormControl,FormLabel,FormGroup,FormControlLabel,Checkbox,Button } from '@mui/material';
import axios from 'axios';
import {toast} from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { useStyles } from './styles.js';
import {NavLink,useHistory} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Loader from './Loader.js';

toast.configure();

function Suggestions(props) {

    const styles = useStyles();
    const {values} = props;
    const history = useHistory();

    const [suggestions,setSuggestions] = React.useState([]);
    const [isSuccess,setSuccess] = React.useState(false);

    const notifySuccessfulFetch = () => {
        toast.success("Successfully fetched the data!",{
            autoClose: 2000,
        });
    }

    const notifySuccessfulSchedule = () => {
        toast.success("Successfully booked your slots!",{
            autoClose: 2000,
        })
    }

    const notifyEmptySuggestions = () => {
        toast.warn("No slots for this combo,change the dates or employes!");
        toast.info("You're being redirected back to scheduler ")
    }

    //fetching the sample endpoints
    React.useEffect(()=>{

        let fromDate=moment(values.fromDate).format('YYYY-MM-DD');
        let toDate=moment(values.toDate).format('YYYY-MM-DD');
        let startTime=moment(values.officeHoursStart).format('HH:mm');
        let endTime=moment(values.officeHoursEnd).format('HH:mm');
        let meetingLength=values.MeetingLength;
        let employeeString = '';

        if(values.employees.length > 1){
            values.employees.forEach((emp)=>{
                employeeString = employeeString + `employees=${emp.id}&`;
            })
        }else{
            employeeString = `employees=${values.employees[0].id}&`;
        }

        console.log(values)

        const url = `https://stark-castle-84894.herokuapp.com/suggestions?${employeeString}fromDate=${fromDate}&toDate=${toDate}&officehoursStart=${startTime}&officehoursEnd=${endTime}&meetingLength=${meetingLength}`;

        axios.get(url)
            .then((result)=>{
                if(result.status === 200){
                    notifySuccessfulFetch();
                    setSuccess(true);
                    setSuggestions(result.data.suggestions)
                }else{
                    notifyEmptySuggestions();
                }
            })
            .catch((error)=>{
                setSuccess(false);
                toast.error(error.message,{
                    autoClose: 2000,
                })
                toast.info("You will redirected to back!",{
                    autoClose: 2000,
                })
                setTimeout(()=>{
                    history.push("/scheduler");
                },2000)
            })
    },[history, values, values.MeetingLength, values.employees, values.fromDate, values.officeHoursEnd, values.officeHoursStart, values.toDate])

    return (
        <Box className={styles.page2}>
            <NavigationBar />
            <Box className={styles.suggestionsBody}>
                <Typography variant="h4" className={styles.headerTextBig}>Suggested Time Slots</Typography>
                {
                    suggestions.length > 0
                    ? suggestions.map(item=>(
                        <Box className={styles.dayScheduleBox} key={item.date}>
                            <FormControl className={styles.formControlXL}>
                                <FormLabel component="legend">Available slots on {item.date}</FormLabel>
                                    <FormGroup className={styles.chkGroup} required>
                                        {
                                            item.start_times.map(day => (
                                                <FormControlLabel
                                                    key={day}
                                                    control={<Checkbox checked={values.can_view} name="can_view" className={styles.checkbox}/>}
                                                    label={day}
                                                />    
                                            ))
                                        }
                                    </FormGroup>
                            </FormControl>
                        </Box>
                    ))
                    : <Loader />
                }
                {
                    isSuccess
                    ?  <Button
                        to="/calendar"
                        component={NavLink}
                        className={styles.reserveButton}
                        onClick={notifySuccessfulSchedule}
                    >
                        <Typography variant={'paragraph'}>Reserve</Typography>
                    </Button>
                    :  <Button
                        className={styles.reserveButton}
                        disabled
                    >
                        <Typography variant={'paragraph'}>Reserve</Typography>
                    </Button>
                }
            </Box>
        </Box>
    )
}

export default Suggestions
