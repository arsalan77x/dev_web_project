import {Button, Stack, Typography} from '@mui/material'
import React from 'react'
import {GridProducer} from '../../components/Table/GridProducer'
import {CustomTextField} from '../../components/textfield/CustomTextField'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'

export function Customer(props) {
    const {customer, setCustomer} = props
    async function changeField(event, field, value) {
        if (value !== undefined) {
            setCustomer((prev) => {
                return {...prev, [field]: value}
            })
        }
    }

    function AddButton() {
        return (
            <Button
                variant="outlined"
                onClick={(e) =>
                    changeField(e, 'address', [
                        ...customer['address'],
                        {
                            id: new Date().getTime(),
                            title: '',
                            detail: '',
                            longitude: '',
                            latitude: '',
                        },
                    ])
                }
            >
                <AddIcon fontSize="large" />
            </Button>
        )
    }
    return (
        <Stack>
            <GridProducer
                data={[
                    <CustomTextField
                        name="name"
                        setData={setCustomer}
                        label={'نام'}
                        defaultValue={customer.name}
                    />,
                    <CustomTextField
                        name="username"
                        setData={setCustomer}
                        label={'نام کاربری'}
                        defaultValue={customer.username}
                    />,
                    <CustomTextField
                        name="email"
                        setData={setCustomer}
                        label={'ایمیل'}
                        defaultValue={customer.email}
                    />,
                    <CustomTextField
                        name="phone"
                        setData={setCustomer}
                        label={'شماره موبایل'}
                        defaultValue={customer.phone}
                    />,
                ]}
            />
            <Stack spacing={1} mt="16px">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" fontWeight="700">
                        آدرس ها
                    </Typography>
                    {customer.address?.length === 0 && <AddButton />}
                </Stack>
                {customer.address?.map((item, index) => (
                    <Stack key={item._id ?? item.id} direction={'row'} spacing={1}>
                        <CustomTextField
                            sx={{width: '200px'}}
                            change={(event) => {
                                let address = customer.address
                                address[index].title = event.target.value
                                changeField(event, 'address', address)
                            }}
                            label={'عنوان'}
                            defaultValue={item.title}
                        />
                        <CustomTextField
                            sx={{width: '200px'}}
                            change={(event) => {
                                let address = customer.address
                                address[index].detail = event.target.value
                                changeField(event, 'address', address)
                            }}
                            label={'جزییات'}
                            defaultValue={item.detail}
                        />
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={(e) => {
                                let list = []
                                for (let adress of customer['address']) {
                                    if ((adress._id ?? adress.id) !== (item._id ?? item.id)) {
                                        list.push(adress)
                                    }
                                }
                                changeField(e, 'address', list)
                            }}
                        >
                            <DeleteIcon fontSize="large" />
                        </Button>
                        {customer.address.length - 1 === index && <AddButton />}
                    </Stack>
                ))}
            </Stack>
        </Stack>
    )
}

Customer.propTypes = {
    customer: PropTypes.object,
    setCustomer: PropTypes.func,
}
