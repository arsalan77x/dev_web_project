import {Box} from '@mui/system'
import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Stack, TextField} from '@mui/material'
import {DateFilter} from '../textfield/DateFilter'
import {CustomTextField} from '../textfield/CustomTextField'

export function CustomFilter(props) {
    const {filtersData, setParams} = props
    const [textFieldData, setTextfieldData] = useState({})
    const handleChange = (event, item) => {
        setTextfieldData({[item.field]: event.target.value})
        setParams((params) => {
            let filters = params.filter
            return {
                ...params,
                filter: {
                    ...filters,
                    [item.field]: event.target.value,
                },
            }
        })
    }
    return (
        <Stack direction={'row'}>
            {filtersData.map((item, index) => (
                <>
                    {item.type === 'date' ? (
                        <DateFilter
                            label={item.label}
                            field={item.field}
                            item={item}
                            setParams={setParams}
                        />
                    ) : (
                        <CustomTextField
                            value={textFieldData[item.field]}
                            onChange={(e) => handleChange(e, item)}
                            label={item.label}
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                    )}
                    {filtersData.length - 1 !== index && <Box width="8px" />}
                </>
            ))}
        </Stack>
    )
}

CustomFilter.propTypes = {
    filtersData: PropTypes.array,
}
