import {Box} from '@mui/system'
import React from 'react'
import PropTypes from 'prop-types'
import {DataProvider} from '../../core/DataProvider'
import {Button, Stack, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export function EditPage(props) {
    const {title, resource, headerBody, data, noEdit} = props
    const navigate = useNavigate()

    async function saveChanges() {
        let result = await DataProvider.update(`${resource}/one/${data._id}`, {
            data: data,
        })
        navigate('/' + resource)
    }
    return (
        <Box padding="20px">
            {!noEdit && (
                <Stack
                    direction={'row'}
                    justifyContent="space-between"
                    alignItems={'center'}
                    marginBottom="16px"
                >
                    <Typography variant="h5" fontWeight="700">
                        ویرایش {title}
                    </Typography>
                    {headerBody}
                </Stack>
            )}
            {props.children}
            {!noEdit && (
                <Stack direction={'row'} marginTop={'16px'}>
                    <Button
                        variant="outlined"
                        onClick={saveChanges}
                        size="large"
                        sx={{fontSize: '20px'}}
                    >
                        ثبت تغییرات
                    </Button>
                </Stack>
            )}
        </Box>
    )
}

EditPage.propTypes = {
    title: PropTypes.string,
    resource: PropTypes.string,
    headerBody: PropTypes.element,
    data: PropTypes.object,
}
