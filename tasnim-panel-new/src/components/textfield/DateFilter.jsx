import React, {useState} from 'react'
import DatePicker from '@mui/lab/DatePicker'
import {TextField} from '@mui/material'
import moment from 'moment'
import flat from 'flat'
import {CustomTextField} from './CustomTextField'
import PropTypes from 'prop-types'

export function DateFilter(props) {
    const {setParams, noFilter, label, field, defaultValue, onChange} = props
    const [selectedDate, setSelectedDate] = useState(defaultValue ?? null)
    const handleDate = (newValue) => {
        if (!noFilter) {
            setParams((filter) => {
                let date = flat.flatten(filter.date ?? {})
                let retValue = {...filter, date: {...date}}
                if (newValue) {
                    retValue.date = {
                        ...flat.unflatten({...date, [field]: newValue}),
                    }
                }
                return retValue
            })
        } else {
            onChange(newValue)
        }
        console.log(newValue)
        setSelectedDate(newValue)
    }

    return (
        <DatePicker
            value={selectedDate}
            mask="____/__/__"
            onChange={handleDate}
            label={label}
            clearable
            clearText="پاک کردن"
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    // placeholder={item.label}
                    sx={{
                        flexGrow: 1,
                        // direction: 'rtl'
                    }}
                />
            )}
        />
    )
}

DateFilter.propTypes = {
    noFilter: PropTypes.bool,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    label: PropTypes.string
}
