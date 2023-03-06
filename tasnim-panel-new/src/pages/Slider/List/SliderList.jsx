import {Box, Stack, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import AddButton from '../../../components/buttons/add'
import {Searchbar} from '../../../components/textfield/Searchbar'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import {DataProvider} from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../components/Table/CustomTable'
import {SmallImage} from '../../../components/pictures/SmallImage'
import { ListPage } from '../../../components/Table/ListPage'
import { SliderCreate } from '../Create/SliderCreate'

export function SliderList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'factor_id', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState({data: [], count: 0})

    const getCategories = async () => {
        setLoading(true)
        let data = await DataProvider.getList('slider/list', params)
        if (data && data.status === 200) {
            setCategories({data: data.data, count: data.count})
        }
        setLoading(false)
    }
    useEffect(() => {
        getCategories()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('نام', 'title'),
        createTableHeadCells('عکس', 'pic_url'),
    ]

    return (
        <ListPage
            header="اسلاید ها"
            searchField="name"
            searchText="نام اسلاید ها"
            setParams={setParams}
            createModal={SliderCreate}
            resource="slider"
            defaultState={{
                title: '',
                caption: '',
                pic_url: '',
            }}
            getList={getCategories}
        >
            <CustomTable
                resource="slider"
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
                            <Typography>{item.title}</Typography>
                        </TableCell>
                        <TableCell>
                            <SmallImage url={item.pic_url} />
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
