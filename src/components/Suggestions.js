import { Box,Typography,FormControl,FormLabel,FormGroup,FormControlLabel,Checkbox,Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useStyles } from './Globals/styles';
import {NavLink} from 'react-router-dom';

function Suggestions(props) {

    const styles = useStyles();
    const {values} = props;

    const [suggestions,setSuggestions] = React.useState([]);

    //fetching the sample endpoints
    React.useEffect(()=>{
        /*the original endpoint
        "/suggestions?employees={values.employee}&fromDate=${values.from_date}&toDate=${values.to_date}&officehoursStart={values.office_hours_start}&officehoursEnd={values.office_hours_end}&meetingLength=${values.meetingLength}"*/
        axios.get("./suggestions.json")
            .then((result)=>{
                setSuggestions(result.data.suggestions)
            })
            .catch((error)=>{
                return error
            })
    },[])

    return (
        <Box className={styles.page2}>
            <Typography variant="h4" className={styles.headerText}>Suggested Time Slots</Typography>
            {
                suggestions.map(item=>(
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
            }
            <Button
                to="/calendar"
                component={NavLink}
                className={styles.reserveButton}
            >
                <Typography variant={'paragraph'}>Reserve</Typography>
            </Button>
        </Box>
    )
}

export default Suggestions
