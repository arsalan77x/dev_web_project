import {Box, Rating, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import {DataProvider} from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../components/Table/CustomTable'
import {ListPage} from '../../../components/Table/ListPage'
import {UserCreate} from '../Create/UserCreate'

export function UserList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'createdAt', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState({data: [], count: 0})

    const getUser = async () => {
        setLoading(true)
        let data = await DataProvider.getList('user/list', params)
        if (data && data.status === 200) {
            setUsers({data: data.data, count: data.count})
        }
        setLoading(false)
    }
    useEffect(() => {
        getUser()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('نام کاربری', 'username'),
        createTableHeadCells('نام', 'name'),
        createTableHeadCells('ایمیل', 'email'),
        createTableHeadCells('تلفن تماس', 'phone_number'),
        createTableHeadCells('سمت', 'job_title'),
        createTableHeadCells('دسترسی', 'roles'),
    ]

    return (
        <ListPage
            header="کارمندان"
            searchText="نام"
            searchField="name"
            setParams={setParams}
            createModal={UserCreate}
            resource="user"
            defaultState={{
                username: 'a',
                password: '1111',
                roles: [1],
            }}
            getList={getUser}
        >
            <CustomTable
                resource="user"
                headCells={tableHeadCells}
                rows={users.data}
                count={users.count}
                params={params}
                setParams={setParams}
                handleSort={getUser}
                loading={loading}
                tableBodyCells={users.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.username}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.email}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.phone_number}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.job_title}</Typography>
                        </TableCell>
                        <TableCell>
                            <Rating name="read-only" value={item.roles.length} readOnly />

                            {/* <Typography>{item.roles.length}</Typography> */}
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
