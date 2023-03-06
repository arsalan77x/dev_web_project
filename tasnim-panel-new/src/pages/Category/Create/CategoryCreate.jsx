import {Box} from '@mui/material'
import React from 'react'
import {Category} from '../Category'

export function CategoryCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <Category category={data} setCategory={setData} />
        </Box>
    )
}
