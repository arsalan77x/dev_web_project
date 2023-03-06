import {Box} from '@mui/material'
import React from 'react'
import { User } from '../User'

export function UserCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <User user={data} setUser={setData} />
        </Box>
    )
}
