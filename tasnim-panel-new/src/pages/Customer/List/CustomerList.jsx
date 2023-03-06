import {Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import {DataProvider} from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../components/Table/CustomTable'
import {ListPage} from '../../../components/Table/ListPage'
import {CustomerCreate} from '../Create/CustomerCreate'

export function CustomerList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'factor_id', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState({data: [], count: 0})

    const getCustomers = async () => {
        setLoading(true)
        let data = await DataProvider.getList('customer/list', params)
        if (data && data.status === 200) {
            setCategories({data: data.data, count: data.count})
        }
        setLoading(false)
    }
    useEffect(() => {
        getCustomers()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('نام', 'name'),
        createTableHeadCells('نام کاربری', 'username'),
        createTableHeadCells('تلفن', 'phone'),
        createTableHeadCells('ایمیل', 'email'),
    ]

    return (
        <ListPage
            header="مشتری ها"
            searchField="name"
            searchText="نام مشتری ها"
            setParams={setParams}
            createModal={CustomerCreate}
            resource="customer"
            defaultState={{
                title: '',
                caption: '',
                pic_url: undefined,
            }}
            getList={getCustomers}
        >
            <CustomTable
                headCells={tableHeadCells}
                rows={categories.data}
                count={categories.count}
                params={params}
                setParams={setParams}
                resource="customer"
                handleSort={getCustomers}
                loading={loading}
                tableBodyCells={categories.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.username}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.phone}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.email}</Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
