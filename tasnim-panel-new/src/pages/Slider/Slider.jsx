import { Stack } from '@mui/material'
import React from 'react'
import {GridProducer} from '../../components/Table/GridProducer'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import {ImageUploader} from '../../components/textfield/ImageUploader'
import PropTypes from 'prop-types'

export function Slider(props) {
    const {slider, setSlider} = props
    return (
        <Stack>
            <GridProducer
                sx={{mb: '16px'}}
                data={[
                    <CustomTextField
                        name="title"
                        setData={setSlider}
                        label={'نام'}
                        defaultValue={slider.title}
                    />,
                ]}
            />
            <ImageUploader
                defaultValue={slider.pic_url}
                field="pic_url"
                resource="slider"
                setData={setSlider}
            />
        </Stack>
    )
}

Slider.propTypes = {
    slider: PropTypes.object,
    setSlider: PropTypes.func,
}
