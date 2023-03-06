import {Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import {DataProvider} from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../components/Table/CustomTable'
import {SmallImage} from '../../../components/pictures/SmallImage'
import {ListPage} from '../../../components/Table/ListPage'
import {CategoryCreate} from '../Create/CategoryCreate'

export function CategoryList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'factor_id', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState({data: [], count: 0})

    const getCategories = async () => {
        setLoading(true)
        let data = await DataProvider.getList('category/list', params)
        if (data && data.status === 200) {
            setCategories({data: data.data, count: data.count})
        }
        setLoading(false)
    }
    useEffect(() => {
        getCategories()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('نام', 'name'),
        createTableHeadCells('آیکن', 'icon'),
        createTableHeadCells('ترتیب', 'order'),
        createTableHeadCells('توضیحات', 'caption'),
    ]

    return (
        <ListPage
            header="دسته بندی ها"
            searchField="name"
            searchText="نام دسته بندی ها"
            setParams={setParams}
            createModal={CategoryCreate}
            resource="category"
            defaultState={{
                name: 'دسته',
                caption: '',
                order: '',
                icon: '',
            }}
            getList={getCategories}
        >
            <CustomTable
                resource="category"
                headCells={tableHeadCells}
                rows={categories.data}
                count={categories.count}
                params={params}
                setParams={setParams}
                handleSort={getCategories}
                loading={loading}
                tableBodyCells={categories.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <SmallImage url={item.icon} />
                        </TableCell>
                        <TableCell>
                            <Typography>{item.order}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.caption}</Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
