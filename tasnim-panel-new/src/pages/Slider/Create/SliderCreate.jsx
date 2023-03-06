import {Box} from '@mui/material'
import React from 'react'
import {Slider} from '../Slider'

export function SliderCreate(props) {
    const {data, setData} = props
    return (
        <Box>
            <Slider slider={data} setSlider={setData} />
        </Box>
    )
}
