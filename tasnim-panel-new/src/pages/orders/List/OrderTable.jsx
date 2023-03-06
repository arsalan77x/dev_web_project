import {Box, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import arrowIcon from '../../../images/arrow-right.png'
import TableCell from '@mui/material/TableCell'
import {useNavigate} from 'react-router-dom'
import {getDate, persianDateAndTime} from '../../../core/date'
import {CustomTable} from '../../../components/Table/CustomTable'
import {DataProvider} from '../../../core/DataProvider'
import {createTableHeadCells} from '../../../components/Table/CustomTableHead'
import moment from 'moment'
moment.locale('fa')

export function OrderTable(props) {
    const {params, setParams} = props
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [ordersCount, setOrdersCount] = useState(0)

    const getOrders = async () => {
        setLoading(true)
        let data = await DataProvider.getList('order/list', params)
        if (data && data.status === 200) {
            setOrdersCount(data.count)
            setOrders(data.data)
        }
        setLoading(false)
    }
    useEffect(() => {
        getOrders()
    }, [params])

    const orderTableHeadCells = [
        createTableHeadCells('', 'blank1'),

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
        <Box width="100%" height={'100%'}>
            <CustomTable
                resource="order"
                headCells={orderTableHeadCells}
                rows={orders}
                count={ordersCount}
                params={params}
                setParams={setParams}
                handleSort={getOrders}
                loading={loading}
                tableBodyCells={orders.map((item, index) => (
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
                    </>
                ))}
            />
        </Box>
    )
}
