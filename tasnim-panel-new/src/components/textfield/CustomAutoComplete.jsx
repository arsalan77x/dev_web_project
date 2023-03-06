import {Autocomplete} from '@mui/material'
import React, {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {CustomTextField} from './CustomTextField'
import PropTypes from 'prop-types'

export function CustomAutocomplete(props) {
    const {options, defaultValue, label, name, setData, optionValue} = props
    const [inputValue, setInputValue] = useState(defaultValue)
    async function changeField(value) {
        if (value) {
            setData((prev) => {
                return {...prev, [name]: optionValue ? value[optionValue] : value.label}
            })
            setInputValue(value)
        }
    }

    return (
        <Autocomplete
            getOptionLabel={(option) => option.name || ""}
            value={inputValue}
            options={options ? options : []}
            onChange={(e, value) => changeField(value)}
            popupIcon={<ExpandMoreIcon color="disabled" />}
            renderInput={(params) => <CustomTextField label={label} {...params} />}
        />
    )
}

CustomAutocomplete.propTypes = {
    setData: PropTypes.func,
    defaultValue: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    optionValue: PropTypes.string,
}
