import {Box} from '@mui/system'
import React from 'react'
import {Customer} from '../Customer'

export function CustomerCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <Customer customer={data} setCustomer={setData} />
        </Box>
    )
}
