import {setError} from '../redux/error_slice'
import {store} from '../redux/store'

export const ErrorHandler = (data) => {
    if (data.status !== 200) {
        store.dispatch(setError({open: true, message: data.message, state: 'error'}))
    }
}
