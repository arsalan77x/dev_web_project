import {Stack} from '@mui/material'
import React from 'react'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import {GridProducer} from '../../components/Table/GridProducer'
import {ImageUploader} from '../../components/textfield/ImageUploader'
import PropTypes from 'prop-types'

const RESOURCE = 'category'

export function Category(props) {
    const {category, setCategory} = props

    return (
        <Stack>
            <GridProducer
                sx={{marginBottom: '16px'}}
                data={[
                    <CustomTextField
                        name="name"
                        setData={setCategory}
                        resource={RESOURCE}
                        id={category._id}
                        label={'نام'}
                        defaultValue={category.name}
                    />,
                    <CustomTextField
                        name="order"
                        resource={RESOURCE}
                        setData={setCategory}
                        id={category._id}
                        label={'ترتیب'}
                        defaultValue={category.order}
                    />,
                    <CustomTextField
                        name="caption"
                        resource={RESOURCE}
                        setData={setCategory}
                        id={category._id}
                        label={'توضیحات'}
                        defaultValue={category.caption}
                    />,
                ]}
            />
            <ImageUploader
                resource="category"
                setData={setCategory}
                field="icon"
                defaultValue={category.icon}
            />
        </Stack>
    )
}

Category.propTypes = {
    category: PropTypes.object,
    setCategory: PropTypes.func,
}