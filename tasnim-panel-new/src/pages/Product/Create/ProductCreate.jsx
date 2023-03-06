import {Box} from '@mui/system'
import React from 'react'
import {Product} from '../Product'

export function ProductCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <Product product={data} setProduct={setData} />
        </Box>
    )
}
