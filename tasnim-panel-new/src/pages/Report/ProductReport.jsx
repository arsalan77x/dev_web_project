import {Stack, TableCell, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {SmallImage} from '../../components/pictures/SmallImage'
import {CustomTable} from '../../components/Table/CustomTable'
import {createTableHeadCells} from '../../components/Table/CustomTableHead'
import {ListPage} from '../../components/Table/ListPage'
import {DataProvider} from '../../core/DataProvider'

export function ProductReport(props) {
    const [params, setParams] = useState({
        sort: {name: '_id', order: -1},
    })
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({data: [], count: 0})
    const getProducts = async () => {
        setLoading(true)
        let data = await DataProvider.getList('report/ordersumproduct', params)
        if (data && data.status === 200) {
            setProducts({data: data.data.products, total: data.data.total})
        }
        setLoading(false)
    }
    useEffect(() => {
        getProducts()
    }, [params])

    const tableHeadCells = [
        createTableHeadCells('نام', 'name'),
        createTableHeadCells('تعداد', 'count'),
        createTableHeadCells('آیکن', 'pic_url'),
        createTableHeadCells('دسته بندی', 'category'),
        createTableHeadCells('قیمت  کل', 'price'),
        createTableHeadCells('قیمت  کل با تخفیف', 'priceoff'),
        createTableHeadCells('کد', 'code'),
        createTableHeadCells('درصد از تعداد ', 'count_percent'),
        createTableHeadCells('درصد از قیمت ', 'price_percent'),
        createTableHeadCells('درصد از تخفیف ', 'price_off_percent'),

    ]
    return (
        <ListPage
            header="محصولات"
            searchField="name"
            searchText="نام محصولات"
            setParams={setParams}
            resource="product"
            getList={getProducts}
            reportExcel
            csvData={{headers: tableHeadCells, data: products.data}}
            filtersData={[
                {field: 'name', label: ' نام محصول ...', type: ''},
                {field: 'code', label: 'کد محصول ...', type: ''},
                {field: 'time.from', label: 'از تاریخ ...', type: 'date'},
                {field: 'time.to', label: 'تا تاریخ ...', type: 'date'},
            ]}
        >
            <Stack direction={'row'} padding="10px">
            <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="10px"
                >
                    <Row title="تعداد کل" data={products?.total?.totalcount} />
                </Stack>
                <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="10px"
                >
                    <Row title="جمع قیمت کل" data={products?.total?.totalprice} />
                </Stack>
                <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="10px"
                >
                    <Row title="جمع کل قیمت بعد از تخفیف" data={products?.total?.totalpriceoff} />
                </Stack>
            </Stack>
            <CustomTable
                noEdit
                noPagination
                noDelete
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
                            <Typography>{item.count}</Typography>
                        </TableCell>
                        <TableCell>
                            <SmallImage url={item.pic_url} />
                        </TableCell>
                        <TableCell>
                            <Typography>{item.category}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.price}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.priceoff}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.code}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.count_percent}%</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.price_percent.toFixed(2)}%</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.price_off_percent.toFixed(2)}%</Typography>
                        </TableCell>
                    </>
                ))}
            />
        </ListPage>
    )
}

function Row(props) {
    const {title, data} = props
    return (
        <Stack
            spacing={3}
            direction={'row'}
            alignItems="center"
            justifyContent={'space-between'}
            marginBottom="8px"
        >
            <Typography color="secondary.dark">{title}</Typography>
            <Typography fontWeight={'700'} color="#7e7a75">
                {data}
            </Typography>
        </Stack>
    )
}
