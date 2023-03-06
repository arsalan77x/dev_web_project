import {createTheme} from '@mui/material/styles'
import {faIR} from '@mui/material/locale'

export const AppTheme = createTheme(
    {
        direction: 'rtl',
        typography: {
            fontFamily: 'Yekan',
            button: {
                textTransform: 'none',
            },
            subtitle1: {
                fontSize: '24px',
                lineHeight: '29px',
            },
            subtitle2: {
                fontSize: '20px',
                lineHeight: '24px',
            },
            h6: {
                fontSize: '18px',
                lineHeight: '26px',
            },
            body1: {
                lineHeight: '20px',
                fontSize: '16px',
            },
            body2: {
                lineHeight: '17px',
                fontSize: '14px',
            },
            caption: {
                lineHeight: '15px',
                fontSize: '12px',
            },
        },
        palette: {
            primary: {
                light: '#33c9dc',
                main: '#00bcd4',
                dark: '#008394',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff8b33',
                main: '#ff6f00',
                dark: '#b24d00',
                contrastText: '#000',
            },
            text: {
                primary: '#2A303B',
            },
        },
    },
    faIR,
)
