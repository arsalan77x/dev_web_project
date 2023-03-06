import {Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import {DataProvider} from '../../../core/DataProvider'
import TableCell from '@mui/material/TableCell'
import {CustomTable} from '../../../components/Table/CustomTable'
import {ListPage} from '../../../components/Table/ListPage'
import {ProductCreate} from '../Create/ProductCreate'
import {SmallImage} from '../../../components/pictures/SmallImage'

export function ProductList(props) {
    const [params, setParams] = useState({
        skip: 0,
        limit: 5,
        sort: {name: 'factor_id', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({data: [], count: 0})

    const getProducts = async () => {
        setLoading(true)
        let data = await DataProvider.getList('product/list', params)
        if (data && data.status === 200) {
            setProducts({data: data.data, count: data.count})
        }
        setLoading(false)
    }
    useEffect(() => {
        getProducts()
    }, [params])
    const tableHeadCells = [
        createTableHeadCells('نام', 'name'),
        createTableHeadCells('توضیحات', 'caption'),
        createTableHeadCells('آیکن', 'pic_url'),
        createTableHeadCells('تخفیف', 'off_percent'),
        createTableHeadCells('قیمت بسته بندی', 'packprice'),
        createTableHeadCells('ترتیب', 'order'),
        createTableHeadCells('ستاره', 'star'),
        createTableHeadCells('کد', 'code'),
    ]

    return (
        <ListPage
            header="محصولات"
            searchField="name"
            searchText="نام محصولات"
            setParams={setParams}
            createModal={ProductCreate}
            resource="product"
            defaultState={{
                title: '',
                caption: '',
                pic_url: undefined,
            }}
            getList={getProducts}
        >
            <CustomTable
                headCells={tableHeadCells}
                rows={products.data}
                count={products.count}
                resource="product"
                params={params}
                setParams={setParams}
                handleSort={getProducts}
                loading={loading}
                tableBodyCells={products.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.caption}</Typography>
                        </TableCell>
                        <TableCell>
                            <SmallImage url={item.pic_url} />
                        </TableCell>
                        <TableCell>
                            <Typography>{item.off_percent}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.packprice}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.order}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.star}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.code}</Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}
