import React, {useContext} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import {useDispatch, useSelector} from 'react-redux'
import { setError } from '../../redux/error_slice'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function ErrorSnackbar(props) {
    const error = useSelector((state) => state.error)
    const dispatch = useDispatch()
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setError({open: false, message: error.message}))
    }
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error.open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={error.state === 'success' ? 'success' : 'error'}
                >
                    {error.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ErrorSnackbar
