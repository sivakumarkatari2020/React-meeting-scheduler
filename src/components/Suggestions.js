import { Box,Typography,FormControl,FormLabel,FormGroup,FormControlLabel,Checkbox,Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useStyles } from './styles.js';
import {NavLink} from 'react-router-dom';
import NavigationBar from './NavigationBar';
import Loader from './Loader.js';

function Suggestions(props) {

    const styles = useStyles();
    const {values} = props;

    const [suggestions,setSuggestions] = React.useState([]);

    //fetching the sample endpoints
    React.useEffect(()=>{
        const url = `https://stark-castle-84894.herokuapp.com/suggestions?employees=248086622848468681706182205280565990732&employees=246529435182890502343890064029443600078&fromDate=2015-01-20&toDate=2015-01-22&officehoursStart=8%3A00&officehoursEnd=17%3A00&meetingLength=60`;
        console.log(values);
        axios.get(url)
            .then((result)=>{
                setSuggestions(result.data.suggestions)
            })
            .catch((error)=>{
                return error
            })
    },[])

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
                <Button
                    to="/calendar"
                    component={NavLink}
                    className={styles.reserveButton}
                >
                    <Typography variant={'paragraph'}>Reserve</Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default Suggestions
