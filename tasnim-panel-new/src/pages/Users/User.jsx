import {Stack} from '@mui/material'
import React from 'react'
import {GridProducer} from '../../components/Table/GridProducer'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import PropTypes from 'prop-types'

export function User(props) {
    const {user, setUser} = props
    return (
        <Stack>
            <GridProducer
                sx={{mb: '16px'}}
                data={[
                    <CustomTextField
                        name="username"
                        setData={setUser}
                        label={''}
                        defaultValue={user.username}
                    />,
                    <CustomTextField
                        name="password"
                        setData={setUser}
                        label={'رمز عبور'}
                        defaultValue={user.password}
                    />,
                    <CustomTextField
                        name="name"
                        setData={setUser}
                        label={'نام'}
                        defaultValue={user.name}
                    />,
                    <CustomTextField
                        name="email"
                        setData={setUser}
                        label={'ایمیل'}
                        defaultValue={user.email}
                    />,
                    <CustomTextField
                        name="phone_number"
                        setData={setUser}
                        label={'تلفن تماس'}
                        defaultValue={user.phone_number}
                    />,
                    <CustomTextField
                    name="job_title"
                    setData={setUser}
                    label={'سمت'}
                    defaultValue={user.job_title}
                />,
                ]}
            />
        </Stack>
    )
}

User.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
}
