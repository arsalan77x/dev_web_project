import {Box, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import AddButton from '../../../components/buttons/add'
import {OrderTabs} from './OrderTabs'
import {Searchbar} from '../../../components/textfield/Searchbar'

export function OrderList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'time', order: -1},
    })

    return (
        <Box>
            <Stack alignItems={'center'} padding="10px">
                <Stack direction="row" width="100%" alignItems="center" justifyContent="center">
                    <Typography variant="h5">سفارش ها</Typography>

                    <AddButton
                        // onClick={openModal}
                        text={'جدید'}
                        style={{fontSize: '20px', marginRight: 'auto'}}
                    />
                </Stack>

                <Searchbar
                    searchField="customer_phone"
                    setParams={setParams}
                    placeholder="جستجو در شماره مشتریان  ..."
                    filtersData={[
                        {field: 'factor_id', label: 'کد سفارش ...', type: ''},
                        {field: 'time.from', label: 'از تاریخ ...', type: 'date'},
                        {field: 'time.to', label: 'تا تاریخ ...', type: 'date'},
                    ]}
                />
            </Stack>
            <OrderTabs params={params} setParams={setParams} />
        </Box>
    )
}
