import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    page: {
        height: '100vh',
        background: '#f2f2f2',
    },
    header:{
        width: '100%',
        height: '40vh',
        background: '#757de8',
        color: '#FFF',
        textAlign: 'center',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper:{
        width: '100%',

        position: 'relative',
    },
    AppBar: {
        boxShadow: 'none',
        background: '#3f51b5',
    },
    body: {
        width: '100%',
        height: '50vh',

        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '200px',
        height: '250px',
        maxWidth: '200px',
        minHeight: '250px',
        margin: '0 2rem',

        background: '#e6ebff',
        boxShadow: 'none',
        borderRadius: '5px',
        transition: '0.5s',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',

        "&:hover": {
            background: '#e6ebff',
        }
    },
    iconBox: {
        width: '80%',
        height: '50%',

        borderRadius: '5px',
    },
    iconLG: {
        fontSize: '5rem',
        transform: 'scale(4)',
        color: '#8c9eff',
    },
    button: {
        width: '80%',
        borderRadius: '5px',
    },
    menuList: {
        position: 'absolute',
        top: 0,
        zIndex: '999',
    },
    stepperOut: {
        height: '100vh',
        background: '#f2f2f2',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepper: {
        width: '90%',
        height: '90%',

        maxWidth: '600px',
        maxHeight: '600px',

    },
})

