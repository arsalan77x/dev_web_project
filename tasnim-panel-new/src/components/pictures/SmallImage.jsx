import {Box} from '@mui/system'
import React from 'react'
import PropTypes from 'prop-types'
import {APP_URL} from '../../core/APP_URL'

export function SmallImage(props) {
    const {url} = props

    return <Box component={'img'} width="70px" height="70px" src={APP_URL + '/api/v2' + url} />
}

SmallImage.propTypes = {
    url: PropTypes.string,
}
