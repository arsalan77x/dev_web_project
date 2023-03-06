import React, { useContext } from 'react'
import Backdrop from '@mui/material/Backdrop';
import {ProgressBar} from "./progress"
import { useSelector } from 'react-redux';

function LoadingBackdrop(props) {
    const error = useSelector(state => state.error)
    return (
        <div>
            <Backdrop open={error.loading} style={{zIndex:10000}}>
                <ProgressBar white />
            </Backdrop>
        </div>
    )
}

export default LoadingBackdrop