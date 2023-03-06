import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {Divider, IconButton, Stack, Typography} from '@mui/material'
import PropTypes from 'prop-types'

export function ModalHeader(props) {
    const {setOpen, title} = props
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Stack position="sticky" top={0} zIndex={10}>
            <Stack direction="row" alignItems="center" padding="12px" spacing={2} bgcolor="white">
                <IconButton onClick={handleClose}>
                    <CloseIcon style={{color: '#B6BFCF'}} />
                </IconButton>
                <Typography variant="subtitle1" fontWeight={700}>
                    {title}
                </Typography>
            </Stack>
            <Divider />
        </Stack>
    )
}

ModalHeader.propTypes = {
    title: PropTypes.string,
    setOpen: PropTypes.func,
}
