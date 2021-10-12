import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    outer: {
        width: '100%',
        height: '100vh',
        background: '#757de8',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        width: '80%',
        height: '500px',
        padding: '1rem',
        minHeight: '500px',
        borderRadius: '5px',
        background: '#FFF',
        color: '#2D3F4B',
        margin: 'auto',

        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

        '@media (max-width:800px)': {
            width: '90%',
            height: '100%',
            margin: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 0,
        },
    },
    headerText: {
        width: '100%',
        margin: '2rem 2rem',
    },
    inputControl: {
        minWidth: '300px',
        height: '50px',
        margin: '1.5rem',
        background: '#e6ebff',
    },
    dateField: {
        width: '300px',
        height: '40px',
        margin: '2rem',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    formControlBig: {
        width: '500px',
        minHeight: '50px',
        margin: '1.5rem',
        borderRadius: '5px',
        background: '#e6ebff',

        '@media (max-width:1440px)': {
            margin: '1rem',
        },
    },
    selectList: {
        width: '300px',
        height: '50px',
    },
    reserveButton: {
        width: '300px',
        borderRadius: '5px',
        height: '50px',
        backgroundColor: 'blue',
        color: '#FFF',
    },
})