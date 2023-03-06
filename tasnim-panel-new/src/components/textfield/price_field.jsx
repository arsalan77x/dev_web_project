import { Box, TextField } from "@mui/material"
import React from "react"
import { withStyles } from "@mui/styles";

function PriceField(props) {
    return (
        <EstimateField variant="outlined" {...props} />
    )
}
const EstimateField = withStyles({
    root: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            height: '48px',
            backgroundColor: 'white',
            fontWeight: 700,
            borderRadius: '0px',
            "& .MuiOutlinedInput-notchedOutline": {
                border: "none"
            },
        },
    },

})(TextField)

export default PriceField