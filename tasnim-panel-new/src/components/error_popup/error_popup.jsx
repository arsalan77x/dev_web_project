import {  Tooltip } from '@mui/material'
import React from 'react'
import {makeStyles} from '@mui/styles'

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: "#EB5757",
    },
    tooltip: {
      backgroundColor: "#EB5757",
      padding:'8px 12px',
      fontSize:'16px',
      borderRadius:'0px',
      marginTop:'-10px'
    },
  }));
export default function ErrorPopup(props) {
    const classes = useStylesBootstrap();
    return(
        <Tooltip classes={classes} {...props} disableHoverListener arrow>
            {props.children}
        </Tooltip>
    )
}