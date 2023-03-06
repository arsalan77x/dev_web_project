import {Button, Stack, TableCell, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {SmallImage} from '../../components/pictures/SmallImage'
import {CustomTable} from '../../components/Table/CustomTable'
import {createTableHeadCells} from '../../components/Table/CustomTableHead'
import {ListPage} from '../../components/Table/ListPage'
import {DataProvider} from '../../core/DataProvider'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import {useNavigate} from 'react-router-dom'
import {persianDateAndTime} from '../../core/date'
import {BaseModal} from '../../components/Modal/BaseModal'
import {OrderEdit} from '../orders/Edit/OrderEdit'

export function OrderReport(props) {
    const [params, setParams] = useState({
        sort: {name: '_id', order: -1},
    })
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState({data: [], count: 0})
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState('')
    const getOrders = async () => {
        setLoading(true)
        let data = await DataProvider.getList('report/ordersum', params)
        if (data && data.status === 200) {
            setOrders({
                data: data.data[0].orders,
                allprice: data.data[0].allprice,
                allpriceafteroff: data.data[0].allpriceafteroff,
            })
        }
        setLoading(false)
    }
    useEffect(() => {
        getOrders()
    }, [params])
    function handleViewClick(event, id, row) {
        setSelected(id)
        setOpen(true)
    }
    const orderTableHeadCells = [
        createTableHeadCells('کد سفارش', 'factor_id'),
        createTableHeadCells('نام مشتری', 'customer_name'),
        createTableHeadCells('شماره مشتری', 'customer_phone'),
        createTableHeadCells('وضعیت', 'state'),
        createTableHeadCells('تاریخ ثبت', 'time'),
        createTableHeadCells('قیمت', 'price'),
        createTableHeadCells('نحوه پرداخت', 'pay_type'),
        createTableHeadCells('نوع تحویل', 'deliver_type'),
        createTableHeadCells('', 'blank1'),
    ]
    return (
        <ListPage
            header="محصولات"
            searchField="name"
            searchText="نام محصولات"
            setParams={setParams}
            resource="order"
            getList={getOrders}
            reportExcel
            csvData={{headers: orderTableHeadCells, data: orders.data}}
            filtersData={[
                {field: 'name', label: ' نام محصول ...', type: ''},
                {field: 'code', label: 'کد محصول ...', type: ''},
                {field: 'time.from', label: 'از تاریخ ...', type: 'date'},
                {field: 'time.to', label: 'تا تاریخ ...', type: 'date'},
            ]}
        >
            <BaseModal open={open} setOpen={setOpen}>
                {open && <OrderEdit noEdit={true} id={selected} />}
            </BaseModal>
            <Stack direction={'row'} padding="10px">
                <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="10px"
                >
                    <Row title="جمع کل" data={orders.allprice} />
                </Stack>
                <Stack
                    borderRadius="8px"
                    bgcolor={'#ffdcb2'}
                    border={'4px dashed white'}
                    padding="10px"
                >
                    <Row title="جمع کل بعد از تخفیف" data={orders.allpriceafteroff} />
                </Stack>
            </Stack>
            <CustomTable
                noEdit
                noPagination
                noDelete
                headCells={orderTableHeadCells}
                rows={orders.data}
                count={orders.count}
                resource="order"
                params={params}
                setParams={setParams}
                handleSort={getOrders}
                loading={loading}
                tableBodyCells={orders.data.map((item, index) => (
                    <>
                        <TableCell>
                            <Typography>{item.factor_id}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.customer_name}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.customer_phone}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.state}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {/* {moment(item.time).locale("fa").format("YYYY/MM/DD")} */}
                                {persianDateAndTime(item.time).date}
                                <br />
                                {persianDateAndTime(item.time).time}
                                {/* {item.time} */}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.price}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.pay_type}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{item.deliver_type}</Typography>
                        </TableCell>
                        <TableCell>
                            <Button
                                color="secondary"
                                variant="outlined"
                                sx={{padding: '4px 8px', minWidth: '0px'}}
                                onClick={(event) => handleViewClick(event, item._id, item)}
                            >
                                <RemoveRedEyeIcon />
                            </Button>
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
