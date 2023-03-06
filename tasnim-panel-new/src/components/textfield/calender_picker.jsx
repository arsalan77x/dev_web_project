import React, { useState } from "react"
import moment from "moment";
import DatePicker from '@material-ui/lab/DatePicker';
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { withStyles } from "@mui/styles"
import { styled } from "@mui/material/styles"

function CalendarTextField(props1) {
    const [selectedDate, setSelectedDate] = useState(moment(props1.date).isValid() ? props1.date : null);

    const handleDateChange = (date) => {
        // if (e == null || !e._isValid) return
        let newDate
        if (date == null) {
            setSelectedDate(null);
            let event = {}
            event.target = {}
            event.target.value = null
            if (props1.onDateChange) props1.onDateChange(event)
            return
        } 
        // else if(!date.isValid()) return
        newDate = moment(!date.isValid() ? date._i : date)
        // .set({hour:0,minute:0,second:4,millisecond:0})
        .format()
        setSelectedDate(newDate);
        let event = {}
        event.target = {}
        event.target.value = newDate
        if (props1.onDateChange) props1.onDateChange(event)
    };

    return (
        <DatePicker
            value={selectedDate}
            inputFormat="DD.MM.yyyy"
            mask="__.__.____"
            onChange={handleDateChange}
            renderInput={({ inputRef, inputProps, InputProps, ...params }) =>
                <MyTextField
                    id={props1.id}
                    InputProps={
                        {
                            endAdornment: (
                                <InputAdornment position="end" >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        {(selectedDate !== null && selectedDate) &&
                                            <IconButton sx={{ padding: "0px", marginRight: '-10px' }} onClick={(e) => handleDateChange(null)}>
                                                <ClearIcon />
                                            </IconButton>}
                                        {InputProps?.endAdornment}
                                    </Box>
                                </InputAdornment>
                            ),
                            // readOnly: true
                        }}
                    {...params}
                    helperText={null}
                    {...inputProps}
                    placeholder={props1.placeholder}
                    ref={inputRef}
                />}
        />
    )
}

const MyTextField = styled(TextField)({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        "&.Mui-error + fieldset": {
            border: "1px solid green"
        },
        fontWeight: '500',
        height: '48px',
        backgroundColor: 'white',
        borderRadius: '0px',
        '& fieldset': {
            border: '1px solid #E4E7ED',
        },
        '&.Mui-focused + fieldset': {
            border: '1px solid #2A303B'
        },
    },

})
// const MyTextField = withStyles({
//     root: {
//         width: '100%',
//         '& input:invalid + fieldset': {
//             borderColor: 'red',
//             borderWidth: 2,
//           },
//         '& .MuiOutlinedInput-root': {
//             '&.Mui-focused': {
//                 border: '1px solid #2A303B'
//             },
//             "& .Mui-error": {
//                 border: "1px solid #EB5757"
//             },
//             fontWeight: '500',
//             height: '48px',
//             backgroundColor: 'white',
//             borderRadius: '0px',
//             "& .MuiOutlinedInput-notchedOutline": {
//                 border: "none"
//             },
//             border: '1px solid #E4E7ED',
//         },
//     },

// })(TextField)

export default CalendarTextField