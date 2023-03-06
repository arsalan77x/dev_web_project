import React from 'react'
import {alpha, styled} from '@mui/material/styles'
import {TextField} from '@mui/material'
import PropTypes from 'prop-types'

export const CustomTextField = styled(({setData, change, ...props}) => {
    async function changeField(event) {
        if(!change) {
            setData((prev) => {
                return {...prev, [event.target.name]: event.target.value}
            })
        }
        change(event)
    }
    return (
        <TextField
            onChange={changeField}
            InputProps={{disableUnderline: true}}
            variant="filled"
            fullWidth
            {...props}
        />
    )
})(({theme}) => ({
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}))

CustomTextField.propTypes = {
    setData: PropTypes.func,
    change: PropTypes.func,
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
}
